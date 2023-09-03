'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form';

import { CarValidation } from '@/lib/validations/car';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing';
import { createCar, deleteCar, editCar } from '@/lib/actions/car.actions';
import DragDrop from './DragDrop';
import { CarFormProps, FileWithPreview } from '@/lib/interfaces';
import {
  carTypes,
  capacities,
  transmissionOptions,
  fuelCapacityOptions,
} from '@/constants';
import Location from '../Location';

import {
  CarFormButtons,
  CarFormHeader,
  FormState,
  InputController,
  SelectInput,
} from './components/index';

import CarFormImagePreviews from './components/CarFormImagePreviews';
import {
  uploadImages,
  handleFilesChange,
  handleLocationSelected,
  getCarIdFromPath,
  formatCarData,
  handleServerError,
} from './components/form.utilities';
import { showImageError, showSuccessMessage } from '@/lib/toastHandler';

const CarForm: React.FC<CarFormProps> = ({ userId, car }) => {
  const { startUpload } = useUploadThing('media');
  const router = useRouter();
  const pathname = usePathname();
  const [dragDropFiles, setDragDropFiles] = useState<FileWithPreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const carIdFromPath = getCarIdFromPath(pathname);

  const { toast } = useToast();

  useEffect(() => {
    handleFilesChange(dragDropFiles, form, setImagePreviews);
  }, [dragDropFiles]);

  const form = useForm({
    resolver: zodResolver(CarValidation),
    defaultValues: {
      carTitle: car?.carTitle || '',
      carType: car?.carType || '',
      rentPrice: car?.rentPrice || '',
      capacity: car?.capacity || '',
      transmission: car?.transmission || '',
      location: car?.location || '',
      fuelCapacity: car?.fuelCapacity || '',
      shortDescription: car?.shortDescription || '',
      carImages: car?.carImages || [],
      path: car?.path || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof CarValidation>) => {
    setIsLoading(true);
    setError(null);

    const carData = formatCarData(values, userId);

    if (dragDropFiles.length === 0 && pathname === '/cars/new') {
      showImageError(
        toast,
        'Not so quick!',
        'Please add an image before submitting the form.'
      );
      setIsLoading(false);
      return;
    }

    try {
      const uploadedUrls = await uploadImages(
        imagePreviews,
        dragDropFiles,
        isBase64Image,
        startUpload
      );

      if (!uploadedUrls) {
        throw new Error('Failed to upload image.');
      }

      values.carImages = uploadedUrls;

      if (car?._id) {
        await editCar({
          ...carData,
          _id: car?._id,
          carImages: values.carImages,
        });
        setSuccess(true);
      } else {
        await createCar({ ...carData, carImages: values.carImages });
        setSuccess(true);
      }

      showSuccessMessage(toast, 'Success', 'Car registered successfully');

      if (pathname === '/cars/new') {
        router.back();
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error occurred during onSubmit:', error);
      handleServerError(error, toast);
    } finally {
      setSuccess(false);
      setIsLoading(false);
    }
  };

  const handleDelete = async (carId: string) => {
    try {
      setIsLoading(true);
      await deleteCar(carId);

      showSuccessMessage(toast, 'Success', 'Car deleted successfully');

      router.push('/profile');
    } catch (error) {
      console.error('Failed to delete car:', error);
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
        <FormState isLoading={isLoading} error={error} success={success} />

        <CarFormHeader pathname={pathname} car={car} />

        <div className="flex w-full flex-col gap-8 md:flex-row ">
          <InputController
            control={form.control}
            name="carTitle"
            label="Car Title"
            placeholder="Your title"
          />
          <SelectInput
            control={form.control}
            name="carType"
            label="Car Type"
            placeholder="Car Type"
            items={carTypes}
          />
        </div>
        <div className="flex w-full flex-col gap-8 md:flex-row">
          <InputController
            control={form.control}
            name="rentPrice"
            label="Rent Price"
            placeholder="Price"
            type="numerical"
          />

          <SelectInput
            control={form.control}
            name="capacity"
            label="Capacity"
            placeholder="Capacity in persons"
            items={capacities}
          />
        </div>

        <div className=" flex w-full flex-col gap-8 md:flex-row">
          <SelectInput
            control={form.control}
            name="transmission"
            label="Transmission"
            placeholder="Transmission Type"
            items={transmissionOptions}
          />

          <FormItem className="relative flex w-full flex-col justify-start">
            <FormLabel>Location</FormLabel>
            <FormControl className="w-full">
              <div className="absolute  top-[12px]  z-10 w-full">
                <Location
                  handleLocationSelected={(location: string) =>
                    handleLocationSelected(location, form)
                  }
                />
              </div>
            </FormControl>
          </FormItem>
        </div>
        <div className="flex w-full flex-col gap-8 md:flex-row">
          <SelectInput
            control={form.control}
            name="fuelCapacity"
            label="Fuel Capacity"
            placeholder="Fuel Capacity"
            items={fuelCapacityOptions}
          />
          <InputController
            control={form.control}
            name="shortDescription"
            label="Short Description"
            placeholder="Enter a short description"
          />
        </div>

        <CarFormImagePreviews imagePreviews={imagePreviews} />

        <DragDrop setDragDropFiles={setDragDropFiles} />

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
