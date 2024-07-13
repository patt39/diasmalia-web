import { Switch } from '@/components/ui/switch';
import { Control, Controller } from 'react-hook-form';

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
}

const SwitchInput: React.FC<Props> = ({ control, label = '', name }) => {
  return (
    <>
      <div className="mt-4 flex items-center justify-between pl-14 sm:mt-0 sm:justify-end sm:space-x-6 sm:pl-0">
        <button
          type="button"
          title=""
          className="text-sm font-medium transition-all duration-200"
        >
          {' '}
        </button>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <>
              <label
                htmlFor={name}
                className="relative flex w-max cursor-pointer select-none items-center"
              >
                {label ? <span className="mr-3 font-bold">{label}</span> : null}

                <Switch
                  checked={value}
                  onChange={onChange}
                  onCheckedChange={onChange}
                />
              </label>
            </>
          )}
        />
      </div>
    </>
  );
};

export { SwitchInput };
