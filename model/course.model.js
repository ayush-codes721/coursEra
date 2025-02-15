import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Development', 'Design', 'Marketing', 'Business', 'Others'], 
  },
  thumbnail: {
    type: String,
    default:"thumbnail"

  },
  content: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson', 
  }],
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  studentsEnrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  }],
  
},{collection:"courses",timestamps:true});

courseSchema.path("content").default([]);
courseSchema.path("studentsEnrolled").default([])

export const Course = mongoose.model('Course', courseSchema);

