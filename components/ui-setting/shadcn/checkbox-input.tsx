import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Control, Controller } from 'react-hook-form';

interface Props {
  control: Control<any>;
  label?: string;
  name?: string;
  item: any;
}

const CheckBoxInput: React.FC<Props> = ({ control, label = '', item }) => {
  return (
    <>
      <div className="mt-4 flex items-center justify-between pl-14 sm:mt-0 sm:justify-end sm:space-x-6 sm:pl-0">
        <Controller
          key={item?.name}
          control={control}
          name="medecines"
          render={({ field: { ...field } }) => (
            <div
              className="flex space-x-2 rounded-md border dark:border-gray-600 p-4 shadow"
              key={item?.name}
            >
              <Checkbox
                //checked={field?.value?.includes(item?.name)}
                // checked={field?.value?.find(
                //   (i: any) => !i.status,
                // )}
                // onCheckedChange={(checked) => {
                //   console.log('field?.value ==>', field?.value);
                //   return checked
                //     ? field.onChange([
                //         ...(field.value || []),
                //         { id: item?.id, status: item?.status },
                //       ])
                //     : field?.onChange(
                //         field?.value?.filter(
                //           (value: any) => value !== item?.name,
                //         ),
                //       );
                // }}
                //checked={field.value }
                onCheckedChange={(checked) => {
                  console.log(checked);
                  console.log('field?.value ==>', field?.value);
                  console.log(
                    field?.value?.push({
                      id: item?.id,
                      name: item?.name,
                      status: item?.status,
                    }),
                  );
                  return checked
                    ? field.onChange([
                        ...(field.value || []),
                        {
                          id: item?.id,
                          name: item?.name,
                          status: item?.status,
                        },
                      ])
                    : null;
                }}
              />
              <div className="space-y-1 leading-none">
                <Label>{item?.name}</Label>
              </div>
            </div>
          )}
        />
      </div>
    </>
  );
};

export { CheckBoxInput };
