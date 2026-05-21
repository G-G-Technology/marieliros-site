import crypto from 'node:crypto';
import { createTransport } from 'nodemailer';
import { connectToDatabase } from '~/server/utils/mongoose';
import { OtpModel } from '~/server/models/otp';

function getAllowedEmails(): string[] {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string }>(event);
  const email = (body?.email || '').trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, message: 'Email inválido.' });
  }

  if (!getAllowedEmails().includes(email)) {
    throw createError({ statusCode: 403, message: 'Email não autorizado.' });
  }

  await connectToDatabase();

  const rateLimitMinutes = parseInt(process.env.OTP_RATE_LIMIT_MINUTES || '2', 10);
  const cutoff = new Date(Date.now() - rateLimitMinutes * 60 * 1000);

  const recentOtp = await OtpModel.findOne({ email, createdAt: { $gt: cutoff } });
  if (recentOtp) {
    throw createError({
      statusCode: 429,
      message: `Aguarde ${rateLimitMinutes} minutos antes de solicitar um novo código.`,
    });
  }

  const otp = crypto.randomInt(100_000, 1_000_000).toString();
  const otpHash = crypto.createHash('sha256').update(otp).digest('hex');

  await OtpModel.create({
    email,
    otpHash,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: (process.env.EMAIL_APP_PASSWORD || '').replace(/\s/g, ''),
    },
  });

  await transporter.sendMail({
    from: `"Marieli Ros Admin" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Código de acesso — Painel Administrativo',
    text: `Seu código de acesso é: ${otp}\n\nEste código expira em 10 minutos.\n\nSe você não solicitou este código, ignore este email.`,
    html: `
      <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto;">
        <h2 style="color: #271b0b;">Código de Acesso</h2>
        <p>Seu código para acessar o painel administrativo é:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #b87c1c; padding: 16px 0;">${otp}</div>
        <p style="color: #666; font-size: 14px;">Este código expira em 10 minutos.</p>
        <p style="color: #666; font-size: 14px;">Se você não solicitou este código, ignore este email.</p>
      </div>
    `,
  });

  return { success: true };
});
