import crypto from 'node:crypto';
import { connectToDatabase } from '~/server/utils/mongoose';
import { OtpModel } from '~/server/models/otp';

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string; otp: string }>(event);
  const email = (body?.email || '').trim().toLowerCase();

  if (!body?.otp || !/^\d{6}$/.test(body.otp)) {
    throw createError({ statusCode: 400, message: 'Código inválido. Informe os 6 dígitos.' });
  }

  if (!email) {
    throw createError({ statusCode: 400, message: 'Email é obrigatório.' });
  }

  await connectToDatabase();

  const otpHash = crypto.createHash('sha256').update(body.otp).digest('hex');

  const otpDoc = await OtpModel.findOne({
    email,
    otpHash,
    expiresAt: { $gt: new Date() },
    used: false,
  });

  if (!otpDoc) {
    throw createError({ statusCode: 401, message: 'Código incorreto ou expirado.' });
  }

  otpDoc.used = true;
  await otpDoc.save();

  await setUserSession(event, { user: { isAdmin: true, email } });

  return { success: true };
});
