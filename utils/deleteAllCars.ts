'use server';

import Car from '../lib/models/car.model';
import User from '../lib/models/user.model';
import { connectToDB } from '@/lib/mongoose';

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
