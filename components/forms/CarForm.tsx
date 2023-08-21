'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useForm, Controller, Control, FieldValues } from 'react-hook-form';
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

interface SelectItemProps {
  value: string | number;
  label: string;
}

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

type CarFormButtonsProps = {
  pathname: string;
  carIdFromPath?: string | null;
  isConfirmingDelete: boolean;
  setIsConfirmingDelete: (val: boolean) => void;
  handleDelete: (carId: string) => Promise<void>;
  isLoading: boolean;
};

type CarFormHeaderProps = {
  pathname: string;
  car?: {
    carImageMain?: string;
  };
  imagePreviews: string[];
};

const CarFormHeader: React.FC<CarFormHeaderProps> = ({
  pathname,
  car,
  imagePreviews,
}) => (
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

    <p className="mt-2.5 text-sm text-gray400">Please enter your car info</p>
    <div className="mt-4 flex space-x-4">
      {imagePreviews.map((preview, index) => (
        <div key={index} className="relative h-24 w-24">
          <Image src={preview} alt="Preview" layout="fill" objectFit="cover" />
        </div>
      ))}
    </div>
    <h3 className="mt-8 text-lg font-bold text-blue500">CAR INFO</h3>
  </div>
);

const CarFormButtons: React.FC<CarFormButtonsProps> = ({
  pathname,
  carIdFromPath,
  isConfirmingDelete,
  setIsConfirmingDelete,
  handleDelete,
  isLoading,
}) => {
  return (
    <>
      {pathname === `/cars/${carIdFromPath}` && carIdFromPath && (
        <>
          {isConfirmingDelete ? (
            <div className="flex space-x-4">
              <div className="flex w-full">
                <Button
                  className="flex self-end bg-red-500 p-5 text-white sm:w-auto"
                  onClick={async () => {
                    setIsConfirmingDelete(false);
                    await handleDelete(carIdFromPath);
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
            className="flex w-full bg-blue500 p-5 text-white md:w-auto"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Car'}
          </Button>
        </>
      )}
      {pathname === `/cars/new` && (
        <Button
          className="flex w-full bg-blue500 p-5 text-white md:w-auto"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register Car'}
        </Button>
      )}
    </>
  );
};

interface SelectControllerProps {
  control: Control<FormData>;
  name: string;
  label: string;
  placeholder: string;
  items: SelectItemProps[];
  isNumeric?: boolean;
}

interface InputControllerProps {
  control: Control<FormData>;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}

const carTypes = [
  { value: 'sport', label: 'Sport' },
  { value: 'suv', label: 'SUV' },
  { value: 'mpv', label: 'MPV' },
  { value: 'sedan', label: 'Sedan' },
  { value: 'coupe', label: 'Coupe' },
  { value: 'hatchback', label: 'Hatchback' },
];

const capacities = [
  { value: '2', label: '2 Person' },
  { value: '4', label: '4 Person' },
  { value: '6', label: '6 Person' },
  { value: '8', label: '8 or more' },
];

const transmissionOptions = [
  { value: 'manual', label: 'Manual' },
  { value: 'automatic', label: 'Automatic' },
  { value: 'semi-automatic', label: 'Semi-automatic' },
  { value: 'cvt', label: 'CVT' },
];

const fuelCapacityOptions = [
  { value: '40', label: '40 litres' },
  { value: '50', label: '50 litres' },
  { value: '60', label: '60 litres' },
  { value: '80', label: '80 litres or more' },
];

const SelectController: React.FC<SelectControllerProps> = ({
  control,
  name,
  label,
  placeholder,
  items,
  isNumeric = false,
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <FormItem className="flex w-full flex-col justify-start">
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Select
            value={isNumeric ? String(field.value) : field.value}
            onValueChange={(value) =>
              field.onChange(isNumeric ? Number(value) : value)
            }
          >
            <SelectTrigger className="h-11 bg-white200 dark:bg-gray800 md:h-14">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
        {fieldState.invalid && (
          <span className="text-red-500">{`${label} is required!`}</span>
        )}
      </FormItem>
    )}
  />
);

const InputController: React.FC<InputControllerProps> = ({
  control,
  name,
  label,
  placeholder,
  type = 'text',
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <FormItem className="flex w-full flex-col justify-start">
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            className="h-11 bg-white200 dark:bg-gray800 md:h-14"
            type={type}
            {...field}
            placeholder={placeholder}
          />
        </FormControl>
        {fieldState.invalid && (
          <span className="text-red-500">{`${label} is required!`}</span>
        )}
      </FormItem>
    )}
  />
);

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

  const form = useForm<FormData>({
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

          <SelectController
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
          />
          <SelectController
            control={form.control}
            name="capacity"
            label="Capacity"
            placeholder="Capacity in persons"
            items={capacities}
            isNumeric={true}
          />
        </div>

        <div className="flex w-full flex-col gap-8 md:flex-row">
          <SelectController
            control={form.control}
            name="transmission"
            label="Transmission"
            placeholder="Transmission Type"
            items={transmissionOptions}
          />

          <InputController
            control={form.control}
            name="location"
            label="Location"
            placeholder="Select your city"
          />
        </div>

        <div className="flex w-full flex-col gap-8 md:flex-row">
          <SelectController
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

        <DragDrop handleFilesChange={handleFilesChange} />

        <div className="flex w-full justify-end space-x-4 self-end">
          <CarFormButtons
            pathname={pathname}
            carIdFromPath={carIdFromPath}
            isConfirmingDelete={isConfirmingDelete}
            setIsConfirmingDelete={setIsConfirmingDelete}
            handleDelete={handleDelete}
            isLoading={isLoading}
          />
        </div>
      </form>
    </Form>
  );
};

export default CarForm;
