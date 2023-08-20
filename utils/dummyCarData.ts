import {
  carTestPicture,
  carInteriorOne,
  carInteriorTwo,
  carExterior,
} from "@/public/testCarPictures";

import { advertSilverCar } from "@/public/pngs";

export const dummyData = {
  id: 12345,
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
};
