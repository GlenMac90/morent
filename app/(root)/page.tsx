import Link from "next/link";
import { UserButton, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { userFromDB } from "@/lib/actions/user.actions";
import Advert from "@/components/Advert";
import { Button } from "@/components/ui/button";
import CarCard from "@/components/CarCard";
import PickUpDropOffCard from "@/components/PickUpDropOffCard";

const Home = async () => {
  let info;
  try {
    info = await currentUser();
  } catch (error) {
    console.error("Error fetching current user:", error);
    return <div>Error fetching user data.</div>;
  }

  if (!info) return <div>User not authenticated.</div>;

  let userInfo;
  try {
    userInfo = await userFromDB(info?.id);
  } catch (error) {
    console.error("Error fetching MongoDB user data:", error);
    return <div>Error fetching MongoDB user data.</div>;
  }

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <div className="flex flex-col items-center bg-white200 pb-10 pt-8 xl:pb-16">
      <div className="flex w-full justify-between">
        <Link href={`/profile/${info?.id}`}>
          <Button className="bg-blue500 text-white">Profile</Button>
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="flex w-full max-w-[90rem] flex-col items-center pt-5">
        <section className="flex w-full flex-col px-5 xl:px-16">
          <div className="mb-8 flex w-full flex-col gap-8 lg:flex-row">
            <Advert
              title="The Best Platform for Car Rental"
              description="Ease of doing a car rental safely and reliably. Of course at a low
          price."
              imageSrc="/pngs/advertWhiteCar.png"
              additionalStyles="white_car_ad"
            />
            <Advert
              title="Easy way to rent a car at a low price"
              description="Providing cheap car rental services and safe and comfortable facilities."
              imageSrc="/pngs/advertSilverCar.png"
              additionalStyles="black_car_ad hidden lg:flex"
            />
          </div>
          <PickUpDropOffCard />
        </section>

        <div className="mt-[3.75rem] flex w-full justify-between px-5 xl:mt-[2.88rem] xl:px-16">
          <p className="font-medium text-gray400">Popular Cars</p>
          <p className="font-medium text-blue500">View All</p>
        </div>
        <div className="no_scrollbar mt-4 flex w-full gap-5 overflow-x-auto xs:mt-0 xs:flex-col xs:items-center xs:justify-center xs:p-5 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:px-16">
          <div className="absolute right-0 h-60 w-20 bg-gradient-to-r from-transparent to-white/100 xs:hidden"></div>
          <div className="flex w-5 xs:hidden" />

          {/* Change id to match id of card once live data is passed */}
          {[0, 1, 2, 3, 4].map((card) => (
            <CarCard key={card} isPopularCar={true} id={"123"} />
          ))}
          {/* Change id to match id of card once live data is passed */}
        </div>
        <p className="ml-5 mt-5 self-start font-medium text-gray400 xs:mt-0 xl:px-16">
          Recommended cars
        </p>
        <div className="mt-5 flex w-full flex-col items-center gap-5 px-5 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:px-16">
          {/* Change id to match id of card once live data is passed */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((card) => (
            <CarCard key={card} id={"123"} />
          ))}
          {/* Change id to match id of card once live data is passed */}
        </div>
        <button className="mt-10 rounded-md bg-blue500 px-10 py-4 text-sm font-medium text-white xl:mt-16">
          Show More Cars
        </button>
      </div>
    </div>
  );
};

export default Home;
