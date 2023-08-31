"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import Car from "../models/car.model";
import Review from "../models/review.model";
import { UserParams } from "../interfaces";

export async function userFromDB(
  userName: string | undefined
): Promise<UserParams | null> {
  connectToDB();
  const userDocument = await User.findOne({ id: userName });
  if (!userDocument) {
    console.warn("User not found.");
    return null;
  }
  return userDocument;
}

export async function fetchUserCars(
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

  return userWithCars.toObject();
}

export async function updateUser(params: UserParams): Promise<void> {
  const { id, username, name, bio, image, onboarded, path, email } = params;
  try {
    await connectToDB();

    await User.findOneAndUpdate(
      { id },
      {
        username,
        name,
        bio,
        image,
        onboarded,
        email,
      },
      { upsert: true }
    );
    if (path === `/profile/edit`) {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function deleteUserAndCars(id: string): Promise<void> {
  try {
    await connectToDB();

    const user = await User.findOne({ id });
    if (!user) {
      throw new Error("User not found.");
    }

    await Car.deleteMany({ userId: user._id });

    await User.findOneAndDelete({ id });
  } catch (error: any) {
    throw new Error(`Failed to delete user and their cars: ${error.message}`);
  }
}

export async function fetchReviewsByUser(id: string): Promise<any[] | null> {
  await connectToDB();

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

export async function fetchAllUsers(): Promise<UserParams[]> {
  await connectToDB();

  const userDocuments = await User.find();
  if (userDocuments.length === 0) {
    console.log("No user documents retrieved from the DB.");
  } else {
    console.log(`Retrieved ${userDocuments.length} user(s) from the DB.`);
  }

  const usersArray = userDocuments.map((userDoc) => userDoc.toObject());
  return usersArray;
}
