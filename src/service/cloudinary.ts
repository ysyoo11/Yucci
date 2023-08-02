import axios from 'axios';

import { ENV } from '../utils/env';

export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', ENV.REACT_APP_CLOUDINARY_UNSIGNED_KEY);

  return await axios
    .post(
      `https://api.cloudinary.com/v1_1/${ENV.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    )
    .then((res) => res.data['secure_url']);
}
