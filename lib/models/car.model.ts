import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    carTitle: {
      type: String,
      required: true,
    },
    carType: {
      type: String,
      required: true,
    },
    disabledDates: {
      singleDates: [Date],
      dateRanges: [
        {
          from: Date,
          to: Date,
        },
      ],
    },
    likes: [
      {
        type: String,
        ref: "User",
      },
    ],
    carRented: Number,
    averageRating: Number,
    rentPrice: String,
    capacity: String,
    transmission: String,
    location: String,
    fuelCapacity: String,
    shortDescription: String,
    carImages: [String],
  },
  {
    timestamps: true,
  }
);

const Car = mongoose?.models?.Car || mongoose.model("Car", carSchema);

export default Car;
