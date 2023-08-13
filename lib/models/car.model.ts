import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  carTitle: {
    type: String,
    unique: true,
    required: true,
  },
  brandName: {
    type: String,
    unique: true,
    required: true,
  },
  rentPrice: String,
  capacity: String,
  transmission: String,
  location: String,
  fuelCapacity: String,
  shortDescription: String,
  carImageMain: String,
  carImageInteriorOne: String,
  carImageInteriorTwo: String,
  carImageInteriorThree: String,
});

const Car = mongoose.models.Car || mongoose.model('Car', carSchema);

export default Car;
