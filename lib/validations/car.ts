import * as z from 'zod';

export const CarValidation = z.object({
  carTitle: z.any(),
  carType: z.any(),
  rentPrice: z.any(),
  capacity: z.any(),
  transmission: z.any(),
  location: z.any(),
  fuelCapacity: z.any(),
  shortDescription: z.any(),
  carImageMain: z.any(),
});
