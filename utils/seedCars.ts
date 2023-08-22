'use server';

import { faker } from '@faker-js/faker';
import Car from '../lib/models/car.model';
import { UserParams } from '@/lib/interfaces';
import User from '../lib/models/user.model';
import { connectToDB } from '@/lib/mongoose';

export async function fetchAllUsers(): Promise<UserParams[]> {
  await connectToDB();

  const userDocuments = await User.find();
  if (userDocuments.length === 0) {
    console.log('No user documents retrieved from the DB.');
  } else {
    console.log(`Retrieved ${userDocuments.length} user(s) from the DB.`);
  }

  const usersArray = userDocuments.map((userDoc) => userDoc.toObject());
  return usersArray;
}

function getRandomItemFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function seedCars(numCars: number): Promise<void> {
  await connectToDB();

  const users = await fetchAllUsers();
  const userIds = users.map((user) => user._id);

  if (userIds.length === 0) {
    console.error('No users found to assign cars to.');
    throw new Error('No users found to assign cars to.');
  } else {
    console.warn(`Found ${userIds.length} user IDs to assign cars to.`);
  }

  for (let i = 0; i < numCars; i++) {
    const randomUserId = getRandomItemFromArray(userIds);

    const carDetails = {
      userId: randomUserId,
      carTitle: faker.vehicle.model(),
      carType: faker.vehicle.type(),
      disabledDates: {
        singleDates: [faker.date.future(), faker.date.future()],
        dateRanges: [
          {
            from: faker.date.recent(),
            to: faker.date.soon(),
          },
        ],
      },
      rentPrice: faker.finance.amount(),
      capacity: getRandomItemFromArray([2, 4, 6, 8]),
      transmission: getRandomItemFromArray([
        'manual',
        'automatic',
        'semi-automatic',
        'cvt',
      ]),
      location: faker.address.city(),
      fuelCapacity: getRandomItemFromArray([40, 50, 60, 80]),
      shortDescription: faker.lorem.sentence(),
      carImageMain: faker.image.imageUrl(640, 480),
      liked: faker.datatype.boolean(),
    };

    const car = new Car(carDetails);
    try {
      await car.save();

      await User.findByIdAndUpdate(randomUserId, {
        $push: { cars: car._id },
      });
    } catch (error) {
      console.error(
        `Error while saving car for user ID: ${randomUserId}`,
        error
      );
    }
  }
}
