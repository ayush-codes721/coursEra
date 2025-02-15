import CloudinaryService from "../../service/cloudinary.service.js";
import { CourseAdminService } from "../../service/course.admin.service.js";

export class CourseAdminController {


    static async createCourse(req, res) {
        try {

            const { title, description, price, category } = req.body;
            const instructorId = req?.user._id
            console.log("creating  course ...");
            
            let thumbnail;

            if (req.file) {
                const cloudinary = new CloudinaryService();
                const path = req.file?.path;
                thumbnail = await cloudinary.uploadFile(path);
            }


            const response = await CourseAdminService.createCourse({ title, description, price, category, thumbnail, instructorId })

            return res.status(200).json({
                success: true,
                message: "course created",
                data: response

            });


        } catch (error) {

            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });

        }
    }
}