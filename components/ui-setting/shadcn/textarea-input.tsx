import { Textarea } from '@/components/ui/textarea';
import { Control, Controller } from 'react-hook-form';
import { Label } from '../../ui/label';

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  errors: { [key: string]: any };
  placeholder?: string;
  autoComplete?: 'on' | 'off';
  required?: boolean;
  defaultValue?: string;
  disabled?: boolean;
}

const TextAreaInput: React.FC<Props> = ({
  control,
  label = '',
  name,
  errors,
  placeholder = '',
  defaultValue,
  autoComplete,
  required,
  disabled,
}) => {
  return (
    <>
      {label ? (
        <Label htmlFor={name} className="mb-2 block text-sm font-bold">
          {label}
        </Label>
      ) : null}

      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field } }) => (
          <>
            <Textarea
              className={`${errors?.[name]?.message ? 'border-red-500' : ''}`}
              id={name}
              maxLength={6000}
              style={{ height: 120 }}
              required={required}
              disabled={disabled}
              defaultValue={defaultValue}
              placeholder={placeholder}
              autoComplete={autoComplete}
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

export { TextAreaInput };
