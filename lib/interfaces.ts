import { Control } from "react-hook-form";
import { UploadFileResponse } from "uploadthing/client";
import mongoose from "mongoose";

export interface DateRangeCars {
  from: Date;
  to: Date;
}

export interface CarParams {
  userId?: string;
  _id?: string;
  carTitle: string;
  carType: string;
  carRented?: number;
  starRating?: number;
  rentPrice?: string;
  capacity?: string;
  transmission?: string;
  location?: string;
  fuelCapacity?: string;
  shortDescription?: string;
  carImageMain?: string;
  disabledDates?: {
    singleDates?: Date[];
    dateRanges?: DateRangeCars[];
  };
  path?: string;
  liked?: boolean;
}

export interface UserParams {
  id: string;
  _id: any;
  userId: string;
  username: string;
  name: string;
  image?: string;
  coverImage?: string;
  bio?: string;
  onboarded?: boolean;
  path: string;
  cars?: CarParams[];
}

export interface UserParamsProfilePage {
  _id: string;
  userId: string;
  carId: { _id: string; carTitle: number; carImages: string[] };
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
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
  carImageMain: string;
  path: string;
};

export type FieldNames = keyof FormData;

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
  isNumeric: boolean;
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

export interface Props {
  userId?: string;
  carId?: string | null;
  car?: CarParams | null;
}

export interface FileWithPreview extends File {
  preview?: string;
}

export type CarFormHeaderProps = {
  pathname: string;
  car?: {
    carImageMain?: string;
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
  variant?: "destructive" | "success";
}

export type ToastFunction = (options: ToastOptions) => void;

export interface ReviewDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  carId: mongoose.Types.ObjectId;
  rating: number;
  carImage: string;
  title: string;
  content: string;
  datePosted?: Date;
}

export type GeocodeResult = {
  properties: {
    name: string;
  };
};

export interface DateRange {
  from: string;
  to: string;
  _id: string;
}

export interface DisabledDates {
  singleDates: string[];
  dateRanges: DateRange[];
}

export interface UserIdInReview {
  _id: string;
  image: string;
  username: string;
}

export interface SingleReviewProps {
  _id: string;
  userId: UserIdInReview | null;
  carId: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewData {
  _id?: string;
  userId?: {
    _id?: string;
    image?: string;
    username?: string;
  };
  carId?: {
    _id: string;
    carTitle: string;
    carImages: string[];
  };
  rating: number;
  title?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CleanDateRange {
  from: string;
  to: string;
  _id: string;
}

interface CleanReview {
  _id: string;
  userId?: string | null;
  carId: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CleanedCarProps {
  disabledDates: {
    singleDates: string[];
    dateRanges: CleanDateRange[];
  };
  starRating?: any[]; // You can specify a more specific type if you know what should be inside.
  _id: string;
  userId: string;
  reviews: CleanReview[];
  carTitle: string;
  carType: string;
  carRented: number;
  rentPrice: string;
  capacity: string;
  transmission: string;
  location: string;
  fuelCapacity: string;
  shortDescription: string;
  carImages: any[]; // Again, if you know the content, specify the type.
  createdAt: string;
  updatedAt: string;
}
