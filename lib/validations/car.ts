import * as z from 'zod';

export const CarValidation = z.object({
  carTitle: z.string().min(3, 'Title should be at least 3 characters long'),
  carType: z.string().min(3, 'Type should be at least 3 characters long'),
  rentPrice: z.string().optional(),
  capacity: z.number().optional(),
  transmission: z.string().optional(),
  location: z.string().optional(),
  fuelCapacity: z.number().optional(),
  shortDescription: z.string().optional(),
  carImageMain: z.string().optional(),
  path: z.string().optional(),
  datesBooked: z.array(z.string()).optional(),
});
