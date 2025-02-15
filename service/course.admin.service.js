import { Course } from "../model/course.model.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/apiError.js";
import { Lesson } from "../model/lesson.model.js";


export class CourseAdminService {

    static async createCourse({ title, description, price, category, thumbnail = "no thumbnail", instructorId }) {

        const course = await Course.findOne({ title });
        if (course) {
            throw new ApiError(400, "course already exists");
        }

        const newCourse = await Course.create({
            title,
            description,
            price,
            category,
            thumbnail,
            instructorId

        })
        return newCourse;

    }

    // static async getAllCourses(page,limit){ // for users
    //     const skip = (page-1)*limit;
    //     const courses = await Course.find().skip(skip).limit(limit);
    //     return courses;

    // }

    static async getMylaunchedCourses({ instructorId }) {

        const courses = await Course.find({ instructorId: new mongoose.Schema.Types.ObjectId(instructorId) })

        return courses;

    }

    static async deleteCourse({ courseId, instructorId }) {

        const course = await Course.findById(courseId);

        if (!course) {
            throw new ApiError(404, "course not found")

        }
        if (course.instructorId.toString() !== instructorId.toString()) {
            throw new ApiError(400, "unaunthroized access ")
        }

        await Lesson.deleteMany({ _id: { $in: course.content } })
        await Course.findByIdAndDelete(course._id);


    }



}