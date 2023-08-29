import { Controller } from 'react-hook-form';

import { FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputControllerProps } from '@/lib/interfaces';

const InputController: React.FC<InputControllerProps> = ({
  control,
  name,
  label,
  placeholder,
  type,
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <FormItem className="flex w-full flex-col justify-start">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                className="h-11 bg-white200 dark:bg-gray800 md:h-14 "
                {...field}
                placeholder={placeholder}
                type={type}
              />
            </FormControl>
            {fieldState.invalid && (
              <span className="text-red-500">{`${label} is required!`}</span>
            )}
          </FormItem>
        )}
      />
    </>
  );
};

export default InputController;
