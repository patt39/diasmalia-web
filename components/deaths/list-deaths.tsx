/* eslint-disable @next/next/no-img-element */
import { DeleteOneDeathAPI } from '@/api-site/deaths';
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
import { capitalizeFirstLetter } from '../../utils/utils';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { TableCell, TableRow } from '../ui/table';
import { CreateOrUpdateDeaths } from './create-or-update-deaths';
import { ViewDeath } from './view-death';

const ListDeaths = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, loading, setIsOpen, setLoading } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  const { mutateAsync: deleteMutation } = DeleteOneDeathAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await deleteMutation({ deathId: item.id });
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
          {item?.animal?.productionPhase === 'REPRODUCTION' ? (
            <p className="font-medium text-orange-600">
              {capitalizeFirstLetter(item?.animal?.productionPhase)}
            </p>
          ) : item?.animal?.productionPhase === 'FATTENING' ? (
            <p className="font-medium text-blue-600">
              {t.formatMessage({ id: 'PRODUCTIONTYPE.FATTENING' })}
            </p>
          ) : item?.animal?.productionPhase === 'GROWTH' ? (
            <p className="font-medium text-cyan-600">
              {t.formatMessage({ id: 'FEED.GROWER' })}
            </p>
          ) : item?.animal?.productionPhase === 'GESTATION' ? (
            <p className="font-medium text-sky-600">
              {t.formatMessage({ id: 'ANIMALTYPE.GESTATIONS' })}
            </p>
          ) : (
            <p className="font-medium text-purple-600">
              {capitalizeFirstLetter(item?.animal?.productionPhase)}
            </p>
          )}
        </TableCell>
        <TableCell>
          {item?.note?.length > 20
            ? item?.note?.substring(0, 20) + '...'
            : item?.note}
        </TableCell>
        <TableCell className="font-medium">
          {item?.animal?.location?.code.toUpperCase()}
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
              <DropdownMenuItem onClick={() => setIsView(true)}>
                <Eye className="size-4 text-gray-600 hover:text-indigo-600" />
                <span className="ml-2 cursor-pointer hover:text-indigo-600">
                  {t.formatMessage({ id: 'TABANIMAL.VIEW' })}
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
      <CreateOrUpdateDeaths
        death={item}
        showModal={isEdit}
        setShowModal={setIsEdit}
      />
      <ViewDeath death={item} showModal={isView} setShowModal={setIsView} />
    </>
  );
};
export { ListDeaths };
