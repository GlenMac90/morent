'use server';

import { revalidatePath } from 'next/cache';
import { connectToDB } from '../mongoose';
import User from '../models/user.model';
import Car from '../models/car.model';
import Review from '../models/reviews.model';
import { UserParams } from '../interfaces';

export async function userFromDB(clerkId: string): Promise<UserParams | null> {
  connectToDB();
  const userDocument = await User.findOne({ clerkId });
  if (!userDocument) {
    console.warn('User not found.');
    return null;
  }
  return userDocument.toObject();
}

export async function fetchUserWithCarsAdded(
  clerkId: string
): Promise<UserParams | null> {
  connectToDB();
  const userWithCarsAdded = await User.findOne({ clerkId })
    .populate({
      path: 'carsAdded.car',
      model: 'Car',
    })
    .populate({
      path: 'carsAdded.reviews',
      model: 'Review',
    })
    .exec();

  if (!userWithCarsAdded) {
    console.warn('User not found.');
    return null;
  }
  console.log(userWithCarsAdded.toObject());
  return userWithCarsAdded.toObject();
}

export async function fetchUserWithRentedCars(
  clerkId: string
): Promise<UserParams | null> {
  connectToDB();
  const userWithHiredCars = await User.findOne({ clerkId })
    .populate({
      path: 'carsRented.car',
      model: 'Car',
    })
    .populate({
      path: 'carsRented.reviewId',
      model: 'Review',
    })
    .exec();

  if (!userWithHiredCars) {
    console.warn('User not found.');
    return null;
  }
  console.log(userWithHiredCars.toObject());
  return userWithHiredCars.toObject();
}

export async function updateUser(params: UserParams): Promise<void> {
  const { clerkId, username, name, bio, image, onboarded, path, email } =
    params;
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { clerkId },
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

export async function deleteUser(clerkId: string): Promise<void> {
  try {
    connectToDB();

    await Car.deleteMany({ clerkId });
    await Review.deleteMany({ clerkId });
    await User.findOneAndDelete({ clerkId });
  } catch (error: any) {
    throw new Error(
      `Failed to delete user, their cars, and their reviews: ${error.message}`
    );
  }
}

export async function fetchReviewsByUser(
  clerkId: string
): Promise<any[] | null> {
  connectToDB();

  try {
    const userReviews = await Review.find({ clerkId })
      .populate({ path: 'carId', select: 'carTitle carImageMain' })
      .exec();

    if (!userReviews || userReviews.length === 0) {
      console.warn('No reviews found for this user.');
      return null;
    }

    return userReviews.map((review) => review.toObject());
  } catch (error: any) {
    throw new Error(`Failed to fetch reviews by user: ${error.message}`);
  }
}
