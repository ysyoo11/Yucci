const envList = [
  'REACT_APP_CLOUDINARY_CLOUD_NAME',
  'REACT_APP_CLOUDINARY_API_KEY',
  'REACT_APP_CLOUDINARY_API_SECRET',
  'REACT_APP_CLOUDINARY_ENV_VARIABLE',
  'REACT_APP_CLOUDINARY_UNSIGNED_KEY',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_APP_ID',
  'REACT_APP_FIREBASE_DB_URL',
  'REACT_APP_FIREBASE_MEASUREMENT_ID',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
] as const;

export const ENV = {
  REACT_APP_CLOUDINARY_CLOUD_NAME: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  REACT_APP_CLOUDINARY_API_KEY: process.env.REACT_APP_CLOUDINARY_API_KEY,
  REACT_APP_CLOUDINARY_API_SECRET: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  REACT_APP_CLOUDINARY_ENV_VARIABLE:
    process.env.REACT_APP_CLOUDINARY_ENV_VARIABLE,
  REACT_APP_CLOUDINARY_UNSIGNED_KEY:
    process.env.REACT_APP_CLOUDINARY_UNSIGNED_KEY,
  REACT_APP_FIREBASE_PROJECT_ID: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_API_KEY: process.env.REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_APP_ID: process.env.REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_DB_URL: process.env.REACT_APP_FIREBASE_DB_URL,
  REACT_APP_FIREBASE_MEASUREMENT_ID:
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
} as { [key in (typeof envList)[number]]: string };

export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';
