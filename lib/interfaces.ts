export interface DateRange {
  start: Date;
  end: Date;
}

export interface CarParams {
  userId?: string;
  _id?: string;
  carTitle: string;
  carType: string;
  rentPrice?: string;
  capacity?: number;
  transmission?: string;
  location?: string;
  fuelCapacity?: number;
  shortDescription?: string;
  carImageMain?: string;
  disabledDates?: {
    singleDates?: Date[];
    dateRanges?: DateRange[];
  };
}

export interface UserParams {
  id: string;
  _id: any;
  userId: string;
  username: string;
  name: string;
  image?: string;
  bio?: string;
  onboarded?: boolean;
  path: string;
  cars?: CarParams[];
}
