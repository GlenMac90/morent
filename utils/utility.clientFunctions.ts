'use client';

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
