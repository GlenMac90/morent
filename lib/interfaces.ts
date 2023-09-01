import { Control } from 'react-hook-form';
import { UploadFileResponse } from 'uploadthing/client';
import mongoose from 'mongoose';

export interface GeocodeResult {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  properties: {
    name: string;
  };
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface CarParams {
  userId?: string;
  _id?: string;
  carTitle: string;
  carType: string;
  disabledDates?: {
    singleDates?: Date[];
    dateRanges?: DateRange[];
  };
  rentPrice?: string;
  carRented?: number;
  starRating?: number[];
  likes?: number;
  capacity?: string;
  transmission?: string;
  location?: string;
  fuelCapacity?: string;
  shortDescription?: string;
  carImages: string[];
  liked?: boolean;
  path?: string;
}

export interface CarFormProps {
  userId?: string;
  carId?: string | null;
  car: CarParams;
}

export type FormData = {
  carTitle: string;
  carType: string;
  rentPrice: string;
  capacity: string;
  transmission: string;
  location: string;
  fuelCapacity: string;
  shortDescription: string;
  carImages: string[];
  path: string;
};

interface CarAddedParams {
  car: mongoose.Types.ObjectId;
  reviews?: mongoose.Types.ObjectId[];
}

interface CarRentedParams {
  car: mongoose.Types.ObjectId;
  reviewId?: mongoose.Types.ObjectId;
}

export interface UserParams {
  id: string;
  _id?: mongoose.Types.ObjectId;
  username: string;
  email?: string;
  name: string;
  image?: string;
  coverImage?: string;
  bio?: string;
  onboarded?: boolean;
  path?: string;
  carsAdded?: CarAddedParams[];
  carsRented?: CarRentedParams[];
}

export type EditUserFormFields = {
  name: string;
  username: string;
  bio?: string;
  image: string;
  email?: string;
};

type FieldNames = keyof FormData;

export type SelectItems = {
  value: string;
  label: string;
};

export interface SelectInputProps {
  control: Control<FormData>;
  name: FieldNames;
  label: string;
  placeholder: string;
  items: SelectItems[];
}
export interface InputControllerProps {
  control: Control<FormData>;
  name: FieldNames;
  label: string;
  placeholder: string;
  type?: string;
}

export interface CarFormButtonsProps {
  pathname: string;
  carIdFromPath: string | null;
  handleDelete: (carId: string) => Promise<void>;
  setIsConfirmingDelete: (val: boolean) => void;
  isConfirmingDelete: boolean;
  setIsLoading: (val: boolean) => void;
  isLoading: boolean;
}

export interface FileWithPreview extends File {
  preview?: string;
}

export type CarFormHeaderProps = {
  pathname: string;
  car: {
    carImages: string[];
  };
  imagePreviews: string[];
};

export type UploadFunction = (
  files: FileWithPreview[]
) => Promise<UploadFileResponse[] | undefined>;

export interface FeedbackMessageProps {
  isLoading: boolean;
  error?: string | null;
  success?: boolean;
}

export interface ToastOptions {
  title: string;
  description: string;
  variant?: 'destructive' | 'success';
}

export type ToastFunction = (options: ToastOptions) => void;

export interface ReviewDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  carId: mongoose.Types.ObjectId;
  rating: number;
  title: string;
  content: string;
  datePosted?: Date;
}

export type State = {
  isConfirmingSeed: boolean;
  isConfirmingDelete: boolean;
  isConfirmingReviewsSeed: boolean;
};

export type Action =
  | { type: 'TOGGLE_SEED_CONFIRMATION' }
  | { type: 'CANCEL_SEED_CONFIRMATION' }
  | { type: 'TOGGLE_REVIEWS_SEED_CONFIRMATION' }
  | { type: 'CANCEL_REVIEWS_SEED_CONFIRMATION' }
  | { type: 'TOGGLE_DELETE_CONFIRMATION' }
  | { type: 'CANCEL_DELETE_CONFIRMATION' };
