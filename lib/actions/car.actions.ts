'use server';

import { connectToDB } from '../mongoose';
import User from '../models/user.model';
import Car from '../models/car.model';

interface DateRange {
  from: Date;
  to: Date;
}

interface CarParams {
  userId?: string;
  _id?: string;
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

export async function createCar(carData: CarParams): Promise<CarParams> {
  try {
    connectToDB();
    const car = new Car(carData);
    await car.save();

    await User.findByIdAndUpdate(carData.userId, {
      $push: { cars: car._id },
    });

    return car.toObject();
  } catch (error: any) {
    throw new Error(`Failed to create car: ${error.message}`);
  }
}

export async function editCar(carData: CarParams): Promise<CarParams> {
  if (!carData._id) {
    throw new Error('Car ID is required to edit.');
  }

  try {
    connectToDB();
    const updatedCar = await Car.findByIdAndUpdate(carData._id!, carData, {
      new: true,
    });

    if (!updatedCar) {
      throw new Error('Failed to find and update the car.');
    }

    return updatedCar.toObject();
  } catch (error: any) {
    throw new Error(`Failed to edit car: ${error.message}`);
  }
}

export async function deleteCar(carId: string): Promise<void> {
  try {
    connectToDB();
    const car = await Car.findById(carId);
    if (!car) {
      throw new Error('Car not found.');
    }

    await User.findByIdAndUpdate(car.userId, {
      $pull: { cars: carId },
    });

    await Car.findByIdAndRemove(carId);
  } catch (error: any) {
    throw new Error(`Failed to delete car: ${error.message}`);
  }
}

export async function fetchCarById(carId: string): Promise<CarParams | null> {
  try {
    connectToDB();
    const car = await Car.findById(carId).exec();
    if (!car) {
      throw new Error('Car not found.');
    }
    return car.toObject();
  } catch (error: any) {
    throw new Error(`Failed to fetch car by ID: ${error.message}`);
  }
}
