export function cloudinaryFaceUrl(url: string | undefined | null, aspectRatio?: string): string {
  if (!url?.includes('res.cloudinary.com') || !url.includes('/upload/')) return url ?? '';
  const transform = aspectRatio ? `c_fill,g_face,ar_${aspectRatio}` : 'c_fill,g_face';
  return url.replace('/upload/', `/upload/${transform}/`);
}
