import React from "react";

import Advert from "./Advert";

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

const AdvertsDisplay = () => {
  return (
    <div className="flex w-full gap-8">
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
  );
};

export default AdvertsDisplay;
