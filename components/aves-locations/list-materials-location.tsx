/* eslint-disable @next/next/no-img-element */
import { CreateMaterialsAvesLocationAPI } from '@/api-site/material';
import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from '@/components/ui/table';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import Image from 'next/image';
import { useState } from 'react';

const ListLocationParameters = ({
  item,
  index,
  location,
}: {
  item: any;
  index: number;
  location: any;
}) => {
  const [isChangeStatus, setIsChangeStatus] = useState<boolean>(item?.status);

  // Create data
  const { mutateAsync: saveCreateMutation } = CreateMaterialsAvesLocationAPI();

  const createItem = async (item: any) => {
    try {
      setIsChangeStatus((i) => !i);
      await saveCreateMutation({
        materialId: item?.id,
        locationId: location?.id,
      });
      AlertSuccessNotification({
        text: 'Status changed',
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
              createItem(item);
            }}
          />
        </TableCell>
        <TableCell>
          <Image
            className="lg:w-[100px] lg:h-[60px] lg:my-auto my-auto rounded-sm"
            src={item?.image}
            alt=""
            width={200}
            height={200}
          />
        </TableCell>
        <TableCell>
          <div className="font-medium">{item?.name}</div>
        </TableCell>
      </TableRow>
    </>
  );
};
export { ListLocationParameters };
