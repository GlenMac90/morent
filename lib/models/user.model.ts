import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    bannerImage: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    onboarded: {
      type: Boolean,
      default: false,
    },
    carsAdded: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
      },
    ],
    carsHired: [
      {
        car: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Car",
          required: true,
        },
        reviewId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Review",
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose?.models?.User || mongoose.model("User", userSchema);

export default User;
