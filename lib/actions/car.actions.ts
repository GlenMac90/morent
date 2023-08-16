'use server';

import { connectToDB } from '../mongoose';
import User from '../models/user.model';
import Car from '../models/car.model';

interface DateRange {
  from: Date;
  to: Date;
}

interface CarParams {
  userId: string;
  id?: string;
  carTitle: string;
  carType: string;
  rentPrice?: string;
  capacity?: number;
  transmission?: string;
  location?: string;
  fuelCapacity?: number;
  shortDescription?: string;
  carImageMain?: string;
  disabledDates?: {
    singleDates?: Date[];
    dateRanges?: DateRange[];
  };
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

export async function editCar(carData: CarParams): Promise<void> {
  if (!carData.id) {
    throw new Error('Car ID is required to edit.');
  }

  try {
    connectToDB();
    const car = await Car.findByIdAndUpdate(carData.id, carData, {
      new: true,
    });
    return car;
  } catch (error: any) {
    throw new Error(`Failed to edit car: ${error.message}`);
  }
}

export async function deleteCar(carId: string): Promise<void> {
  try {
    connectToDB();
    await Car.findByIdAndRemove(carId);
  } catch (error: any) {
    throw new Error(`Failed to delete car: ${error.message}`);
  }
}
