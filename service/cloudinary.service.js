import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }


  async uploadFile(filePath) {
    try {
      if (!filePath) throw new Error("File path is required");

      const result = await cloudinary.uploader.upload(filePath, {
        folder: "coursera", 
      });

      // Delete the local file after upload
      fs.unlinkSync(filePath);

      return result.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw new Error("File upload failed");
    }
  }
}

export default CloudinaryService;
