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
        resource_type: "image"
      });

      // Delete the local file after upload
      fs.unlinkSync(filePath);

      return result.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw new Error("File upload failed");
    }
  }

  async uploadVideo(filePath) {

    try {

      if (!filePath) throw new Error("File path is required");

      const result = await cloudinary.uploader.upload(filePath, {
        folder: "coursera",
        resource_type: "video"

      })

      fs.unlinkSync(filePath);

      // Fetch video metadata to get the duration
      const videoDetails = await cloudinary.api.resource(result.public_id, {
        resource_type: "video"
      })


      //some issues here for duration need to fix it :todo

     const durationInSeconds = videoDetails?.duration ?? 0; 
     const durationInMinutes = parseFloat((durationInSeconds / 60).toFixed(2)); 

      return {
          videoUrl: result.secure_url,
          duration: parseFloat(durationInMinutes), 
      };

      // return {
      //   videoUrl: result.secure_url,
      //   duration: videoDetails.duration, // Duration in seconds
      // };

    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw new Error("File upload failed");

    }

  }
}

export default CloudinaryService;
