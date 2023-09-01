import { UseFormReturn } from 'react-hook-form';

import { FormData, FileWithPreview, UploadFunction } from '@/lib/interfaces';
import { CarValidation } from '@/lib/validations/car';
import { z } from 'zod';
import { showError } from '@/lib/toastHandler';

export const handleLocationSelected = (
  location: string,
  form: UseFormReturn<FormData>
) => {
  form.setValue('location', location);
};

export const uploadImages = async (
  imagePreviews: string[],
  files: FileWithPreview[],
  isBase64Image: (data: string) => boolean,
  startUpload: UploadFunction
): Promise<string[]> => {
  const uploadPromises = imagePreviews.map(async (blob, index) => {
    const isImage = isBase64Image(blob);
    if (!isImage) return [];

    const imgRes = await startUpload([files[index]]);

    return (
      imgRes?.map((imgRes) => imgRes?.url || '').filter((url) => url) || []
    );
  });

  const allUploadedUrls: string[][] = await Promise.all(uploadPromises);

  const flatUploadedUrls: string[] = ([] as string[]).concat(
    ...allUploadedUrls
  );

  return flatUploadedUrls;
};

export const handleFilesChange = (
  dragDropFiles: FileWithPreview[],
  form: UseFormReturn<FormData>,
  setImagePreviews: (images: string[]) => void
) => {
  const fileReadPromises = dragDropFiles.map((file) => {
    return new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const result = fileReader.result as string;
        resolve(result);
      };
      fileReader.onerror = () => {
        console.error(`Error reading file:`, fileReader.error);
        reject(fileReader.error);
      };
    });
  });

  Promise.all(fileReadPromises)
    .then((allFileData) => {
      setImagePreviews(allFileData);
      if (allFileData.length > 0) {
        form.setValue('carImages', allFileData);
      }
    })
    .catch((error) => {
      console.error('Error reading one or more files:', error);
    });
};

export const getCarIdFromPath = (pathname: string) => {
  const carIdPattern = /^\/cars\/(?!new$)([a-zA-Z0-9]+)$/;
  const match = pathname.match(carIdPattern);
  return match ? match[1] : null;
};

export const formatCarData = (
  values: z.infer<typeof CarValidation>,
  userId: string | undefined
) => ({
  userId,
  carTitle: values.carTitle || '',
  carType: values.carType || '',
  rentPrice: values.rentPrice || '',
  capacity: values.capacity || '',
  transmission: values.transmission || '',
  location: values.location || '',
  fuelCapacity: values.fuelCapacity || '',
  shortDescription: values.shortDescription || '',
  carImages: values.carImages || [],
});

export const handleServerError = (error: any, toast: any) => {
  if (error instanceof Error) {
    console.error({ error, message: error.message });
    showError(toast, 'Error', error.message);
  } else {
    console.error({ error, message: 'An unknown error occurred' });
    showError(toast, 'Error', 'An unknown error occurred');
  }
};
