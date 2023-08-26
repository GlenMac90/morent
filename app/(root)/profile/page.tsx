import Link from "next/link";

import CarCard from "@/components/carCardComponents/CarCard";
import { dummyData } from "@/utils/dummyCarData";
import { dummyUserData } from "@/utils/dummyUserData";
import ProfileHeading from "@/components/ProfileHeading";

const Page = () => {
  return (
    <div className="flex w-full justify-center self-center bg-white200 dark:bg-gray900">
      <div className="mt-20 flex w-full max-w-[90rem] flex-col p-6 md:mt-40">
        <ProfileHeading userData={dummyUserData} />
        <p className="mt-10 font-medium text-gray400">Rented Cars</p>
        <section className="mt-7 flex flex-col items-center gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dummyUserData.carsHired.map((id) => (
            <CarCard carData={dummyData} key={id} id={id} canReview={true} />
          ))}
        </section>
        <p className="mt-10 font-medium text-gray400">My Cars for Rent</p>
        <section className="mt-7 flex flex-col items-center gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dummyUserData.cars.map((id) => (
            <CarCard carData={dummyData} key={id} canEdit={true} id={id} />
          ))}
        </section>
        <Link href="/cars/new" className="self-center">
          <button className="mt-14 w-[14.25rem] self-center rounded-lg bg-blue500 p-5 font-semibold text-white">
            Add More Cars for Rent
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
