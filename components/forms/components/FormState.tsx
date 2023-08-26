'use client';

import { FeedbackMessageProps } from '@/lib/interfaces';

const FormState: React.FC<FeedbackMessageProps> = ({
  error,
  success,
  isLoading,
}) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (success) {
    return <div className="text-green-500">Car registered successfully!</div>;
  }

  return null;
};

export default FormState;
