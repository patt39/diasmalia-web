import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Control, Controller } from 'react-hook-form';

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  min?: number;
  max?: number;
  type: 'text' | 'email' | 'password' | 'url' | 'number' | 'tel';
  errors: { [key: string]: any };
  placeholder?: string;
  autoComplete?: 'on' | 'off';
  required?: boolean;
  defaultValue?: string;
  pattern?: string;
  disabled?: boolean;
  labelHelp?: React.ReactNode;
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
    | undefined;
}

const TextInput = ({
  control,
  max,
  min,
  label = '',
  type,
  name,
  errors,
  pattern,
  placeholder = '',
  defaultValue,
  autoComplete,
  required,
  labelHelp,
  disabled,
  inputMode,
}: Props) => {
  return (
    <>
      <div className="flex items-center justify-between">
        {label ? (
          <Label htmlFor={name} className="mb-2 block text-sm font-bold">
            {label}
          </Label>
        ) : null}
        {labelHelp}
      </div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { ref, ...field } }) => (
          <>
            <Input
              className={`${errors?.[name]?.message ? 'border-red-500' : ''}`}
              type={type}
              id={name}
              pattern={pattern}
              required={required}
              placeholder={placeholder}
              autoComplete={autoComplete}
              min={min}
              max={max}
              inputMode={inputMode}
              disabled={disabled}
              {...field}
            />
          </>
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

export { TextInput };
