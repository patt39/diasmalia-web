import { Select } from 'antd';
import { Control, Controller } from 'react-hook-form';
const { Option } = Select;

interface Props {
  control: Control<any>;
  dataItem: any;
  label?: string;
  name: string;
  errors: { [key: string]: any };
  placeholder?: string;
  firstOptionName: string;
  optionType: 'currency' | 'other';
}

const SelectInput: React.FC<Props> = ({
  control,
  dataItem,
  label = '',
  name,
  errors,
  placeholder = '',
  optionType,
  firstOptionName = '',
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
        render={({ field: { ref, ...field } }) => (
          <Select
            size="large"
            style={{ width: '100%' }}
            id={name}
            placeholder={placeholder}
            status={errors?.[name]?.message ? 'error' : ''}
            {...field}
          >
            {dataItem?.length > 0 ? (
              dataItem?.map((item: any, index: number) => (
                <Option
                  value={optionType === 'currency' ? item?.code : item?.id}
                  key={index}
                >
                  {optionType === 'currency'
                    ? `${item?.code} - ${item?.name}`
                    : item?.name}
                </Option>
              ))
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p>Data Not Found</p>
              </div>
            )}
          </Select>
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

export { SelectInput };
