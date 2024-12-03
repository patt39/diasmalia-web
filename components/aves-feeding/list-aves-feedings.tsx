/* eslint-disable @next/next/no-img-element */
import { DeleteOneFeedingAPI } from '@/api-site/feedings';
import { useInputState } from '@/components/hooks';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formatDateDDMMYY,
} from '@/utils';
import { firstLetterToUpperCase } from '@/utils/utils';
import { MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { TableCell, TableRow } from '../ui/table';
import { CreateOrUpdateAvesFeedings } from './create-or-update-aves-feedings';

const ListAvesFeedings = ({ item, index }: { item: any; index: number }) => {
  const { t, setIsOpen, isOpen } = useInputState();
  const [isEdit, setIsEdit] = useState(false);

  const { isPending: loading, mutateAsync: deleteMutation } =
    DeleteOneFeedingAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ feedingId: item?.id });
      AlertSuccessNotification({
        text: 'Death deleted successfully',
      });
      setIsOpen(false);
    } catch (error: any) {
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <TableRow key={index} className="dark:border-gray-800">
        <TableCell className="font-medium">{item?.animal?.code}</TableCell>
        <TableCell className="font-medium">
          <p className="font-medium text-purple-600">
            {firstLetterToUpperCase(item?.feedStock?.feedCategory)}
          </p>
        </TableCell>
        <TableCell className="font-medium">{item?.quantity}kg</TableCell>
        <TableCell>
          {item?.animal?.productionPhase === 'GROWTH' ? (
            <p className="font-medium">
              {t.formatMessage({ id: 'PRODUCTIONPHASE.GROWTH' })}
            </p>
          ) : (
            <p className="font-medium">
              {t.formatMessage({ id: 'PRODUCTIONPHASE.LAYING' })}
            </p>
          )}
        </TableCell>
        <TableCell>{formatDateDDMMYY(item?.createdAt as Date)}</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">
                  {t.formatMessage({ id: 'TABANIMAL.MENU' })}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:border-gray-800">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setIsEdit(true)}>
                <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                <span className="ml-2 cursor-pointer hover:text-indigo-600">
                  {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                </span>
              </DropdownMenuItem>
              {item?.animal?.quantity === 0 ? (
                <DropdownMenuItem onClick={() => setIsOpen(true)}>
                  <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                  <span className="ml-2 cursor-pointer hover:text-red-600">
                    {t.formatMessage({ id: 'TABANIMAL.DELETE' })}
                  </span>
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      {isOpen ? (
        <ActionModalDialog
          loading={loading}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClick={() => deleteItem(item)}
        />
      ) : null}
      {isEdit ? (
        <CreateOrUpdateAvesFeedings
          feeding={item}
          showModal={isEdit}
          setShowModal={setIsEdit}
        />
      ) : null}
    </>
  );
};
export { ListAvesFeedings };
