import Link from 'next/link';
import Image from 'next/image';

import { currentUser } from '@clerk/nextjs';
import { fetchUserWithCars } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/button';
import { UserParams, CarParams } from '@/lib/interfaces';

const Page = async () => {
  const user = (await currentUser()) as any;

  if (!user) {
    return (
      <div className="my-10 flex w-full items-center justify-center bg-red-200">
        <p>
          Unable to fetch user data. Please log in or check your connection.
        </p>
      </div>
    );
  }

  const userId = user.id;
  const userCars: UserParams | null = await fetchUserWithCars(userId);

  if (!userCars || !userCars.cars || userCars.cars.length === 0) {
    return (
      <div className="my-10 flex w-full items-center justify-center bg-white200">
        <p>No cars available for this user.</p>
      </div>
    );
  }
  return (
    <div className="my-10 flex w-full items-center justify-center bg-blue100">
      <div>
        <h2>Cars:</h2>
        <ul className="grid grid-cols-3 gap-8">
          {userCars.cars.map((car: CarParams) => {
            if (!car._id || !car.carImageMain) return null;
            const carIdString = car?._id.toString();
            return (
              <li
                key={carIdString}
                className="flex flex-col items-center space-y-2"
              >
                <div className="text-center">
                  {car.carTitle} {car.carType}
                </div>
                <Image
                  src={car.carImageMain}
                  alt={car.carTitle}
                  width={200}
                  height={150}
                />
                <Link href={`/cars/${carIdString}`}>
                  <Button className="bg-blue500 text-white">Edit car</Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Page;
