import { InputNumber } from 'antd';
import { Control, Controller } from 'react-hook-form';

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  min?: number;
  max?: number;
  type: 'number';
  errors: { [key: string]: any };
  placeholder?: string;
  autoComplete?: 'on' | 'off';
  required?: boolean;
  pattern?: string;
  defaultValue?: string | number;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
}

const NumberInput: React.FC<Props> = ({
  control,
  prefix,
  suffix,
  max,
  min = 1,
  label = '',
  type,
  name,
  pattern,
  errors,
  required,
  placeholder = '',
  autoComplete,
  defaultValue,
}) => {
  return (
    <>
      {label ? (
        <label
          className="mb-2 block text-sm font-bold dark:text-white"
          htmlFor={name}
        >
          {label}
        </label>
      ) : null}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { ref, ...field } }) => (
          <InputNumber
            className={`dark:border-gray-800 dark:bg-[#121212] dark:text-white dark:placeholder:text-gray-500 ${
              errors?.[name]?.message ? 'border-red-500' : ''
            }`}
            size="large"
            id={name}
            required={required}
            suffix={suffix}
            style={{ width: '100%' }}
            type={type}
            pattern={pattern}
            placeholder={placeholder}
            autoComplete={autoComplete}
            status={errors?.[name]?.message ? 'error' : ''}
            prefix={<strong>{prefix}</strong>}
            min={min}
            max={max}
            {...field}
          />
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

export { NumberInput };
