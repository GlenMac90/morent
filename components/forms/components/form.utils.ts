import { UseFormReturn } from 'react-hook-form';

import { FormData } from '@/lib/interfaces';

export const handleLocationSelected = (
  location: string,
  form: UseFormReturn<FormData>
) => {
  form.setValue('location', location);
};
