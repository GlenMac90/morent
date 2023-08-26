'use server';

import { faker } from '@faker-js/faker';

import Car from '@/lib/models/car.model';
import Review from '@/lib/models/review.model';
import { connectToDB } from '@/lib/mongoose';
import { fetchAllUsers } from './seedCars';

export async function fetchAllCars(): Promise<any[]> {
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

function getRandomItemFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function seedCarReviews(): Promise<void> {
  await connectToDB();

  const users = await fetchAllUsers();
  const cars = await fetchAllCars();

  if (!users.length) {
    console.error('No users found to write reviews.');
    return;
  }

  for (const car of cars) {
    const numReviews = getRandomItemFromArray([1, 2, 3, 4, 5]);

    for (let j = 0; j < numReviews; j++) {
      const randomUserId = getRandomItemFromArray(users)._id;

      const reviewDetails = {
        userId: randomUserId,
        carId: car._id,
        rating: getRandomItemFromArray([1, 2, 3, 4, 5]),
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
      };

      const review = new Review(reviewDetails);
      try {
        await review.save();

        await Car.findByIdAndUpdate(car._id, {
          $push: { reviews: review._id },
        });
      } catch (error) {
        console.error(
          `Error while saving review for Car ID: ${car._id}`,
          error
        );
      }
    }
  }
  console.log('Completed the seedCarReviews function.');
}
