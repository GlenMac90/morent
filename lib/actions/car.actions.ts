'use server';

import mongoose from 'mongoose';

import { connectToDB } from '../mongoose';
import User from '../models/user.model';
import Car from '../models/car.model';
import Review from '../models/review.model';
import { CarParams, ReviewDocument } from '../interfaces';

export async function createCar(carData: CarParams): Promise<CarParams> {
  try {
    await connectToDB();
    const car = new Car(carData);
    await car.save();

    await User.findByIdAndUpdate(carData.userId, {
      $push: { carsAdded: { car: car._id } },
    });

    return car.toObject();
  } catch (error: any) {
    throw new Error(`Failed to create car: ${error.message}`);
  }
}

export async function deleteCar(carId: string): Promise<void> {
  try {
    await connectToDB();
    const car = await Car.findById(carId);
    if (!car) {
      throw new Error('Car not found.');
    }

    await Review.deleteMany({ carId });

    await User.findByIdAndUpdate(car.userId, {
      $pull: { carsAdded: { car: car._id } },
    });

    await Car.findByIdAndRemove(carId);
  } catch (error: any) {
    throw new Error(
      `Failed to delete car and its associated reviews: ${error.message}`
    );
  }
}

export async function editCar(carData: CarParams): Promise<CarParams> {
  if (!carData._id) {
    throw new Error('Car ID is required to edit.');
  }

  try {
    await connectToDB();
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

export async function fetchCarById(carId: string): Promise<CarParams | null> {
  try {
    await connectToDB();
    const car = await Car.findById(carId).exec();
    if (!car) {
      throw new Error('Car not found.');
    }
    return car.toObject();
  } catch (error: any) {
    throw new Error(`Failed to fetch car by ID: ${error.message}`);
  }
}

export async function deleteAllCars(): Promise<void> {
  try {
    await connectToDB();

    const cars = await Car.find().exec();

    for (const car of cars) {
      await Review.deleteMany({ carId: car._id });

      await User.findByIdAndUpdate(car.userId, {
        $pull: { carsAdded: { car: car._id }, carsRented: { car: car._id } },
      });
    }

    await Car.deleteMany({});
  } catch (error: any) {
    throw new Error(
      `Failed to delete all cars and their associated reviews: ${error.message}`
    );
  }
}

export async function getAllReviewsForCar(
  carId: mongoose.Types.ObjectId
): Promise<ReviewDocument[]> {
  try {
    await connectToDB();

    const reviews = await Review.find({ carId })
      .populate({
        path: 'userId',
        select: 'username image',
      })
      .exec();

    if (!reviews) {
      throw new Error('No reviews found for the specified car.');
    }

    return reviews as ReviewDocument[];
  } catch (error: any) {
    throw new Error(`Failed to fetch reviews for the car: ${error.message}`);
  }
}

export async function getCarsByLocation(
  location: string
): Promise<CarParams[] | null> {
  try {
    await connectToDB();

    const cars = await Car.find({
      location: { $regex: location, $options: 'i' },
    }).exec();

    if (!cars) {
      throw new Error('Cars not found.');
    }
    return cars.map((car) => car.toObject() as CarParams);
  } catch (error: any) {
    throw new Error(`Failed to get cars by location: ${error.message}`);
  }
}

export async function fetchAllCars(): Promise<CarParams[]> {
  await connectToDB();

  const carDocuments = await Car.find();
  if (carDocuments.length === 0) {
    console.log('No car documents retrieved from the DB.');
  } else {
    console.log(`Retrieved ${carDocuments.length} car(s) from the DB.`);
  }

  const carsArray = carDocuments.map((carDoc) => carDoc.toObject());
  return carsArray;
}
