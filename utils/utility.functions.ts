import * as mongoose from 'mongoose';

export function objectToStringId(
  objectId?: mongoose.Types.ObjectId
): string | null {
  if (objectId) {
    return objectId.toHexString();
  } else {
    return null;
  }
}

export function stringToObjectId(id: string): mongoose.Types.ObjectId | null {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id);
  } else {
    return null;
  }
}

export function clearLocalStorageItems() {
  localStorage.removeItem('availabilityFrom');
  localStorage.removeItem('availabilityTo');
  localStorage.removeItem('location');
}

export function parseLocalStorageDate(key: string, defaultDate: Date) {
  const storedDate = localStorage.getItem(key);

  if (storedDate && storedDate !== 'undefined') {
    return new Date(JSON.parse(storedDate));
  }

  return defaultDate;
}

export function calculateDaysBetweenDates(
  dateStr1: string,
  dateStr2: string
): number {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);

  // Calculate the time difference in milliseconds
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());

  // Convert milliseconds to days
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff + 1;
}

export function calculateOrderAmount(daysRented, rentPrice) {
  return daysRented * rentPrice;
}
