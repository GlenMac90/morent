import { Controller } from 'react-hook-form';

import { FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { SelectInputProps } from '@/lib/interfaces';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const SelectInput: React.FC<SelectInputProps> = ({
  control,
  name,
  label,
  placeholder,
  items,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem className="flex w-full flex-col justify-start">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Select
                value={String(field.value)}
                onValueChange={(value) => {
                  field.onChange(value);
                }}
              >
                <SelectTrigger className="h-11 bg-white200 dark:bg-gray800 md:h-14">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {items.map((item) => {
                    return (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormControl>
            {fieldState.invalid && (
              <span className="text-red-500">Car type is required!</span>
            )}
          </FormItem>
        );
      }}
    />
  );
};

export default SelectInput;
