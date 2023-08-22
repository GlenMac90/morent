import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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
  carRented: Number,
  starRating: Number,
  rentPrice: Number,
  capacity: Number,
  transmission: String,
  location: String,
  fuelCapacity: Number,
  shortDescription: String,
  carImageMain: String,
  liked: Boolean,
});

const Car = mongoose?.models?.Car || mongoose.model('Car', carSchema);

export default Car;
