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
  datesBooked: {
    type: [String], // or Date depending on how we are going to store it
    default: [],
  },
  rentPrice: String,
  capacity: Number,
  transmission: String,
  location: String,
  fuelCapacity: Number,
  shortDescription: String,
  carImageMain: String,
});

const Car = mongoose?.models?.Car || mongoose.model('Car', carSchema);

export default Car;
