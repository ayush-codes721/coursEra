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

        const newlesson= await Lesson.create({
            title,
            lesson_no,
            description,
            content,
            videoUrl,
            duration,
            courseId
        });
        course.content.push(newlesson._id);
        await course.save();

        return newlesson;
    }

    static async addlessonBulk({lessons,courseId,instructorId}){

        if (!Array.isArray(lessons)) {
            throw new ApiError(400,"Invalid input, expected an array of lessons")     
        }
       
        const course = await Course.findById(courseId);
        if (!course) {
            throw new ApiError(404, "Course not found");
        }

        if (course.instructorId.toString() !== instructorId.toString()) {
            throw new ApiError(403, "Unauthorized access");
        }

        lessons=lessons.map(lesson=>{
            return {...lesson,courseId,duration:0,videoUrl:"no video content"}
        })

        const newlessons= await Lesson.insertMany(lessons);

        course.content.push(...newlessons);
        await course.save();


        return newlessons;

    
    }
    

}
