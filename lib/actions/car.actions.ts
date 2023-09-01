"use server";

import mongoose from "mongoose";

import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import Car from "../models/car.model";
import Review from "../models/review.model";
import { CarParams, ReviewDocument } from "../interfaces";

export async function fetchRecommendedCars(): Promise<CarParams[] | null> {
  try {
    connectToDB();

    const cars = await Car.aggregate([
      {
        $addFields: {
          averageRating: {
            $avg: "$starRating",
          },
        },
      },
      {
        $match: {
          averageRating: { $gte: 3.75 },
        },
      },
    ]).exec();

    return cars;
  } catch (error: any) {
    throw new Error(
      `Failed to fetch cars with average rating of 3.75 and above: ${error.message}`
    );
  }
}

export async function fetchPopularCars(): Promise<CarParams[] | null> {
  try {
    connectToDB();

    // Find cars with a carRented of over 4 and populate their reviews
    const cars = await Car.find({ carRented: { $gt: 4 } })
      .populate({
        path: "reviews", // First, populate the reviews
        populate: {
          path: "userId", // Then, within each review, populate the userId
          select: "image username", // Only select the 'image' and 'username' fields from the User document
        },
      })
      .exec();

    // Convert each car document to a plain JavaScript object
    return cars.map((car) => car.toObject());
  } catch (error: any) {
    throw new Error(`Failed to fetch recommended cars: ${error.message}`);
  }
}

export async function fetchCarsAddedByUser(
  userId: string | undefined
): Promise<CarParams[] | null> {
  try {
    connectToDB();

    // Find cars with the matching userId
    const cars = await Car.find({ userId }).exec();

    // Convert each car document to a plain JavaScript object
    return cars.map((car) => car.toObject());
  } catch (error: any) {
    console.log(userId);
    throw new Error(
      `Failed to fetch cars added by user with ID ${userId}: ${error.message}`
    );
  }
}

export async function fetchCarsRentedByUser(
  userId: string | undefined
): Promise<CarParams[] | null> {
  try {
    connectToDB();

    // Find the user by their ID
    const user = await User.findById(userId).exec();

    // If user doesn't exist or doesn't have carsRented array, return null
    if (!user || !user.carsRented || user.carsRented.length === 0) {
      return null;
    }

    // Find cars with IDs that match the ids in the user's carsRented array
    const cars = await Car.find({
      _id: { $in: user.carsRented },
    }).exec();

    // Convert each car document to a plain JavaScript object
    return cars.map((car) => car.toObject());
  } catch (error: any) {
    throw new Error(
      `Failed to fetch cars rented by user with ID ${userId}: ${error.message}`
    );
  }
}

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
      throw new Error("Car not found.");
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
    throw new Error("Car ID is required to edit.");
  }

  try {
    await connectToDB();
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

export async function fetchCarById(carId: string): Promise<CarParams | null> {
  try {
    await connectToDB();
    const car = await Car.findById(carId).exec();
    if (!car) {
      throw new Error("Car not found.");
    }
    return car.toObject();
  } catch (error: any) {
    throw new Error(`Failed to fetch car by ID: ${error.message}`);
  }
}

export async function fetchAllCars(): Promise<CarParams[] | null> {
  try {
    await connectToDB();
    const cars = await Car.find().exec();
    if (!cars || cars.length === 0) {
      throw new Error("No cars found.");
    }
    return cars.map((car) => car.toObject());
  } catch (error: any) {
    throw new Error(`Failed to fetch all cars: ${error.message}`);
  }
}

export async function deleteAllCars(): Promise<void> {
  try {
    await connectToDB();

    const cars = await Car.find().exec();

    for (const car of cars) {
      await Review.deleteMany({ carId: car._id });

      await User.updateMany(
        {},
        {
          $pull: { carsAdded: { car: car._id }, carsRented: { car: car._id } },
        }
      );
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
        path: "userId",
        select: "username image",
      })
      .exec();

    if (!reviews) {
      throw new Error("No reviews found for the specified car.");
    }

    return reviews as ReviewDocument[];
  } catch (error: any) {
    throw new Error(`Failed to fetch reviews for the car: ${error.message}`);
  }
}

export async function getCarsByLocation(
  location: string = ""
): Promise<CarParams[] | null> {
  try {
    await connectToDB();

    const cars = await Car.find({
      location: { $regex: location, $options: "i" },
    }).exec();

    if (!cars) {
      throw new Error("Cars not found.");
    }
    return cars.map((car) => car.toObject() as CarParams);
  } catch (error: any) {
    throw new Error(`Failed to get cars by location: ${error.message}`);
  }
}
