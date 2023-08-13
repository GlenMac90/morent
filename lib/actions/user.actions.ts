'use server';

import { revalidatePath } from 'next/cache';
import { connectToDB } from '../mongoose';
import User from '../models/user.model';

export async function fetchUser(userId: string) {
  try {
    connectToDB();
    const userDocument = await User.findOne({ id: userId });
    return userDocument;
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

interface Params {
  userId: string;
  username: string;
  name: string;
  image?: string;
  bio?: string;
  path: string;
  onboarded?: boolean;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
  onboarded,
}: Params): Promise<void> {
  try {
    connectToDB();
    await User.findOneAndUpdate(
      { id: userId },
      {
        username,
        name,
        bio,
        image,
        path,
        onboarded,
      },
      { upsert: true }
    );

    if (path === '/profile/edit') {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function deleteUser(userId: string): Promise<void> {
  try {
    connectToDB();
    await User.findOneAndDelete({ id: userId });
    console.log(`User with ID ${userId} deleted successfully.`);
  } catch (error: any) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
}

export async function fetchUserWithCars(userId: string): Promise<void> {
  try {
    connectToDB();
    const userWithCars = await User.findById(userId).populate('cars').exec();
    if (!userWithCars) {
      console.log('User not found.');
    }

    return userWithCars;
  } catch (error: any) {
    throw new Error(`Failed to fetch user and their cars: ${error.message}`);
  }
}
