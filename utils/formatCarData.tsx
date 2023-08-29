export function convertToPlainObject(data) {
  // Convert date to string
  const stringifyDatesInObject = (obj) => {
    for (const key in obj) {
      if (obj[key] instanceof Date) {
        obj[key] = obj[key].toISOString();
      }
      if (typeof obj[key] === "object" && obj[key] !== null) {
        stringifyDatesInObject(obj[key]);
      }
    }
  };

  const result = { ...data };

  // Convert main _id to string
  result._id = result._id.toString();

  // Convert dates to strings
  stringifyDatesInObject(result);

  // Convert userId to string
  result.userId = result.userId.toString();

  // Convert review _ids, user _ids, and carIds to strings and remove __v fields
  result.reviews = result.reviews.map((review) => {
    review._id = review._id.toString();
    review.userId._id = review.userId?._id.toString();
    review.carId = review.carId.toString(); // Convert carId to string here
    delete review.__v;
    return review;
  });

  // Convert date range _ids to string
  result.disabledDates.dateRanges = result.disabledDates.dateRanges.map(
    (range) => {
      range._id = range._id.toString();
      return range;
    }
  );

  // Remove main __v field
  delete result.__v;

  return result;
}
// I added the line review.carId = review.carId.toString(); within the iteration over result.reviews to convert carId to a string for each review.
