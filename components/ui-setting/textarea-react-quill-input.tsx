import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { Control, Controller } from 'react-hook-form';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

interface QuillWrapperProps extends ReactQuillProps {
  forwardedRef?: React.Ref<ReactQuill>;
}

const DynamicReactQuill = dynamic<QuillWrapperProps>(
  async () => {
    const { default: RQ } = await import('react-quill');
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  { ssr: false },
);

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  className: string;
  errors: { [key: string]: any };
  placeholder?: string;
  defaultValue?: string;
}

export function TextareaReactQuillInput(props: Props) {
  const {
    control,
    label = '',
    name,
    errors,
    className,
    placeholder = '',
    defaultValue,
  } = props;

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
        rules={{
          required: 'Please enter post description',
        }}
        render={({ field: { ref, ...field } }) => (
          <>
            <DynamicReactQuill
              {...field}
              theme="snow"
              placeholder={placeholder}
              modules={{ toolbar: false }}
              className={cn(
                'px-full py-full w-full rounded-lg border-none focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-800',
                className,
              )}
            />
          </>
        )}
      />

      {/* <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
        description required
      </span> */}
      {errors?.[name] && (
        <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
          {errors?.[name]?.message}
        </span>
      )}
    </>
  );
}
