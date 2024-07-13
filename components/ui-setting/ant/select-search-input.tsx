import { Label } from '@/components/ui/label';
import { Select, Space } from 'antd';
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
  valueType: 'key' | 'text';
  icon?: React.ReactNode;
  allowClear?: boolean;
  disabled?: boolean;
}

const SelectSearchInput: React.FC<Props> = ({
  control,
  dataItem,
  label = '',
  name,
  errors,
  placeholder = '',
  valueType,
  icon,
  allowClear,
  disabled,
  firstOptionName = '',
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
          <Select
            allowClear={allowClear}
            showSearch
            loading={false}
            size="large"
            style={{ width: '100%' }}
            id={name}
            placeholder={placeholder}
            status={errors?.[name]?.message ? 'error' : ''}
            filterOption={(input, option) =>
              (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
            }
            {...field}
            disabled={disabled}
            //className={`dark:border-gray-800 dark:bg-[#121212] dark:text-white  dark:placeholder:text-gray-500`}
          >
            <>
              {dataItem?.length > 0
                ? dataItem?.map((item: any, index: number) => (
                    <Option
                      key={index}
                      value={valueType === 'key' ? item?.id : item?.name}
                      name={item?.name}
                    >
                      <Space>
                        {icon}

                        {item?.name}
                      </Space>
                    </Option>
                  ))
                : null}
            </>
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

export { SelectSearchInput };
