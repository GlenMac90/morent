'use server';

import { revalidatePath } from 'next/cache';
import { connectToDB } from '../mongoose';
import User from '../models/user.model';
import Car from '../models/car.model';
import Review from '../models/review.model';
import { UserParams } from '../interfaces';

export async function userFromDB(clerkId: string): Promise<UserParams | null> {
  await connectToDB();
  const userDocument = await User.findOne({ clerkId });
  if (!userDocument) {
    console.warn('User not found.');
    return null;
  }
  return userDocument.toObject();
}

export async function fetchUserCars(
  clerkId: string
): Promise<UserParams | null> {
  connectToDB();
  const userWithCarsAdded = await User.findOne({ clerkId })
    .populate({
      path: 'carsAdded.car',
      model: 'Car',
      populate: {
        path: 'reviews',
        model: 'Review',
      },
    })
    .populate({
      path: 'carsRented.car',
      model: 'Car',
      populate: {
        path: 'reviews',
        model: 'Review',
      },
    })
    .exec();

  if (!userWithCarsAdded) {
    console.warn('User not found.');
    return null;
  }

  return userWithCarsAdded.toObject();
}

export async function updateUser(params: UserParams): Promise<void> {
  const { clerkId, username, name, bio, image, onboarded, path, email } =
    params;
  try {
    await connectToDB();

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

export async function deleteUserAndCars(clerkId: string): Promise<void> {
  try {
    await connectToDB();

    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error('User not found.');
    }

    await Car.deleteMany({ userId: user._id });

    await User.findOneAndDelete({ clerkId });
  } catch (error: any) {
    throw new Error(`Failed to delete user and their cars: ${error.message}`);
  }
}

export async function fetchReviewsByUser(
  clerkId: string
): Promise<any[] | null> {
  await connectToDB();

  try {
    const user = await User.findOne({ clerkId });
    if (!user) {
      console.warn('User not found.');
      return null;
    }

    const userReviews = await Review.find({ userId: user._id })
      .populate({
        path: 'carId',
        select: 'carTitle carImages',
      })
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
