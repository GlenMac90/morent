import { CarParams } from "@/lib/interfaces";

type ReviewType = {
  _id: any; // Placeholder, adjust as necessary.
  userId: { _id: any };
  carId: any; // Placeholder, adjust as necessary.
  __v?: any;
};

type DateRange = {
  _id: any; // Placeholder, adjust as necessary.
};

// type DataType = {
//   _id: any;
//   userId?: any;
//   reviews: ReviewType[];
//   disabledDates: {
//     dateRanges: DateRange[];
//   };
//   __v?: any;
// };

export function convertToPlainObject(data: CarParams | any) {
  // Convert date to string
  const formatDate = (date: Date): string => {
    // Specify type for date
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const stringifyDatesInObject = (obj: any): void => {
    // Specify type for obj
    for (const key in obj) {
      if (obj[key] instanceof Date) {
        obj[key] = formatDate(obj[key]);
      }
      if (typeof obj[key] === "object" && obj[key] !== null) {
        stringifyDatesInObject(obj[key]);
      }
    }
  };

  const result = { ...data };

  result._id = result._id.toString();

  stringifyDatesInObject(result);

  result.userId = result.userId.toString() || "";

  result.reviews = result.reviews.map((review: ReviewType): ReviewType => {
    // Specify type for review
    if (review._id) {
      review._id = review._id.toString();
    }
    if (review.userId && review.userId._id) {
      review.userId._id = review.userId._id.toString();
    }
    if (review.carId) {
      review.carId = review.carId.toString();
    }
    delete review.__v;
    return review;
  });

  result.disabledDates.dateRanges = result.disabledDates.dateRanges.map(
    (range: DateRange): DateRange => {
      // Specify type for range
      range._id = range._id.toString() || "";
      return range;
    }
  );

  delete result.__v;

  return result;
}

// I added the line review.carId = review.carId.toString(); within the iteration over result.reviews to convert carId to a string for each review.
