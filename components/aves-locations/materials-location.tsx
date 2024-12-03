/* eslint-disable @next/next/no-img-element */
import { ChangeMaterialStatusAPI } from '@/api-site/material';
import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from '@/components/ui/table';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import Image from 'next/image';
import { useState } from 'react';

const MaterialsLocationParameters = ({
  item,
  index,
}: {
  item: any;
  index: number;
}) => {
  const [isChangeStatus, setIsChangeStatus] = useState<boolean>(item?.status);

  const { mutateAsync: saveMutation } = ChangeMaterialStatusAPI();

  const changeItem = async (item: any) => {
    try {
      setIsChangeStatus((i) => !i);
      await saveMutation({ assignMaterialId: item?.id });
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
    <>
      <TableRow key={index}>
        <TableCell>
          <Checkbox
            checked={isChangeStatus}
            onCheckedChange={() => {
              changeItem(item);
            }}
          />
        </TableCell>
        <TableCell>
          <Image
            className="lg:w-[100px] lg:h-[60px] lg:my-auto my-auto rounded-sm"
            src={item?.material?.image}
            alt=""
            width={200}
            height={200}
          />
        </TableCell>
        <TableCell>
          <div className="font-medium">{item?.material?.name}</div>
        </TableCell>
      </TableRow>
    </>
  );
};
export { MaterialsLocationParameters };
