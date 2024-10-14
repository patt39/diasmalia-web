/* eslint-disable @next/next/no-img-element */
import { DeleteOneFatteningAPI } from '@/api-site/fattenings';
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
import { formatWeight } from '../../utils/formate-date';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { TableCell, TableRow } from '../ui/table';
import { CreateOrUpdateFattenings } from './create-or-update-fattenings';

const ListFattenings = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen, setLoading } = useInputState();
  const [isEdit, setIsEdit] = useState(false);

  const { isPending: loading, mutateAsync: deleteMutation } =
    DeleteOneFatteningAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ fatteningId: item.id });
      AlertSuccessNotification({
        text: 'Fattening deleted successfully',
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
        <TableCell className="font-medium">{item.animal?.code}</TableCell>
        <TableCell>{formatWeight(item?.initialWeight)}</TableCell>
        <TableCell>{formatWeight(item?.actualWeight)}</TableCell>
        <TableCell>{formatDateDDMMYY(item?.createdAt as Date)}</TableCell>
        <TableCell>{formatDateDDMMYY(item?.updatedAt as Date)}</TableCell>
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
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                <span className="ml-2 cursor-pointer hover:text-red-600">
                  {t.formatMessage({ id: 'TABANIMAL.DELETE' })}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
            <ActionModalDialog
              loading={loading}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onClick={() => deleteItem(item)}
            />
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <CreateOrUpdateFattenings
        fattening={item}
        showModal={isEdit}
        setShowModal={setIsEdit}
      />
    </>
  );
};
export { ListFattenings };
