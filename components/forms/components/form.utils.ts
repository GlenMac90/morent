import { UseFormReturn } from 'react-hook-form';

import { FormData, FileWithPreview, UploadFunction } from '@/lib/interfaces';
import { CarValidation } from '@/lib/validations/car';
import { z } from 'zod';

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
    if (!isImage) return null;

    const imgRes = await startUpload([files[index]]);
    return imgRes?.[0]?.fileUrl || null;
  });

  const uploadedUrls: (string | null)[] = await Promise.all(uploadPromises);
  return uploadedUrls.filter((url) => url !== null) as string[];
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
  capacity: values.capacity || 1,
  transmission: values.transmission || '',
  location: values.location || '',
  fuelCapacity: values.fuelCapacity || 1,
  shortDescription: values.shortDescription || '',
  carImageMain: values.carImageMain,
});
