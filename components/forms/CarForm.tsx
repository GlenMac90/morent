'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useForm, Controller, Control } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/components/ui/use-toast';
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { CarValidation } from '@/lib/validations/car';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing';
import { createCar, deleteCar, editCar } from '@/lib/actions/car.actions';
import DragDrop from './DragDrop';
import { CarParams } from '@/lib/interfaces';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface Props {
  userId?: string;
  carId?: string | null;
  car?: CarParams | null;
}

interface FileWithPreview extends File {
  preview?: string;
}

const CarForm: React.FC<Props> = ({ userId, car }) => {
  const { startUpload } = useUploadThing('media');
  const router = useRouter();
  const pathname = usePathname();
  const [dragDropFiles, setDragDropFiles] = useState<FileWithPreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const carIdPattern = /^\/cars\/(?!new$)([a-zA-Z0-9]+)$/;
  const match = pathname.match(carIdPattern);
  const carIdFromPath = match ? match[1] : null;

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(CarValidation),
    defaultValues: {
      carTitle: car?.carTitle || '',
      carType: car?.carType || '',
      rentPrice: car?.rentPrice || '',
      capacity: car?.capacity || 1,
      transmission: car?.transmission || '',
      location: car?.location || '',
      fuelCapacity: car?.fuelCapacity || 0,
      shortDescription: car?.shortDescription || '',
      carImageMain: car?.carImageMain || '',
      path: car?.path || '',
    },
  });

  const uploadImages = async (
    imagePreviews: string[],
    files: FileWithPreview[]
  ): Promise<string[]> => {
    const uploadPromises = imagePreviews.map(async (blob, index) => {
      const isImage = isBase64Image(blob);
      if (!isImage) return null;

      const imgRes = await startUpload([files[index]]);
      return imgRes?.[0]?.fileUrl || null;
    });

    const uploadedUrls: (string | null)[] = await Promise.all(uploadPromises);
    return uploadedUrls.filter((url) => url !== null) as string[];
  };

  const onSubmit = async (values: z.infer<typeof CarValidation>) => {
    setIsLoading(true);
    setError(null);

    if (Object.keys(form.formState.errors).length > 0) {
      const errorFields = Object.keys(form.formState.errors);
      const errorMessage = `Errors in: ${errorFields.join(', ')}`;
      toast({
        title: 'Validation Error',
        description: errorMessage,
      });
      setIsLoading(false);
      return;
    }

    if (dragDropFiles.length === 0 && pathname === '/cars/new') {
      toast({
        variant: 'destructive',
        title: 'Not so quick!',
        description: 'Please add an image before submitting the form.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const uploadedUrls = await uploadImages(imagePreviews, dragDropFiles);
      if (!uploadedUrls) {
        throw new Error('Failed to upload image.');
      }

      if (uploadedUrls.length > 0) {
        values.carImageMain = uploadedUrls[0];
      }
      const carData = {
        userId,
        carTitle: values.carTitle || '',
        carType: values.carType || '',
        rentPrice: values.rentPrice || '',
        capacity: values.capacity || 1,
        transmission: values.transmission || '',
        location: values.location || '',
        fuelCapacity: values.fuelCapacity || 1,
        shortDescription: values.shortDescription || '',
        carImageMain: values.carImageMain,
      };

      if (car?._id) {
        await editCar({
          ...carData,
          _id: car?._id,
        });
        setSuccess(true);
      } else {
        await createCar(carData);
        setSuccess(true);
      }

      toast({
        variant: 'success',
        title: 'Success',
        description: 'Car registered successfully',
      });

      if (pathname === '/cars/new') {
        router.back();
      } else {
        router.push('/');
      }
    } catch (error) {
      let errorMessage = car?._id
        ? 'There was an issue while updating the car.'
        : 'There was an issue while creating the car.';

      if (error instanceof Error) {
        errorMessage += ` Detail: ${error.message}`;
        console.error({ error, message: error.message });
      } else {
        console.error({ error, message: 'An unknown error occurred' });
      }

      setError(errorMessage);
    } finally {
      setSuccess(false);
      setIsLoading(false);
    }
  };

  const handleFilesChange = (files: FileWithPreview[]) => {
    setDragDropFiles(files);

    const fileReadPromises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          const result = fileReader.result as string;
          resolve(result);
        };
        fileReader.onerror = () => {
          reject(fileReader.error);
        };
      });
    });

    Promise.all(fileReadPromises)
      .then((allFileData) => {
        setImagePreviews(allFileData);
        if (allFileData.length > 0) {
          form.setValue('carImageMain', allFileData[0] || '');
        }
      })
      .catch((error) => {
        console.error('Error reading one or more files:', error);
      });
  };

  const handleDelete = async (carId: string) => {
    try {
      setIsLoading(true);
      await deleteCar(carId);

      toast({
        title: 'Success',
        description: 'Car deleted successfully.',
      });

      router.push('/');
    } catch (error) {
      console.error('Failed to delete car:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete car. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-4xl flex-col items-center gap-5 rounded-xl bg-white px-6 py-12 dark:bg-gray850"
      >
        {isLoading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {success && (
          <div className="text-green-500">Car registered successfully!</div>
        )}

        <div className="flex w-full flex-col justify-start">
          {pathname === '/cars/new' ? (
            <h1 className="text-xl font-semibold ">Add a Car for Rent</h1>
          ) : (
            <div className="flex w-full items-center justify-between">
              <h1 className="text-xl font-semibold ">Edit Car Details</h1>
              <Image
                src={car?.carImageMain || ''}
                width={100}
                height={50}
                alt="Car Image"
              />
            </div>
          )}

          <p className="mt-2.5 text-sm text-gray400">
            Please enter your car info
          </p>
          <div className="mt-4 flex space-x-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative h-24 w-24">
                <Image
                  src={preview}
                  alt="Preview"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
          <h3 className="mt-8 text-lg font-bold text-blue500">CAR INFO</h3>
        </div>
        <div className="flex w-full flex-col gap-8 md:flex-row ">
          <InputController
            control={form.control}
            name="carTitle"
            label="Car Title"
            placeholder="Your title"
          />
          <Controller
            control={form.control}
            name="carType"
            render={({ field, fieldState }) => (
              <FormItem className="flex w-full flex-col justify-start">
                <FormLabel>Car Type</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="h-11 bg-white200 dark:bg-gray800 md:h-14">
                      <SelectValue placeholder="Car Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sport">Sport</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="mpv">MPV</SelectItem>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="coupe">Coupe</SelectItem>
                      <SelectItem value="hatchback">Hatchback</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {fieldState.invalid && (
                  <span className="text-red-500">Car type is required!</span>
                )}
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full flex-col gap-8 md:flex-row">
          <InputController
            control={form.control}
            name="rentPrice"
            label="Rent Price"
            placeholder="Price"
          />

          <Controller
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col justify-start">
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Select
                    value={String(field.value)}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger className="h-11 bg-white200 dark:bg-gray800 md:h-14">
                      <SelectValue placeholder="Capacity in persons" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Person</SelectItem>
                      <SelectItem value="4">4 Person</SelectItem>
                      <SelectItem value="6">6 Person</SelectItem>
                      <SelectItem value="8">8 or more</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full flex-col gap-8 md:flex-row">
          <Controller
            control={form.control}
            name="transmission"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col justify-start">
                <FormLabel>Transmission</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="h-11 bg-white200 dark:bg-gray800 md:h-14">
                      <SelectValue placeholder="Car Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="semi-automatic">
                        Semi-automatic
                      </SelectItem>
                      <SelectItem value="cvt">CVT</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <InputController
            control={form.control}
            name="location"
            label="Location"
            placeholder="Select your city"
          />
        </div>
        <div className="flex w-full flex-col gap-8 md:flex-row">
          <Controller
            control={form.control}
            name="fuelCapacity"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col justify-start">
                <FormLabel>Fuel Capacity</FormLabel>
                <FormControl>
                  <Select
                    value={String(field.value)}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger className="h-11 bg-white200 dark:bg-gray800 md:h-14">
                      <SelectValue placeholder="Fuel Capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="40">40 litres</SelectItem>
                      <SelectItem value="50">50 litres</SelectItem>
                      <SelectItem value="60">60 litres</SelectItem>
                      <SelectItem value="80">80 litres or more</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <InputController
            control={form.control}
            name="shortDescription"
            label="Short Description"
            placeholder="Enter a short description"
          />
        </div>

        <p className="self-start font-semibold text-gray900 dark:text-white">
          Upload Images
        </p>

        <DragDrop handleFilesChange={handleFilesChange} />

        <CarFormButtons
          pathname={pathname}
          carIdFromPath={carIdFromPath}
          isConfirmingDelete={isConfirmingDelete}
          setIsConfirmingDelete={setIsConfirmingDelete}
          handleDelete={handleDelete}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </form>
    </Form>
  );
};

export default CarForm;

type FormData = {
  carTitle: string;
  carType: string;
  rentPrice: string;
  capacity: number;
  transmission: string;
  location: string;
  fuelCapacity: number;
  shortDescription: string;
  carImageMain: string;
  path: string;
};

type FieldNames =
  | 'carTitle'
  | 'carType'
  | 'rentPrice'
  | 'capacity'
  | 'transmission'
  | 'location'
  | 'fuelCapacity'
  | 'shortDescription'
  | 'carImageMain'
  | 'path';

interface InputControllerProps {
  control: Control<FormData>;
  name: FieldNames;
  label: string;
  placeholder: string;
  type?: string;
}

const InputController: React.FC<InputControllerProps> = ({
  control,
  name,
  label,
  placeholder,
  type,
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <FormItem className="flex w-full flex-col justify-start">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                className="h-11 bg-white200 dark:bg-gray800 md:h-14 "
                {...field}
                placeholder={placeholder}
                type={type}
              />
            </FormControl>
            {fieldState.invalid && (
              <span className="text-red-500">{`${label} is required!`}</span>
            )}
          </FormItem>
        )}
      />
    </>
  );
};

interface CarFormButtonsProps {
  pathname: string;
  carIdFromPath: string | null;
  handleDelete: (carId: string) => Promise<void>;
  setIsConfirmingDelete: (val: boolean) => void;
  setIsLoading: (val: boolean) => void;
  isLoading: boolean;
  isConfirmingDelete: boolean;
}

const CarFormButtons: React.FC<CarFormButtonsProps> = ({
  pathname,
  carIdFromPath,
  handleDelete,
  setIsConfirmingDelete,
  isConfirmingDelete,
  setIsLoading,
  isLoading,
}) => {
  return (
    <div className="flex w-full justify-end space-x-4 self-end">
      {pathname === `/cars/${carIdFromPath}` && carIdFromPath && (
        <>
          {isConfirmingDelete ? (
            <div className="flex space-x-4">
              <div className="flex w-full">
                <Button
                  className="flex self-end bg-red-500 p-5 text-white sm:w-auto"
                  onClick={async () => {
                    setIsLoading(true);
                    await handleDelete(carIdFromPath);
                    setIsConfirmingDelete(false);
                  }}
                >
                  Confirm Delete
                </Button>
              </div>
              <Button
                className="flex w-full self-end bg-gray-500 p-5 text-white md:w-auto"
                onClick={() => {
                  setIsConfirmingDelete(false);
                }}
              >
                Cancel Delete
              </Button>
            </div>
          ) : (
            <Button
              className="flex w-full self-end bg-red-500 p-5 text-white md:w-auto"
              onClick={() => {
                setIsConfirmingDelete(true);
              }}
            >
              Delete Car
            </Button>
          )}
          <Button
            className="flex w-full  bg-blue500 p-5 text-white md:w-auto"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Car'}
          </Button>
        </>
      )}
      {pathname === `/cars/new` && (
        <Button
          className="flex w-full  bg-blue500 p-5 text-white md:w-auto"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register Car'}
        </Button>
      )}
    </div>
  );
};
