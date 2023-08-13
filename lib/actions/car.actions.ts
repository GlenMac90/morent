'use strict';

import mongoose from 'mongoose';
import { connectToDB } from '../mongoose';
import User from '../models/user.model';
import Car from '../models/car.model';

interface CarParams {
  userId: mongoose.Types.ObjectId;
  id: string;
  carTitle: string;
  brandName: string;
  rentPrice: string;
  capacity: string;
  transmission: string;
  location: string;
  fuelCapacity: string;
  shortDescription: string;
  carImageMain: string;
  carImageInteriorOne: string;
  carImageInteriorTwo: string;
  carImageInteriorThree: string;
}

export async function createCar(carData: CarParams): Promise<void> {
  try {
    connectToDB();

    const car = new Car(carData);
    await car.save();

    await User.findByIdAndUpdate(carData.userId, {
      $push: { cars: car._id },
    });

    return car;
  } catch (error: any) {
    throw new Error(`Failed to create car: ${error.message}`);
  }
}
