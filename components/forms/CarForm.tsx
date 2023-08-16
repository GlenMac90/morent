'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import '@uploadthing/react/styles.css';

import { CarValidation } from '@/lib/validations/car';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing';
import { createCar } from '@/lib/actions/car.actions';
import DragDrop from './DragDrop';

interface Props {
  car?: {
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
  userId: string;
}

interface FileWithPreview extends File {
  preview?: string;
}

const CarForm: React.FC<Props> = ({ userId }) => {
  const { startUpload } = useUploadThing('media');
  const router = useRouter();
  const pathname = usePathname();
  const [dragDropFiles, setDragDropFiles] = useState<FileWithPreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(CarValidation),
    defaultValues: {
      carTitle: '',
      carType: '',
      rentPrice: '',
      capacity: 1,
      transmission: '',
      location: '',
      fuelCapacity: 0,
      shortDescription: '',
      carImageMain: '',
      path: '',
    },
  });

  const uploadImage = async (
    blob: string,
    files: FileWithPreview[]
  ): Promise<string | null> => {
    const isImage = isBase64Image(blob);
    if (!isImage) return null;

    const imgRes = await startUpload(files);
    return imgRes?.[0]?.fileUrl || null;
  };

  const onSubmit = async (values: z.infer<typeof CarValidation>) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

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

    if (dragDropFiles.length === 0) {
      toast({
        title: 'Error',
        description: 'Please add an image before submitting the form.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const imageUrl = await uploadImage(
        values.carImageMain as string,
        dragDropFiles
      );
      if (!imageUrl) {
        throw new Error('Failed to upload image.');
      }

      values.carImageMain = imageUrl;

      await createCar({
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
      });

      if (pathname === '/car/edit') {
        router.back();
      } else {
        router.push('/');
      }

      setSuccess(true);
    } catch (error) {
      let errorMessage = 'There was an issue while creating the car.';

      if (error instanceof Error) {
        errorMessage += ` Detail: ${error.message}`;
        console.error({ error, message: error.message });
      } else {
        console.error({ error, message: 'An unknown error occurred' });
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilesChange = (files: FileWithPreview[]) => {
    setDragDropFiles(files);

    if (files.length > 0) {
      const file = files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const result = fileReader.result as string;
        form.setValue('carImageMain', result || '');
      };
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-4xl flex-col items-center gap-5 bg-white0 px-6 py-12"
      >
        {isLoading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {success && (
          <div className="text-green-500">Car registered successfully!</div>
        )}

        <div className="flex flex-col self-start">
          <h1 className="text-xl font-semibold ">Add a Car for Rent</h1>
          <p className="mt-2.5  text-sm text-gray400">
            Please enter your car info
          </p>
          <h3 className="mt-8 text-lg font-bold text-blue500">CAR INFO</h3>
        </div>
        <div className="flex w-full flex-col gap-8 md:flex-row ">
          <Controller
            control={form.control}
            name="carTitle"
            render={({ field, fieldState }) => (
              <FormItem className="flex w-full flex-col justify-start">
                <FormLabel>Car Title</FormLabel>
                <FormControl>
                  <Input
                    className="h-11 bg-white200 md:h-14 "
                    type="text"
                    {...field}
                    placeholder="Your title"
                  />
                </FormControl>
                {fieldState.invalid && <span>Car title is required!</span>}
              </FormItem>
            )}
          />

          <Controller
            control={form.control}
            name="carType"
            render={({ field, fieldState }) => (
              <FormItem className="flex w-full flex-col justify-start">
                <FormLabel>Car Type</FormLabel>
                <FormControl>
                  <Input
                    className="h-11 bg-white200 md:h-14 "
                    type="text"
                    {...field}
                    placeholder="Car Type"
                  />
                </FormControl>
                {fieldState.invalid && <span>Car type is required!</span>}
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full flex-col gap-8 md:flex-row">
          <Controller
            control={form.control}
            name="rentPrice"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col justify-start">
                <FormLabel>Rent Price</FormLabel>
                <FormControl>
                  <Input
                    className="h-11 bg-white200 md:h-14 "
                    type="text"
                    {...field}
                    placeholder="Price"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Controller
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col justify-start">
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input
                    className="h-11 bg-white200 md:h-14 "
                    type="number"
                    {...field}
                    placeholder="Capacity in persons"
                  />
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
                  <Input
                    className="h-11 bg-white200 md:h-14 "
                    type="text"
                    {...field}
                    placeholder="Your title"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Controller
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col justify-start">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    className="h-11 bg-white200 md:h-14 "
                    type="text"
                    {...field}
                    placeholder="Select your city"
                  />
                </FormControl>
              </FormItem>
            )}
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
                  <Input
                    className="h-11 bg-white200 md:h-14 "
                    type="number"
                    {...field}
                    placeholder="Fuel Capacity in Litres"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Controller
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col justify-start">
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Input
                    className="h-11 bg-white200 md:h-14 "
                    {...field}
                    placeholder="Enter a short description"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <DragDrop handleFilesChange={handleFilesChange} />

        <Button
          className="flex w-full self-end bg-blue500 p-5 text-white md:w-auto"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register Car'}
        </Button>
      </form>
    </Form>
  );
};

export default CarForm;
