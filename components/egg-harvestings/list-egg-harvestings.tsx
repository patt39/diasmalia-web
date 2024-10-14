/* eslint-disable @next/next/no-img-element */
import { DeleteOneEggHarvestingAPI } from '@/api-site/eggharvesting';
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
import { Egg, MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { CreateIncubations } from '../incubations/create-incubations';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { Badge } from '../ui/badge';
import { TableCell, TableRow } from '../ui/table';
import { CreateOrUpdateEggHarvestings } from './create-or-update-egg-harvestings';

const ListEggHarvestings = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isIncubation, setIsIncubation] = useState(false);

  const { isPending: loading, mutateAsync: deleteMutation } =
    DeleteOneEggHarvestingAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ eggHarvestingId: item.id });
      AlertSuccessNotification({
        text: 'EggHarvesting deleted successfully',
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
        <TableCell>{item?.animal?.code}</TableCell>
        <TableCell>{item?.quantity}</TableCell>
        <TableCell>
          {item?.size === 'SMALL' ? (
            <Badge className="text-xs" variant="destructive">
              {t.formatMessage({ id: 'TABEGGHAVESTING.SMALL' })}
            </Badge>
          ) : item?.size === 'MEDIUM' ? (
            <Badge className="text-xs" variant="default">
              {t.formatMessage({
                id: 'TABEGGHAVESTING.MEDIUM',
              })}
            </Badge>
          ) : (
            <Badge className="text-xs" variant="secondary">
              {t.formatMessage({ id: 'TABEGGHAVESTING.LARGE' })}
            </Badge>
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
              {item?.animal?.quantity !== 0 ? (
                <DropdownMenuItem onClick={() => setIsIncubation(true)}>
                  <Egg className="size-4 text-gray-600 hover:text-violet-600" />
                  <span className="ml-2 cursor-pointer hover:text-violet-600">
                    {t.formatMessage({
                      id: 'ANIMALTYPE.ANIMALS.INCUBATION.CREATE',
                    })}
                  </span>
                </DropdownMenuItem>
              ) : (
                ''
              )}
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
            <ActionModalDialog
              loading={loading}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onClick={() => deleteItem(item)}
            />
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <CreateOrUpdateEggHarvestings
        eggHarvesting={item}
        showModal={isEdit}
        setShowModal={setIsEdit}
      />
      <CreateIncubations
        incubation={item}
        showModal={isIncubation}
        setShowModal={setIsIncubation}
      />
    </>
  );
};
export { ListEggHarvestings };
