import { v2 as cloudinary } from 'cloudinary';

export const imageUpload = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: folder,
    });
    return { secure_url: result.secure_url, public_id: result.public_id };
  } catch (error) {
    console.log('Cloudinary uploading error: ', error);
  }
};
