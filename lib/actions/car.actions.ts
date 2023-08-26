"use server";

import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import Car from "../models/car.model";
import Review from "../models/reviews.model";
import { CarParams, ReviewDocument } from "../interfaces";
import mongoose from "mongoose";

export async function fetchRecommendedCars(): Promise<CarParams[] | null> {
  try {
    connectToDB();

    // Find cars with a rating of 4 and above
    const cars = await Car.find({ starRating: { $gte: 4 } }).exec();

    // Convert each car document to a plain JavaScript object
    return cars.map((car) => car.toObject());
  } catch (error: any) {
    throw new Error(
      `Failed to fetch cars with rating 4 and above: ${error.message}`
    );
  }
}

export async function fetchPopularCars(): Promise<CarParams[] | null> {
  try {
    connectToDB();

    // Find cars with a carRented of over 4
    const cars = await Car.find({ carRented: { $gt: 4 } }).exec();

    // Convert each car document to a plain JavaScript object
    return cars.map((car) => car.toObject());
  } catch (error: any) {
    throw new Error(`Failed to fetch recommended cars: ${error.message}`);
  }
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
    throw new Error("Car ID is required to edit.");
  }

  try {
    connectToDB();
    const updatedCar = await Car.findByIdAndUpdate(carData._id!, carData, {
      new: true,
    });

    if (!updatedCar) {
      throw new Error("Failed to find and update the car.");
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
      throw new Error("Car not found.");
    }

    await Review.deleteMany({ carId });

    await User.findByIdAndUpdate(car.userId, {
      $pull: { cars: carId },
    });

    await Car.findByIdAndRemove(carId);
  } catch (error: any) {
    throw new Error(
      `Failed to delete car and its associated reviews: ${error.message}`
    );
  }
}

export async function fetchCarById(carId: string): Promise<CarParams | null> {
  try {
    connectToDB();
    const car = await Car.findById(carId).exec();
    if (!car) {
      throw new Error("Car not found.");
    }
    return car.toObject();
  } catch (error: any) {
    throw new Error(`Failed to fetch car by ID: ${error.message}`);
  }
}

export async function deleteAllCars(): Promise<void> {
  try {
    connectToDB();

    const cars = await Car.find().exec();

    for (const car of cars) {
      await User.findByIdAndUpdate(car.userId, {
        $pull: { cars: car._id },
      });
    }

    await Car.deleteMany({});
  } catch (error: any) {
    throw new Error(`Failed to delete all cars: ${error.message}`);
  }
}

export async function getAllReviewsForCar(
  carId: mongoose.Types.ObjectId
): Promise<ReviewDocument[]> {
  try {
    connectToDB();

    const reviews = await Review.find({ carId })
      .populate("userId", "username", "image")
      .exec();

    if (!reviews) {
      throw new Error("No reviews found for the specified car.");
    }

    return reviews as ReviewDocument[];
  } catch (error: any) {
    throw new Error(`Failed to fetch reviews for the car: ${error.message}`);
  }
}
