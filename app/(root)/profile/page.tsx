import { currentUser } from "@clerk/nextjs";

import ProfileHeading from "@/components/ProfileHeading";
import RentedCars from "@/components/profilePageComponents/RentedCars";
import UsersCarsForRent from "@/components/profilePageComponents/UsersCarsForRent";
import { userFromDB } from "@/lib/actions/user.actions";
import {
  fetchCarsAddedByUser,
  fetchCarsRentedByUser,
} from "@/lib/actions/car.actions";
import { getAllReviewsByUser } from "@/lib/actions/review.actions";

const Page = async () => {
  const user = await currentUser();
  const userData = await userFromDB(user?.id);
  const userId = userData?._id;
  const addedCars = await fetchCarsAddedByUser(userId?.toString());
  const carsRented = await fetchCarsRentedByUser(userId?.toString());
  const reviews = await getAllReviewsByUser(userId?.toString());

  return (
    <div className="flex w-full justify-center self-center bg-white200 dark:bg-gray900">
      <div className="mt-20 flex w-full max-w-[90rem] flex-col p-6 md:mt-40">
        <ProfileHeading
          userData={JSON.stringify(userData)}
          reviews={JSON.stringify(reviews)}
        />
        <RentedCars rentedCars={JSON.stringify(carsRented)} />
        <UsersCarsForRent carsForRent={JSON.stringify(addedCars)} />
      </div>
    </div>
  );
};

export default Page;
