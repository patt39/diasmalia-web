/* eslint-disable @next/next/no-img-element */
import { DeleteOneSaleAPI, GetSalesAPI } from '@/api-site/sales';
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
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { CreateOrUpdateSales } from './create-or-update-sales';

const ListSales = ({ item, index }: { item: any; index: number }) => {
  const { t, loading, isOpen, setIsOpen, setLoading } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const { data: user } = GetOneUserMeAPI();

  const {
    isLoading: isLoadingSales,
    isError: isErrorSales,
    data: dataSales,
  } = GetSalesAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
  });

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
        <TableCell className="font-medium">{item.soldTo}</TableCell>
        <TableCell className="font-medium">
          <div className="font-medium">{item?.phone || 'N/A'}</div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {item?.email || 'N/A'}
          </div>
        </TableCell>
        <TableCell className="font-medium">{item.method}</TableCell>
        <TableCell className="font-medium">{item.type}</TableCell>
        <TableCell className="hidden md:table-cell">
          {item.quantity || 'N/A'}
        </TableCell>
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
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteItem(item)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <CreateOrUpdateSales
        sale={item}
        showModal={isEdit}
        setShowModal={setIsEdit}
      />
    </>
  );
};
export { ListSales };
