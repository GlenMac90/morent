"use client";

import { motion } from "framer-motion";
import CarCard from "@/components/CarCard";
import Advert from "@/components/Advert";
import PickUpDropOffCard from "@/components/PickUpDropOffCard";

const adverts = [
  {
    title: "The Best Platform for Car Rental",
    description:
      "Ease of doing a car rental safely and reliably. Of course at a low price.",
    imageSrc: "/pngs/advertWhiteCar.png",
    additionalStyles: "white_car_ad",
    whiteCar: true,
  },
  {
    title: "Easy way to rent a car at a low price",
    description:
      "Providing cheap car rental services and safe and comfortable facilities.",
    imageSrc: "/pngs/advertSilverCar.png",
    additionalStyles: "black_car_ad hidden lg:flex",
    whiteCar: false,
  },
];

const Home = () => {
  return (
    <motion.div
      className="flex flex-col items-center bg-white200 p-2 dark:bg-gray900"
      animate={{ scale: 1 }}
      initial={{ scale: 0 }}
    >
      <div className="mt-24 flex w-full max-w-[90rem] flex-col items-center pt-5">
        <section className="flex w-full max-w-[90rem] px-5">
          <div className="flex w-full flex-col gap-8 lg:flex-row">
            {adverts.map((advert) => (
              <Advert
                key={advert.title}
                title={advert.title}
                description={advert.description}
                imageSrc={advert.imageSrc}
                additionalStyles={advert.additionalStyles}
                whiteCar={advert.whiteCar}
              />
            ))}
          </div>
        </section>
        <div className="mt-7 flex w-full px-5">
          <PickUpDropOffCard />
        </div>
        <div className="mt-11 flex w-full justify-between px-5 xl:px-10">
          <p className="font-medium text-gray400">Popular Cars</p>
          <p className="font-medium text-blue500">View All</p>
        </div>
        <div className="no_scrollbar mt-4 flex w-full gap-5 overflow-x-auto xs:mt-0 xs:items-center xs:p-5 sm:grid sm:grid-cols-2 sm:flex-col sm:justify-center sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <div className="absolute right-0 h-60 w-20 bg-gradient-to-r from-transparent to-white/100 dark:to-gray900/100 xs:h-72 sm:hidden"></div>
          <div className="flex w-5 xs:hidden" />

          {/* Change id to match id of card once live data is passed */}
          {[0, 1, 2, 3, 4].map((card) => (
            <CarCard key={card} isPopularCar={true} id={"123"} />
          ))}
          {/* Change id to match id of card once live data is passed */}
        </div>
        <p className="ml-5 mt-5 self-start font-medium text-gray400 xs:mt-0 xl:mx-10">
          Recommended cars
        </p>
        <div className="mt-5 flex w-full flex-col items-center justify-center gap-5 px-5 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {/* Change id to match id of card once live data is passed */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((card) => (
            <CarCard key={card} id={"123"} />
          ))}
          {/* Change id to match id of card once live data is passed */}
        </div>
        <button className="my-10 rounded bg-blue500 px-10 py-4 text-sm font-medium text-white">
          Show More Cars
        </button>
      </div>
    </motion.div>
  );
};

export default Home;
