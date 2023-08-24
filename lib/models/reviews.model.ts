import mongoose from "mongoose";
import { ReviewDocument } from "../interfaces";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  userImage: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  carImage: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
});

const Review =
  mongoose.models.Review ||
  mongoose.model<ReviewDocument>("Review", reviewSchema);

export default Review;
