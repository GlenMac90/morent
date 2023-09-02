"use client";

import { CarParams } from "@/lib/interfaces";

export function clearLocalStorageItems() {
  localStorage.removeItem("availabilityFrom");
  localStorage.removeItem("availabilityTo");
  localStorage.removeItem("location");
}

export function parseLocalStorageDate(key: string, defaultDate: Date) {
  const storedDate = localStorage.getItem(key);

  if (storedDate && storedDate !== "undefined") {
    return new Date(JSON.parse(storedDate));
  }

  return defaultDate;
}

export const getCapacityAndCarType = (cars: CarParams[] | null) => {
  const carTypeMap: { [key: string]: number } = {};
  const capacityMap: { [key: string]: number } = {};

  cars?.forEach((car) => {
    // NOTE If the car type exists in the object, it retrieves the current count associated with that car type.
    // If it doesn't exist, it defaults to 0 so that it can plus 1.
    carTypeMap[car?.carType ?? ""] = (carTypeMap[car?.carType ?? ""] || 0) + 1;
    // NOTE Dynamically adds new keys
    capacityMap[car?.capacity ?? ""] =
      (capacityMap[car?.capacity ?? ""] || 0) + 1;
  });

  return {
    carTypeMap,
    capacityMap,
  };
};
