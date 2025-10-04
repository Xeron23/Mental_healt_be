import { DeleteObjectCommand } from "../config/minioS3.js";

async function deleteImage(key) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.IS3_BUCKET_NAME,
      Key: key, // nama file / path di bucket
    });

    await s3.send(command);
    console.log(`✅ File ${key} berhasil dihapus`);
  } catch (err) {
    console.error("❌ Gagal hapus file:", err);
  }
}

export default deleteImage;