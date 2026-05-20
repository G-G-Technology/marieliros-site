import { connectToDatabase } from '~/server/utils/mongoose';
import { ContentModel } from '~/server/models/content';
import { getCloudinary, VALID_SLOTS, type ImageSlot } from '~/server/utils/cloudinary';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user?.isAdmin) {
    throw createError({ statusCode: 401, message: 'Não autorizado.' });
  }

  const parts = await readMultipartFormData(event);
  if (!parts) throw createError({ statusCode: 400, message: 'Nenhum arquivo enviado.' });

  const slotPart = parts.find((p) => p.name === 'slot');
  const filePart = parts.find((p) => p.name === 'file');

  if (!slotPart || !filePart) {
    throw createError({ statusCode: 400, message: 'Campos "slot" e "file" são obrigatórios.' });
  }

  const slot = slotPart.data.toString() as ImageSlot;
  if (!VALID_SLOTS.includes(slot)) {
    throw createError({ statusCode: 400, message: `Slot inválido. Use um de: ${VALID_SLOTS.join(', ')}` });
  }

  const folder = process.env.CLOUDINARY_GALLERY_FOLDER || 'marieli-website-prod';
  const publicId = `${folder}/${slot}`;

  const cld = getCloudinary();

  const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    cld.uploader
      .upload_stream(
        {
          public_id: publicId,
          overwrite: true,
          invalidate: true,
          resource_type: 'image',
        },
        (error, uploadResult) => {
          if (error || !uploadResult) return reject(error || new Error('Upload failed'));
          resolve({ secure_url: uploadResult.secure_url, public_id: uploadResult.public_id });
        },
      )
      .end(filePart.data);
  });

  await connectToDatabase();
  await ContentModel.findByIdAndUpdate(
    'site-content',
    { $set: { [`images.${slot}`]: result.secure_url } },
    { upsert: true },
  );

  return { url: result.secure_url, publicId: result.public_id, slot };
});
