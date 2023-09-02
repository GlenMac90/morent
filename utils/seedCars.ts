"use server";

import { faker } from "@faker-js/faker";
import mongoose from "mongoose";

import Car from "@/lib/models/car.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { fetchAllUsers } from "@/lib/actions/user.actions";
import { getRandomItemFromArray } from "./utility.serverFunctions";
import { locations, shortDescription } from "@/constants";

type ObjectId = mongoose.Types.ObjectId;

export async function seedCars(numCars: number): Promise<void> {
  await connectToDB();

  const users = await fetchAllUsers();
  const userIds = users.map((user) => user._id) as ObjectId[];

  if (userIds.length === 0) {
    console.error("No users found to assign cars to.");
    throw new Error("No users found to assign cars to.");
  } else {
    console.warn(`Found ${userIds.length} user IDs to assign cars to.`);
  }

  const numberOfLikes = faker.datatype.number({ min: 0, max: userIds.length });
  const likedByUserIds: ObjectId[] = [];

  while (likedByUserIds.length < numberOfLikes) {
    const potentialLike: ObjectId | undefined = getRandomItemFromArray(userIds);

    if (potentialLike && !likedByUserIds.includes(potentialLike)) {
      likedByUserIds.push(potentialLike);
    }
  }

  for (let i = 0; i < numCars; i++) {
    const randomUserId = getRandomItemFromArray(userIds);

    const numberOfLikes = faker.datatype.number({
      min: 0,
      max: userIds.length,
    });
    const likedByUserIds: ObjectId[] = [];

    while (likedByUserIds.length < numberOfLikes) {
      const potentialLike: ObjectId | undefined =
        getRandomItemFromArray(userIds);

      if (potentialLike && !likedByUserIds.includes(potentialLike)) {
        likedByUserIds.push(potentialLike);
      }
    }

    const carDetails = {
      userId: randomUserId,
      carTitle: faker.vehicle.model(),
      carType: getRandomItemFromArray([
        "Sport",
        "SUV",
        "MPV",
        "Sedan",
        "Coupe",
        "Hatchback",
      ]),
      disabledDates: {
        singleDates: [faker.date.future(), faker.date.future()],
        dateRanges: [
          {
            from: faker.date.recent(),
            to: faker.date.soon(),
          },
        ],
      },
      carRented: getRandomItemFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      starRating: getRandomItemFromArray([1, 2, 3, 4, 5]),
      rentPrice: faker.finance.amount(),
      capacity: getRandomItemFromArray([
        "2 Person",
        "4 Person",
        "6 Person",
        "8 or More",
      ]),
      transmission: getRandomItemFromArray([
        "manual",
        "automatic",
        "semi-automatic",
        "cvt",
      ]),
      location: getRandomItemFromArray(locations),
      fuelCapacity: getRandomItemFromArray(["40", "50", "60", "80"]),
      shortDescription: getRandomItemFromArray(shortDescription),
      carImages: [
        faker.image.urlLoremFlickr({
          category: "musclecar",
          width: 640,
          height: 480,
        }),
        faker.image.urlLoremFlickr({
          category: "car,old",
          width: 640,
          height: 480,
        }),
        faker.image.urlLoremFlickr({
          category: "car,old",
          width: 640,
          height: 480,
        }),
      ],
      likes: likedByUserIds,
    };

    const car = new Car(carDetails);
    try {
      await car.save();

      await User.findByIdAndUpdate(randomUserId, {
        $push: { carsAdded: { car: car._id } },
      });

      const randomRentingUserId = getRandomItemFromArray(userIds);
      await User.findByIdAndUpdate(randomRentingUserId, {
        $push: { carsRented: { car: car._id } },
      });
    } catch (error) {
      console.error(
        `Error while saving car for user ID: ${randomUserId}`,
        error
      );
    }
  }
}
