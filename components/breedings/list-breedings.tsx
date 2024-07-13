/* eslint-disable @next/next/no-img-element */
import { DeleteOneBreedingAPI } from '@/api-site/breedings';
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
import { Check, MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { Badge } from '../ui/badge';
import { TableCell, TableRow } from '../ui/table';
import { CheckOrUpdatePregnancy } from './check-or-update-pregnancy';
import { CreateOrUpdateBreedings } from './create-or-update-breedings';

const ListBreedings = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, loading, setIsOpen, setLoading } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const { mutateAsync: deleteMutation } = DeleteOneBreedingAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await deleteMutation({ breedingId: item.id });
      AlertSuccessNotification({
        text: 'Breeding deleted successfully',
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
        <TableCell className="font-medium">{item.maleCode}</TableCell>
        <TableCell className="font-medium">{item.femaleCode}</TableCell>
        <TableCell>{item.method.toLowerCase()}</TableCell>
        <TableCell>
          {item.checkStatus === false ? (
            <Badge className="text-xs" variant="destructive">
              Check
            </Badge>
          ) : (
            <Badge className="text-xs" variant="secondary">
              Checked
            </Badge>
          )}
        </TableCell>
        <TableCell>{formatDateDDMMYY(item?.createdAt as Date)}</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setIsEdit(true)}>
                <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                <span className="ml-2 cursor-pointer hover:text-indigo-600">
                  {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsCheck(true)}>
                <Check className="size-4 text-gray-600 hover:text-red-400" />
                <span className="ml-2 cursor-pointer hover:text-red-400">
                  Check
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
      <CreateOrUpdateBreedings
        breeding={item}
        showModal={isEdit}
        setShowModal={setIsEdit}
      />
      <CheckOrUpdatePregnancy
        breeding={item}
        showModal={isCheck}
        setShowModal={setIsCheck}
      />
    </>
  );
};
export { ListBreedings };
