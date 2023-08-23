import { UseFormReturn } from 'react-hook-form';

import { FormData, FileWithPreview, UploadFunction } from '@/lib/interfaces';

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
