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
import { Bone, Eye, MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { CreateOrUpdateAvesDeaths } from '../aves-deaths/create-or-update-aves-deaths';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { TableCell, TableRow } from '../ui/table';
import { CreateOrUpdateAvesIsolations } from './create-or-update-aves-isolations';
import { ViewAvesIsolation } from './view-isolation';

const ListAvesIsolations = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isDeath, setIsDeath] = useState(false);

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
        <TableCell className="font-medium">{item?.number}</TableCell>
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
                <Eye className="size-4 text-gray-600 hover:text-purple-600" />
                <span className="ml-2 cursor-pointer hover:text-purple-600">
                  {t.formatMessage({ id: 'TABANIMAL.VIEW' })}
                </span>
              </DropdownMenuItem>
              {item?.animal?.status == 'ACTIVE' &&
              item?.animal?.quantity !== 0 ? (
                <DropdownMenuItem onClick={() => setIsDeath(true)}>
                  <Bone className="size-4 text-gray-600 hover:text-amber-600" />
                  <span className="ml-2 cursor-pointer hover:text-amber-600">
                    {t.formatMessage({
                      id: 'ANIMALTYPE.DEATHS',
                    })}
                  </span>
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuItem onClick={() => setIsEdit(true)}>
                <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                <span className="ml-2 cursor-pointer hover:text-indigo-600">
                  {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                <span className="ml-2 cursor-pointer hover:text-red-600">
                  {t.formatMessage({
                    id: 'TABANIMAL.DELETE',
                  })}
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
      {isEdit ? (
        <CreateOrUpdateAvesIsolations
          isolation={item}
          showModal={isEdit}
          setShowModal={setIsEdit}
        />
      ) : null}
      {isView ? (
        <ViewAvesIsolation
          isolation={item}
          showModal={isView}
          setShowModal={setIsView}
        />
      ) : null}
      {isDeath ? (
        <CreateOrUpdateAvesDeaths
          animal={item}
          death={item?.animalTypeId}
          showModal={isDeath}
          setShowModal={setIsDeath}
        />
      ) : null}
    </>
  );
};
export { ListAvesIsolations };
