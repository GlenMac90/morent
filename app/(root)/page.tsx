// import { UserButton, currentUser } from "@clerk/nextjs";
// import { fetchUser } from "@/lib/actions/user.actions";
// import { redirect } from "next/navigation";
import CarCard from "@/components/CarCard";
import Advert from "@/components/Advert";

const Home = async () => {
  // const info = await currentUser();
  // if (!info) return null;

  // const userInfo = await fetchUser(info.id);

  // if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <div className="flex flex-col items-center bg-white200 p-2">
      {/* <UserButton afterSignOutUrl="/" /> */}
      <p className="">Hello World!</p>
      <div className="flex w-full max-w-7xl flex-col items-center pt-5">
        <section className="flex w-full max-w-7xl px-5">
          <div className="flex w-full flex-col gap-8 lg:flex-row">
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
        </section>

        <div className="mt-10 flex w-full justify-between px-5">
          <p className="font-medium text-gray400">Popular Cars</p>
          <p className="font-medium text-blue500">View All</p>
        </div>
        <div className="no_scrollbar mt-4 flex w-full gap-5 overflow-x-auto xs:mt-0 xs:flex-col xs:items-center xs:justify-center xs:p-5 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <div className="absolute right-0 h-60 w-20 bg-gradient-to-r from-transparent to-white/100 xs:hidden"></div>
          <div className="flex w-5 xs:hidden" />
          {[0, 1, 2, 3, 4].map((card) => (
            <CarCard key={card} isPopularCar={true} />
          ))}
        </div>
        <p className="ml-5 mt-5 self-start font-medium text-gray400 xs:mt-0">
          Recommended cars
        </p>
        <div className="mt-5 flex w-full flex-col items-center gap-5 px-5 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((card) => (
            <CarCard key={card} />
          ))}
        </div>
        <button className="mt-10 rounded-md bg-blue500 px-10 py-4 text-sm font-medium text-white">
          Show More Cars
        </button>
      </div>
    </div>
  );
};

export default Home;
