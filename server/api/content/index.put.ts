import { connectToDatabase } from '~/server/utils/mongoose';
import { ContentModel } from '~/server/models/content';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user?.isAdmin) {
    throw createError({ statusCode: 401, message: 'Não autorizado.' });
  }

  const body = await readBody<{
    hero?: { tagline?: string; subtitle?: string };
    bio?: { mainParagraph?: string; education?: string; practice?: string };
    therapy?: { gestalt?: string; psicoterapia?: string };
    services?: string[];
    contact?: { whatsapp?: string; email?: string; instagram?: string };
    images?: Record<string, string>;
  }>(event);

  await connectToDatabase();

  const update: Record<string, unknown> = {};
  if (body.hero) update.hero = body.hero;
  if (body.bio) update.bio = body.bio;
  if (body.therapy) update.therapy = body.therapy;
  if (body.services) update.services = body.services;
  if (body.contact) update.contact = body.contact;
  // Use dot-notation per slot so individual keys don't overwrite unrelated slots
  if (body.images) {
    for (const [key, value] of Object.entries(body.images)) {
      update[`images.${key}`] = value;
    }
  }

  const content = await ContentModel.findByIdAndUpdate(
    'site-content',
    { $set: update },
    { new: true, upsert: true, lean: true },
  );

  return {
    hero: content?.hero,
    bio: content?.bio,
    services: content?.services,
    contact: content?.contact,
    images: (content?.images as unknown as Record<string, string>) ?? {},
  };
});
