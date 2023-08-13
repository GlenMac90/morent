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
  rentPrice: String,
  capacity: Number,
  transmission: String,
  location: String,
  fuelCapacity: Number,
  shortDescription: String,
  carImageMain: String,
  carImageInteriorOne: String,
  carImageInteriorTwo: String,
  carImageInteriorThree: String,
});

const Car = mongoose?.models?.Car || mongoose.model('Car', carSchema);

export default Car;
