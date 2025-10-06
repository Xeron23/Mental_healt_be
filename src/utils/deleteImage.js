import { DeleteObjectCommand, s3 } from "../config/minioS3.js";

async function deleteImage(key) {
  try {
    const url = new URL(key).pathname.replace(/^\/soulspace\//, "");
    const command = new DeleteObjectCommand({
      Bucket: process.env.IS3_BUCKET_NAME,
      Key: url
    });
    
    await s3.send(command);
    console.log(`✅ File ${key} berhasil dihapus`);
  } catch (err) {
    console.error("❌ Gagal hapus file:", err);
  }
}

export default deleteImage;