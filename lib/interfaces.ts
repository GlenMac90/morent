import { Control } from "react-hook-form";
import { UploadFileResponse } from "uploadthing/client";
import mongoose from "mongoose";

export interface DateRange {
  start: Date;
  end: Date;
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
    dateRanges?: DateRange[];
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
  bio?: string;
  onboarded?: boolean;
  path: string;
  cars?: CarParams[];
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
  userImage: string;
  username: string;
  rating: number;
  carImage: string;
  title: string;
  content: string;
  datePosted?: Date;
}
