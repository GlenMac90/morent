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
import { Props, FileWithPreview } from '@/lib/interfaces';

import {
  carTypes,
  capacities,
  transmissionOptions,
  fuelCapacityOptions,
} from '@/constants';

import Location from '../Location';
import SelectInput from './components/SelectInput';
import InputController from './components/InputController';
import CarFormButtons from './components/CarFormButtons';
import CarFormHeader from './components/CarFormHeader';
import FormState from './components/FormState';

import {
  uploadImages,
  handleFilesChange,
  handleLocationSelected,
} from './components/form.utils';

import {
  showValidationError,
  showImageError,
  showSuccessMessage,
  showError,
} from '@/lib/toastHandler';

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

  useEffect(() => {
    handleFilesChange(dragDropFiles, form, setImagePreviews);
  }, [dragDropFiles]);

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

  const onSubmit = async (values: z.infer<typeof CarValidation>) => {
    setIsLoading(true);
    setError(null);
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
    if (Object.keys(form.formState.errors).length > 0) {
      const errorFields = Object.keys(form.formState.errors);
      showValidationError(toast, 'Validation Error', errorFields);
      setIsLoading(false);
      return;
    }

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

      if (uploadedUrls.length > 0) {
        values.carImageMain = uploadedUrls[0];
      }

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

      showSuccessMessage(toast, 'Success', 'Car registered successfully');

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

      showError(toast, 'Error', errorMessage);
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

      router.push('/');
    } catch (error) {
      console.error('Failed to delete car:', error);
      showError(toast, 'Error', 'Failed to delete car. Please try again.');
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

        <CarFormHeader
          pathname={pathname}
          car={car || undefined}
          imagePreviews={imagePreviews}
        />

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
            isNumeric={false}
          />
        </div>
        <div className="flex w-full flex-col gap-8 md:flex-row">
          <InputController
            control={form.control}
            name="rentPrice"
            label="Rent Price"
            placeholder="Price"
          />

          <SelectInput
            control={form.control}
            name="capacity"
            label="Capacity"
            placeholder="Capacity in persons"
            items={capacities}
            isNumeric={true}
          />
        </div>

        <div className="flex w-full flex-col gap-8 md:flex-row">
          <SelectInput
            control={form.control}
            name="transmission"
            label="Transmission"
            placeholder="Transmission Type"
            items={transmissionOptions}
            isNumeric={false}
          />

          <FormItem className=" flex w-full flex-col justify-start">
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Location
                handleLocationSelected={(location: string) =>
                  handleLocationSelected(location, form)
                }
              />
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
            isNumeric={true}
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
