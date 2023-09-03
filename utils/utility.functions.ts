export function calculateDaysBetweenDates(
  dateStr1: Date,
  dateStr2: Date
): number {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);

  // Calculate the time difference in milliseconds
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());

  // Convert milliseconds to days
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff + 1;
}

export function calculateOrderAmount(daysRented: number, rentPrice: number) {
  return daysRented * rentPrice;
}
