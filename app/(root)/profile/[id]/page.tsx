import React from 'react';
import { currentUser } from '@clerk/nextjs';
import { fetchUserWithCars } from '@/lib/actions/user.actions';

interface Car {
  _id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
}

interface UserWithCars {
  _id: string;
  id: string;
  cars: Car[];
}

const Page = async () => {
  const user = (await currentUser()) as any;
  if (!user) return null;
  const userId = user.id;
  const userMongo: UserWithCars = await fetchUserWithCars(userId);

  console.log(userMongo.cars);

  if (!userMongo.cars || userMongo.cars.length === 0) {
    return (
      <div className="my-10 flex w-full items-center justify-center bg-white200">
        <p>No cars available for this user.</p>
      </div>
    );
  }

  return (
    <div className="my-10 flex w-full items-center justify-center bg-white200">
      <div>
        <h2>Cars:</h2>
        <ul>
          {userMongo.cars.map((car: Car) => (
            <li key={car._id}>
              {car.brand} {car.model} ({car.year}) - Color: {car.color}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
