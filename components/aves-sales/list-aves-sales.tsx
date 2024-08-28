/* eslint-disable @next/next/no-img-element */
import { DeleteOneSaleAPI } from '@/api-site/sales';
import { GetOneUserMeAPI } from '@/api-site/user';
import { useInputState } from '@/components/hooks';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formatDateDDMMYY,
} from '@/utils';
import { Eye, MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { CreateOrUpdateAvesSales } from './create-or-update-aves-sales';
import { ViewAvesSale } from './view-sale';

const ListAvesSales = ({ item, index }: { item: any; index: number }) => {
  const { t, loading, isOpen, setIsOpen, setLoading } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const { data: user } = GetOneUserMeAPI();

  const { mutateAsync: saveMutation } = DeleteOneSaleAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutation({ saleId: item?.id });
      AlertSuccessNotification({
        text: 'Sale deleted successfully',
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
        <TableCell className="font-medium">{item?.soldTo}</TableCell>
        <TableCell className="font-medium">
          <div className="font-medium">{item?.phone || 'N/A'}</div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {item?.email?.length > 20
              ? item?.email?.substring(0, 20) + '...'
              : item?.email || 'N/A'}
          </div>
        </TableCell>
        <TableCell className="font-medium">{item?.method}</TableCell>
        <TableCell className="hidden md:table-cell">{item?.number}</TableCell>
        <TableCell className="hidden md:table-cell">
          {item.price} {user?.profile?.currency?.symbol}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {formatDateDDMMYY(item?.createdAt as Date)}
        </TableCell>
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
      <CreateOrUpdateAvesSales
        sale={item}
        showModal={isEdit}
        setShowModal={setIsEdit}
      />
      <ViewAvesSale sale={item} showModal={isView} setShowModal={setIsView} />
    </>
  );
};
export { ListAvesSales };
