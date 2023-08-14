'use client';

import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CarValidation } from '@/lib/validations/car';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import * as z from 'zod';
import { isBase64Image } from '@/lib/utils';

import '@uploadthing/react/styles.css';

import { useUploadThing } from '@/lib/uploadthing';
import { createCar } from '@/lib/actions/car.actions';

import { usePathname, useRouter } from 'next/navigation';
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
  };
  userId: string;
}

const CarForm: React.FC<Props> = ({ userId }) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing('media');
  const router = useRouter();
  const pathname = usePathname();

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
    },
  });

  const onSubmit = async (values: z.infer<typeof CarValidation>) => {
    const blob = values.carImageMain;
    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgRes = await startUpload(files);
      if (imgRes && imgRes[0].fileUrl) {
        values.carImageMain = imgRes[0].fileUrl;
      }
    }
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
      carImageMain: values.carImageMain || '',
      path: pathname,
    });

    if (pathname === '/car/edit') {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        fieldChange((fileReader.result as string) || '');
      };
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-5 bg-white0 px-4 py-5 sm:px-[3.75rem] sm:py-[2.25rem] md:px-[3.75rem] md:py-[2.25rem]"
      >
        <h1>Add a Car for Rent</h1>
        <p>Please enter your car info</p>
        <h3 className="text-blue500">CAR INFO</h3>
        <FormField
          control={form.control}
          name="carTitle"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start ">
              <FormLabel>Car Title</FormLabel>
              <FormControl>
                <Input className="bg-white200" type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="carType"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start">
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input className="bg-white200" type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rentPrice"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start">
              <FormLabel>Rent Price</FormLabel>
              <FormControl>
                <Input className="bg-white200" type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start">
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input className="bg-white200" type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transmission"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start">
              <FormLabel>Transmission</FormLabel>
              <FormControl>
                <Input className="bg-white200" type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input className="bg-white200" type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fuelCapacity"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start">
              <FormLabel>Fuel Capacity</FormLabel>
              <FormControl>
                <Input className="bg-white200" type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start">
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea className="bg-white200" rows={5} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="carImageMain"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start">
              <FormLabel>Car Image</FormLabel>
              <FormControl>
                <Input
                  className="bg-white200"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <DragDrop />

        <Button className="bg-blue500 text-white" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CarForm;
