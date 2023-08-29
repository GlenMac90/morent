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
  const handleNumericalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, '');
    const intValue = parseInt(value, 10) || 0;
    const floatValue = intValue / 100;
    e.target.value = floatValue.toFixed(2);
  };
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
                className="h-11 bg-white200 dark:bg-gray800 md:h-14"
                {...field}
                placeholder={type === 'numerical' ? '00.00' : placeholder}
                type={type}
                onChange={(e) => {
                  if (type === 'numerical') {
                    handleNumericalChange(e);
                  }
                  field.onChange(e);
                }}
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
