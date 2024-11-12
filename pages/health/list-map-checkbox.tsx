import { ChangeTreatmentNameStatusAPI } from '@/api-site/health';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { useState } from 'react';
import { firstLetterToUpperCase } from '../../utils/utils';

const ListMapcheckBox = ({ item }: { item: any }) => {
  const [isChangeStatus, setIsChangeStatus] = useState<boolean>(item?.status);

  const { mutateAsync: saveMutation } = ChangeTreatmentNameStatusAPI();

  const changeItem = async (item: any) => {
    try {
      setIsChangeStatus((i) => !i);
      await saveMutation({ healthId: item?.id });
      AlertSuccessNotification({
        text: 'Status changed successfully',
      });
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <div
      className="flex space-x-2 rounded-md border dark:border-gray-600 p-4 shadow"
      key={item?.id}
    >
      <Checkbox
        checked={isChangeStatus}
        onCheckedChange={() => {
          changeItem(item);
        }}
      />
      <div className="space-y-1 leading-none">
        <Label>{firstLetterToUpperCase(item?.name)}</Label>
      </div>
    </div>
  );
};
export { ListMapcheckBox };
