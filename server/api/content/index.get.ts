import { connectToDatabase } from '~/server/utils/mongoose';
import { ContentModel, DEFAULT_CONTENT } from '~/server/models/content';

export default defineEventHandler(async (_event) => {
  await connectToDatabase();

  let content = await ContentModel.findById('site-content').lean();

  if (!content) {
    await ContentModel.create(DEFAULT_CONTENT);
    content = (await ContentModel.findById('site-content').lean())!;
  }

  const images = (content.images as unknown as Record<string, string>) ?? {};

  return {
    bio: {
      mainParagraph: content.bio?.mainParagraph || DEFAULT_CONTENT.bio.mainParagraph,
      education: content.bio?.education || DEFAULT_CONTENT.bio.education,
      practice: content.bio?.practice || DEFAULT_CONTENT.bio.practice,
    },
    therapy: {
      gestalt: content.therapy?.gestalt || DEFAULT_CONTENT.therapy.gestalt,
      psicoterapia: content.therapy?.psicoterapia || DEFAULT_CONTENT.therapy.psicoterapia,
    },
    services: content.services?.length ? content.services : DEFAULT_CONTENT.services,
    contact: {
      whatsapp: content.contact?.whatsapp || DEFAULT_CONTENT.contact.whatsapp,
      email: content.contact?.email || DEFAULT_CONTENT.contact.email,
      instagram: content.contact?.instagram || DEFAULT_CONTENT.contact.instagram,
    },
    images,
  };
});
