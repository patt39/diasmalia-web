import { Select, Switch } from 'antd';
import { Control, Controller } from 'react-hook-form';
const { Option } = Select;

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  defaultValue?: boolean;
}

const SwitchInput = ({ control, label = '', name, defaultValue }: Props) => {
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
          defaultValue={defaultValue}
          render={({ field: { value, onChange } }) => (
            <>
              <div
                className="
                  relative 
                  inline-flex 
                  h-6 
                  w-11
                  shrink-0 
                  cursor-pointer 
                  rounded-full 
                  border 
                  border-gray-200 
                  bg-white 
                  transition-all 
                  duration-200  
                  ease-in-out 
                  focus:outline-none 
                  dark:border-gray-800 
                  dark:bg-[#121212]"
              >
                <label
                  htmlFor={name}
                  className="relative flex w-max cursor-pointer select-none items-center"
                >
                  {label ? (
                    <span className="mr-3 font-bold">{label}</span>
                  ) : null}

                  <Switch
                    // checkedChildren={<CheckOutlined />}
                    // unCheckedChildren={<CloseOutlined />}
                    checked={value}
                    onChange={onChange}
                    defaultValue={defaultValue}
                  />
                </label>
              </div>
            </>
          )}
        />
      </div>
    </>
  );
};

export { SwitchInput };
