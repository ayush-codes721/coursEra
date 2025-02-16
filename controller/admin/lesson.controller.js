import { Lesson } from "../../model/lesson.model.js";
import CloudinaryService from "../../service/cloudinary.service.js";
import { LessonService } from "../../service/lesson.service.js";

export class LessonController {

    static async addlesson(req, res) {
        try {
            const {
                title,
                lesson_no,
                description,
                content,
                courseId,
            } = req.body;

            const instructorId = req.user._id;


            //uplaod the lesson
            let videoUrl;
            let duration;
            if (req.file) {
                const filePath = req.file?.path;
                const cloudinary = new CloudinaryService();
                const result = await cloudinary.uploadVideo(filePath);
                videoUrl = result.videoUrl;
                duration = result.duration;

            }
            const response = await LessonService.addlesson({
                title,
                lesson_no,
                description,
                content,
                videoUrl,
                duration,
                courseId,
                instructorId
            })

            return res.status(200).json({
                success: true,
                message: "lesson added",
                data: response

            });

        } catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });

        }


    }

    static async addlessonsBulk(req, res) {
        try {
            const { lessons, courseId } = req.body;
            const instructorId = req.user._id;

            const response = await LessonService.addlessonBulk({ lessons, courseId, instructorId });
            return res.status(200).json({
                success: true,
                message: "lessons added",
                data: response

            });

        } catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });


        }




    }

    static async updateLesson(req, res) {


    }
    static async deleteLesson(req, res) {

    }

    static async getLessonByid(req, res) {

    }

    static async getAllLessonForCourse(req, res) {

    }
}

