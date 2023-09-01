import React from 'react';
import Image from 'next/image';

import { CarFormHeaderProps } from '@/lib/interfaces';

const CarFormHeader: React.FC<CarFormHeaderProps> = ({
  pathname,
  car,
  imagePreviews,
}) => (
  <div className="flex w-full flex-col justify-start">
    {pathname === '/cars/new' ? (
      <h1 className="text-xl font-semibold ">Add a Car for Rent</h1>
    ) : (
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold ">Edit Car Details</h1>
        <Image src={car.carImages[0]} width={100} height={50} alt="Car Image" />
      </div>
    )}

    <p className="mt-2.5 text-sm text-gray400">Please enter your car info</p>
    <div className="mt-4 flex space-x-4">
      {imagePreviews.map((preview, index) => (
        <div key={index} className="relative h-24 w-24">
          <Image src={preview} alt="Preview" layout="fill" objectFit="cover" />
        </div>
      ))}
    </div>
    <h3 className="mt-8 text-lg font-bold text-blue500">CAR INFO</h3>
  </div>
);

export default CarFormHeader;
