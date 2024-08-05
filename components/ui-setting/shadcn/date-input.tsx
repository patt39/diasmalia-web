'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Control, Controller } from 'react-hook-form';

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  errors: { [key: string]: any };
  placeholder?: string;
  required?: boolean;
  disabled?: boolean | ((date: Date) => boolean);
}

const DateInput = ({
  control,
  label = '',
  name,
  errors,
  placeholder = 'Pick a date',
  disabled,
  required,
}: Props) => {
  return (
    <>
      {label ? (
        <label className="mb-2 block text-sm font-bold" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field } }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(`
                  w-full pl-3 text-left font-normal ${errors?.[name]?.message ? 'border-red-500' : ''},
                  !field.value && 'text-muted-foreground',
                `)}
              >
                {field.value ? (
                  format(field.value, 'P')
                ) : (
                  <span className="font-semibold">{placeholder}</span>
                )}
                <CalendarIcon className="ml-auto size-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 dark:border-gray-800"
              align="start"
            >
              <Calendar
                disabled={disabled}
                selected={field.value}
                onSelect={field.onChange}
                mode="single"
                initialFocus
                required={required}
              />
            </PopoverContent>
          </Popover>
        )}
      />
      {errors?.[name] && (
        <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
          {errors?.[name]?.message}
        </span>
      )}
    </>
  );
};

export { DateInput };
