'use server';

import mongoose from 'mongoose';
import { connectToDB } from '../mongoose';
import User from '../models/user.model';
import Car from '../models/car.model';

interface CarParams {
  userId: string;
  id?: string;
  carTitle: string;
  carType: string;
  rentPrice: string;
  capacity: number;
  transmission: string;
  location: string;
  fuelCapacity: number;
  shortDescription: string;
  carImageMain: string;
  carImageInteriorOne?: string;
  carImageInteriorTwo?: string;
  carImageInteriorThree?: string;
  path?: string;
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
