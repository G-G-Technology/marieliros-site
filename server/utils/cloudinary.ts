// eslint-disable-next-line import/named
import { v2 as cloudinary } from 'cloudinary';

let configured = false;

export function getCloudinary() {
  if (!configured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    configured = true;
  }
  return cloudinary;
}

export const VALID_SLOTS = [
  'carousel-1',
  'carousel-2',
  'carousel-3',
  'about',
  'about-online',
  'about-presencial',
  'how-can-i-help',
  'contact',
] as const;

export type ImageSlot = (typeof VALID_SLOTS)[number];
