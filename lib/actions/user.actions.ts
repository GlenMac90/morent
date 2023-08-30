"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import Car from "../models/car.model";
import Review from "../models/reviews.model";
import { UserParams } from "../interfaces";

export async function userFromDB(
  userId: string | undefined
): Promise<UserParams | null> {
  connectToDB();
  const userDocument = await User.findOne({ id: userId });
  if (!userDocument) {
    console.warn("User not found.");
    return null;
  }
  return userDocument;
}

export async function fetchUserWithCars(
  userId: string
): Promise<UserParams | null> {
  connectToDB();
  const userWithCars = await User.findOne({ id: userId })
    .populate("cars")
    .exec();

  if (!userWithCars) {
    console.warn("User not found.");
    return null;
  }
  console.log(userWithCars.toObject());
  return userWithCars.toObject();
}

export async function updateUser(params: UserParams): Promise<void> {
  const { userId, username, name, bio, image, onboarded, path } = params;

  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username,
        name,
        bio,
        image,
        onboarded,
      },
      { upsert: true }
    );
    if (path === `/profile/${userId}`) {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function deleteUser(userId: string): Promise<void> {
  try {
    connectToDB();

    await Car.deleteMany({ userId });
    await Review.deleteMany({ userId });
    await User.findOneAndDelete({ id: userId });
  } catch (error: any) {
    throw new Error(
      `Failed to delete user, their cars, and their reviews: ${error.message}`
    );
  }
}

export async function fetchReviewsByUser(
  userId: string
): Promise<any[] | null> {
  connectToDB();

  try {
    const userReviews = await Review.find({ userId })
      .populate("carId", "carTitle", "carImageMain")
      .exec();

    if (!userReviews || userReviews.length === 0) {
      console.warn("No reviews found for this user.");
      return null;
    }

    return userReviews.map((review) => review.toObject());
  } catch (error: any) {
    throw new Error(`Failed to fetch reviews by user: ${error.message}`);
  }
}
