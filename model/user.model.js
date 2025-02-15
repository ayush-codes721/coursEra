import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  amount: {
    type: Number,
    default: 100
  },
  currencyType: {
    type: String,
    default: "USD"
  },

}, { timestamps: true });


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    default:"user",
    required:true,
    enum: ["user", "admin", "instructor"], 

  },
  interests: {
    type: [String],
    default:[],
  },
  purchasedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  wallet: {
    type: walletSchema,
    default: () => ({ amount: 100, currencyType: 'USD' }), // Default wallet object
  }

}, { timestamps: true, collection: 'users' });

// userSchema.path("purchasedCourses").default([])

export const User = mongoose.model("User", userSchema);
