import { Control } from 'react-hook-form';
import { UploadFileResponse } from 'uploadthing/client';
import mongoose from 'mongoose';

export interface DateRange {
  start: Date;
  end: Date;
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
  carImages?: string[];
  liked?: boolean;
  path?: string;
}

export interface CarFormProps {
  userId?: string;
  carId?: string | null;
  car?: CarParams | null;
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
  car?: {
    carImages?: string[];
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
