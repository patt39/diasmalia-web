/* eslint-disable @next/next/no-img-element */
import { SalesPdfDownloadAPI } from '@/api-site/sales';
import { DeleteOneTaskAPI } from '@/api-site/task';
import { useInputState } from '@/components/hooks';
import { ActionModalDialog } from '@/components/ui-setting/shadcn';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { UpdateSales } from '@/pages/sales/update-sales';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formatDateDDMMYY,
} from '@/utils';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import {
  Download,
  Eye,
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';
import { useState } from 'react';
import { ViewSale } from './view-sale';

const ListSales = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen, userStorage } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  const { isPending: loading, mutateAsync: deleteMutation } =
    DeleteOneTaskAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ taskId: item?.id });
      AlertSuccessNotification({
        text: 'Task deleted successfully',
      });
      setIsOpen(false);
    } catch (error: any) {
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const response = await SalesPdfDownloadAPI({
        saleId: item?.id,
      });
      const link = document.createElement('a');
      link.href = response.config.url;
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
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
        <TableCell className="font-medium">{item?.animalType?.name}</TableCell>
        <TableCell className="hidden md:table-cell">{item?.number}</TableCell>
        <TableCell className="hidden md:table-cell">
          {item?.price.toLocaleString('en-US')}{' '}
          {userStorage?.profile?.currency?.symbol}
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
              <DropdownMenuItem onClick={() => handleDownloadPdf()}>
                <Download className="size-4 text-gray-600 hover:text-red-600" />
                <span className="ml-2 cursor-pointer hover:text-red-600">
                  {t.formatMessage({ id: 'TABANIMAL.DOWNLOAD' })}
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
      <ActionModalDialog
        loading={loading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={() => deleteItem(item)}
      />
      <UpdateSales sale={item} showModal={isEdit} setShowModal={setIsEdit} />
      <ViewSale sale={item} showModal={isView} setShowModal={setIsView} />
    </>
  );
};
export { ListSales };
