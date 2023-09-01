"use server";

import { fetchReviewsForCar } from "../actions/review.actions";

const fetchReviewsForCarsHook = async (carId: string) => {
  const reviews = await fetchReviewsForCar(carId);

  return reviews;
};

export default fetchReviewsForCarsHook;
