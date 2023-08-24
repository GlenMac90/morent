import {
  carInteriorOne,
  carInteriorTwo,
  carExterior,
} from "@/public/testCarPictures";

import { advertSilverCar } from "@/public/pngs";

export const dummyData = {
  id: "60f5865d6fbb2a3e488585ed",
  brand: "Rolls-Royce",
  type: "Sedan",
  capacity: 4,
  transmission: "Manual",
  fuelCapacity: 80,
  isFavourited: true,
  shortDescription:
    "The Rolls-Royce is a British luxury automobile maker known for its opulent design, unmatched craftsmanship, and attention to detail.",
  rentPrice: "96.00",
  mainPicture: advertSilverCar,
  pictures: [carExterior, carInteriorOne, carInteriorTwo],
  rating: 4.634567,
  numberOfReviews: 1,
};
