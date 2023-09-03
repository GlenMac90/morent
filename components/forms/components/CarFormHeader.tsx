import Image from 'next/image';
import { CarFormHeaderProps } from '@/lib/interfaces';

const CarFormHeader: React.FC<CarFormHeaderProps> = ({ pathname, car }) => (
  <div className="flex w-full flex-col justify-start">
    {pathname === '/cars/new' ? (
      <>
        <h1 className="text-xl font-semibold ">Add a Car for Rent</h1>
        <p className="mt-2.5 text-sm text-gray400">
          Please enter your car info
        </p>
      </>
    ) : (
      <div className="flex w-full items-center justify-between">
        <h1 className="self-start text-xl font-semibold">Edit Car Details</h1>
        <Image
          src={car?.carImages ? car.carImages[0] : ''}
          width={150}
          height={50}
          alt="Car Image"
          className="rounded-lg"
        />
      </div>
    )}

    <h3 className="mt-8 text-lg font-bold text-blue500">CAR INFO</h3>
  </div>
);

export default CarFormHeader;
