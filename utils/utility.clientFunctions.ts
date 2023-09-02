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
  const capacityMap: { [key: string]: number } = {};
  const carTypeMap: { [key: string]: number } = {};

  cars?.forEach((car) => {
    capacityMap[car?.capacity ?? ""] =
      (capacityMap[car?.capacity ?? ""] || 0) + 1;
    carTypeMap[car?.carType ?? ""] = (carTypeMap[car?.carType ?? ""] || 0) + 1;
  });

  return {
    capacityMap,
    carTypeMap,
  };
};
