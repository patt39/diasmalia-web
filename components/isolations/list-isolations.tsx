/* eslint-disable @next/next/no-img-element */
import { DeleteOneIsolationAPI } from '@/api-site/isolations';
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
import { Eye, MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { TableCell, TableRow } from '../ui/table';
import { CreateOrUpdateIsolations } from './create-or-update-isolations';
import { ViewIsolation } from './view-isolation';

const ListIsolations = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  const { isPending: loading, mutateAsync: deleteMutation } =
    DeleteOneIsolationAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ isolationId: item?.id });
      AlertSuccessNotification({
        text: 'Isolation deleted successfully',
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
          {item?.animal?.productionPhase === 'GROWTH' ? (
            <p className="font-medium">
              {t.formatMessage({ id: 'PRODUCTIONTYPE.GROWTH' })}
            </p>
          ) : item?.animal?.productionPhase === 'FATTENING' ? (
            <p className="font-medium">
              {t.formatMessage({ id: 'ANIMALTYPE.FATTENING' })}
            </p>
          ) : (
            <p className="font-medium">{item?.animal?.productionPhase}</p>
          )}
        </TableCell>
        <TableCell>
          {item?.note?.length > 20
            ? item?.note?.substring(0, 20) + '...'
            : item?.note}
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
              <DropdownMenuItem onClick={() => setIsView(true)}>
                <Eye className="size-4 text-gray-600 hover:text-indigo-600" />
                <span className="ml-2 cursor-pointer hover:text-indigo-600">
                  {t.formatMessage({ id: 'TABANIMAL.VIEW' })}
                </span>
              </DropdownMenuItem>
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
        <CreateOrUpdateIsolations
          isolation={item}
          showModal={isEdit}
          setShowModal={setIsEdit}
        />
      ) : null}
      {isView ? (
        <ViewIsolation
          isolation={item}
          showModal={isView}
          setShowModal={setIsView}
        />
      ) : null}
    </>
  );
};
export { ListIsolations };
