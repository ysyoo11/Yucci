export async function getImageURL(file: File) {
  const heic2any = require('heic2any');
  const blobURL = URL.createObjectURL(
    file.type === 'image/heic'
      ? ((await heic2any({ blob: file, toType: 'jpeg', quality: 0.9 })) as Blob)
      : file
  );
  return blobURL;
}
