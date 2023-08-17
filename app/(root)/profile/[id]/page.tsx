import Link from 'next/link';
import Image from 'next/image';

import { currentUser } from '@clerk/nextjs';
import { fetchUserWithCars } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/button';

interface DisabledDateRange {
  from: Date;
  to: Date;
}

interface Car {
  _id: string;
  userId: string;
  carTitle: string;
  carType: string;
  disabledDates: {
    singleDates: Date[];
    dateRanges: DisabledDateRange[];
  };
  rentPrice: string;
  capacity: number;
  transmission: string;
  location: string;
  fuelCapacity: number;
  shortDescription: string;
  carImageMain: string;
}

interface UserWithCars {
  _id: string;
  id: string;
  username: string;
  name: string;
  image?: string;
  bio?: string;
  onboarded: boolean;
  cars: Car[];
}

const Page = async () => {
  const user = (await currentUser()) as any;
  if (!user) return null;
  const userId = user.id;
  const userCars: UserWithCars = await fetchUserWithCars(userId);

  if (!userCars.cars || userCars.cars.length === 0) {
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
          {userCars.cars.map((car: Car) => {
            console.log(car);
            console.log(car?.carImageMain);
            const carIdString = car._id.toString();
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
