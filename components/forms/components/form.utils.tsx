import { UseFormReturn } from "react-hook-form";

import {
  FormData,
  FileWithPreview,
  UploadFunction,
  ReviewDocument,
} from "@/lib/interfaces";
import { CarValidation } from "@/lib/validations/car";
import { z } from "zod";
import { showError } from "@/lib/toastHandler";

export const handleLocationSelected = (
  location: string,
  form: UseFormReturn<FormData>
) => {
  form.setValue("location", location);
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

    return imgRes?.[0]?.url || null;
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
        form.setValue("carImageMain", allFileData[0] || "");
      }
    })
    .catch((error) => {
      console.error("Error reading one or more files:", error);
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
  carTitle: values.carTitle || "",
  carType: values.carType || "",
  rentPrice: values.rentPrice || "",
  capacity: values.capacity || "",
  transmission: values.transmission || "",
  location: values.location || "",
  fuelCapacity: values.fuelCapacity || "",
  shortDescription: values.shortDescription || "",
  carImageMain: values.carImageMain,
});

export const formatReviewData = (data: ReviewDocument) => ({
  userId: data.userId,
  carId: data.carId,
  rating: data.rating || "",
  title: data.title || "",
  content: data.content || "",
  datePosted: data.datePosted || "",
});

export const handleServerError = (
  error: any,
  toast: any,
  updating: boolean
) => {
  let errorMessage = updating
    ? "There was an issue while updating the car."
    : "There was an issue while creating the car.";

  if (error instanceof Error) {
    errorMessage += ` Detail: ${error.message}`;
    console.error({ error, message: error.message });
  } else {
    console.error({ error, message: "An unknown error occurred" });
  }

  showError(toast, "Error", errorMessage);
};
