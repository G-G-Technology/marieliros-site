import { getCloudinary, VALID_SLOTS } from '~/server/utils/cloudinary';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user?.isAdmin) {
    throw createError({ statusCode: 401, message: 'Não autorizado.' });
  }

  const folder = process.env.CLOUDINARY_GALLERY_FOLDER || 'marieli-site';
  const cld = getCloudinary();

  const result = await cld.api.resources_by_asset_folder(folder, { max_results: 50 });

  const imageMap: Record<string, string> = {};
  for (const resource of result.resources as { public_id: string; secure_url: string }[]) {
    const slot = resource.public_id.replace(`${folder}/`, '');
    if (VALID_SLOTS.includes(slot as (typeof VALID_SLOTS)[number])) {
      imageMap[slot] = resource.secure_url;
    }
  }

  return { images: imageMap };
});
