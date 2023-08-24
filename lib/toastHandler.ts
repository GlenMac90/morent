import { ToastFunction } from './interfaces';

export const showValidationError = (
  toast: ToastFunction,
  title: string,
  errorFields: string[]
) => {
  const errorMessage = `Errors in: ${errorFields.join(', ')}`;
  toast({
    title,
    description: errorMessage,
  });
};

export const showImageError = (
  toast: ToastFunction,
  title: string,
  description: string
) => {
  toast({
    variant: 'destructive',
    title,
    description,
  });
};

export const showSuccessMessage = (
  toast: ToastFunction,
  title: string,
  description: string
) => {
  toast({
    variant: 'success',
    title,
    description,
  });
};

export const showError = (
  toast: ToastFunction,
  title: string,
  description: string
) => {
  toast({
    variant: 'destructive',
    title,
    description,
  });
};
