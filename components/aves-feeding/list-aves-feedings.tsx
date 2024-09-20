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
import { MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { TableCell, TableRow } from '../ui/table';
import { CreateOrUpdateAvesFeedings } from './create-or-update-aves-feedings';

const ListAvesFeedings = ({ item, index }: { item: any; index: number }) => {
  const { t, setLoading, setIsOpen, isOpen, loading } = useInputState();
  const [isEdit, setIsEdit] = useState(false);

  const { mutateAsync: deleteMutation } = DeleteOneFeedingAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await deleteMutation({ feedingId: item?.id });
      AlertSuccessNotification({
        text: 'Death deleted successfully',
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setLoading(false);
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
          {item?.feedType === 'FIBERS' ? (
            <p className="font-medium">{t.formatMessage({ id: 'FIBERS' })}</p>
          ) : item?.feedType === 'CONCENTRATES' ? (
            <p className="font-medium">
              {t.formatMessage({ id: 'CONCENTRATES' })}
            </p>
          ) : item?.feedType === 'BYPRODUCTS' ? (
            <p className="font-medium">
              {t.formatMessage({ id: 'BYPRODUCTS' })}
            </p>
          ) : item?.feedType === 'COMPLETEFEED' ? (
            <p className="font-medium">
              {t.formatMessage({ id: 'COMPLETEFEED' })}
            </p>
          ) : item?.feedType === 'MINARALSALTS' ? (
            <p className="font-medium">
              {t.formatMessage({ id: 'MINARALSALTS' })}
            </p>
          ) : item?.feedType === 'ENERGYSUPPLIMENTS' ? (
            <p className="font-medium">
              {t.formatMessage({ id: 'ENERGYSUPPLIMENTS' })}
            </p>
          ) : item?.feedType === 'SYNTHETICADICTIVES' ? (
            <p className="font-medium">
              {t.formatMessage({ id: 'SYNTHETICADICTIVES' })}
            </p>
          ) : (
            item?.feedType.toLowerCase()
          )}
        </TableCell>
        <TableCell className="font-medium">{item?.quantity}</TableCell>
        <TableCell>
          {item?.productionPhase === 'GROWTH' ? (
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
              ) : (
                ''
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <ActionModalDialog
        loading={loading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={() => deleteItem(item)}
      />
      <CreateOrUpdateAvesFeedings
        feeding={item}
        showModal={isEdit}
        setShowModal={setIsEdit}
      />
    </>
  );
};
export { ListAvesFeedings };
