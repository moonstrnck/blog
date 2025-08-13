import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import https from 'https';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * 이미지를 base64로 다운로드
 */
async function downloadImageToBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = https.request(url, (response) => {
      const chunks: Buffer[] = [];

      response.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });

      response.on('end', () => {
        const result = Buffer.concat(chunks);
        resolve(result.toString('base64'));
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * 이미지를 Cloudinary에 업로드
 */
async function uploadImageFromBase64(
  imageUrl: string,
  options: UploadApiOptions = {}
): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, options);

    return result.secure_url;
  } catch (error) {
    console.error('Base64 upload failed:', error);
    return imageUrl;
  }
}

/**
 * Notion 이미지를 Cloudinary에 업로드
 */
export async function uploadNotionImageToCloudinary(
  notionImageUrl: string,
  folder: string,
  publicId?: string
) {
  const base64Data = await downloadImageToBase64(notionImageUrl);
  return uploadImageFromBase64(`data:image/jpeg;base64,${base64Data}`, {
    folder,
    public_id: publicId,
    overwrite: true,
  });
}
