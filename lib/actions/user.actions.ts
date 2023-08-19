'use server';

import { revalidatePath } from 'next/cache';
import { connectToDB } from '../mongoose';
import User from '../models/user.model';
import Car from '../models/car.model';
import { UserParams } from '../interfaces';

export async function userFromDB(userId: string): Promise<UserParams | null> {
  connectToDB();
  const userDocument = await User.findOne({ id: userId });
  if (!userDocument) {
    console.warn('User not found.');
    return null;
  }
  return userDocument.toObject();
}

export async function fetchUserWithCars(
  userId: string
): Promise<UserParams | null> {
  connectToDB();
  const userWithCars = await User.findOne({ id: userId })
    .populate('cars')
    .exec();

  if (!userWithCars) {
    console.warn('User not found.');
    return null;
  }

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
    await User.findOneAndDelete({ id: userId });
  } catch (error: any) {
    throw new Error(`Failed to delete user and their cars: ${error.message}`);
  }
}
