import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,  
    required: true,
  },
  videoUrl: {
    type: String,  
    required: false,  
  },
  duration: {
    type: Number, 
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', 
    required: true,
  },
}, { timestamps: true, collection: "lessons" });

export const Lesson = mongoose.model('Lesson', lessonSchema);
