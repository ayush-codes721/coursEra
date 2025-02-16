import { Course } from "../model/course.model.js";
import { Lesson } from "../model/lesson.model.js";
import { ApiError } from "../utils/apiError.js";

export class LessonService {


    static async addlesson({
        title,
        lesson_no,
        description,
        content,
        videoUrl = "no video content",
        duration=0,
        courseId,
        instructorId 
    }) {
        const course = await Course.findById(courseId);
        if (!course) {
            throw new ApiError(404, "Course not found");
        }

        if (course.instructorId.toString() !== instructorId.toString()) {
            throw new ApiError(403, "Unauthorized access");
        }

        const lesson = await Lesson.findOne({
            $and: [
                { courseId: courseId },
                { lesson_no: lesson_no }
            ]
        });

        if (lesson) {
            throw new ApiError(400, "This lesson already exists for this course");
        }

        return await Lesson.create({
            title,
            lesson_no,
            description,
            content,
            videoUrl,
            duration,
            courseId
        });
    }


}
