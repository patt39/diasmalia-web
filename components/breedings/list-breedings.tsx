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
import {
  Check,
  Eye,
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';
import { useState } from 'react';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { Badge } from '../ui/badge';
import { TableCell, TableRow } from '../ui/table';
import { CheckPregnancy } from './check-pregnancy';
import { UpdateBreedings } from './update-breedings';
import { ViewBreeding } from './view-breeding';

const ListBreedings = ({ item, index }: { item: any; index: number }) => {
  const { t, loading, isOpen, setIsOpen, setLoading } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
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
        <TableCell className="font-medium">{item?.maleCode}</TableCell>
        <TableCell className="font-medium">{item?.femaleCode}</TableCell>
        <TableCell>{item.method.toLowerCase()}</TableCell>
        <TableCell>
          {item?.checkStatus === true && item?.result === 'PREGNANT' ? (
            <Badge className="text-xs" variant="secondary">
              {t.formatMessage({ id: 'BREEDING.POSITIVE' })}
            </Badge>
          ) : item?.checkStatus === true && item?.result === 'OPEN' ? (
            <Badge className="text-xs" variant="default">
              {t.formatMessage({ id: 'BREEDING.NEGATIVE' })}
            </Badge>
          ) : (
            <Badge className="text-xs" variant="destructive">
              {t.formatMessage({ id: 'BREEDING.CHECK' })}
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
            <DropdownMenuContent align="end" className="dark:border-gray-800">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setIsEdit(true)}>
                <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                <span className="ml-2 cursor-pointer hover:text-indigo-600">
                  {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                </span>
              </DropdownMenuItem>
              {item?.checkStatus === false ? (
                <DropdownMenuItem onClick={() => setIsCheck(true)}>
                  <Check className="size-4 text-gray-600 hover:text-red-400 cursor-pointer" />
                  <span className="ml-2 cursor-pointer hover:text-red-400">
                    {t.formatMessage({ id: 'BREEDING.CHECK' })}
                  </span>
                </DropdownMenuItem>
              ) : (
                ''
              )}
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
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <ActionModalDialog
        loading={loading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={() => deleteItem(item)}
      />
      <UpdateBreedings
        breeding={item}
        showModal={isEdit}
        setShowModal={setIsEdit}
      />
      <CheckPregnancy
        breeding={item}
        showModal={isCheck}
        setShowModal={setIsCheck}
      />
      <ViewBreeding
        breeding={item}
        showModal={isView}
        setShowModal={setIsView}
      />
    </>
  );
};
export { ListBreedings };
