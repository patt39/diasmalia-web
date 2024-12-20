/* eslint-disable @next/next/no-img-element */
import { DeleteOneSaleAPI, SalesPdfDownloadAPI } from '@/api-site/sales';
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
import {
  Download,
  Eye,
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';
import { useState } from 'react';
import { UpdateSales } from '../../pages/sales/update-sales';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { ViewAvesSale } from './view-sale';

const ListAvesSales = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen, userStorage } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  const handleDownloadPdf = async () => {
    try {
      const response = await SalesPdfDownloadAPI({
        saleId: item?.id,
      });
      const link = document.createElement('a');
      link.href = response.config.url;
      link.click();
      link.remove();
      AlertSuccessNotification({
        text: 'Pdf downloaded successfully',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { isPending: loading, mutateAsync: saveMutation } = DeleteOneSaleAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await saveMutation({ saleId: item?.id });
      AlertSuccessNotification({
        text: 'Sale deleted successfully',
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
        <TableCell className="font-medium">{item?.soldTo}</TableCell>
        <TableCell className="font-medium">
          <div className="font-medium">{item?.phone || 'N/A'}</div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {item?.email?.length > 20
              ? item?.email?.substring(0, 20) + '...'
              : item?.email || 'N/A'}
          </div>
        </TableCell>
        {!['Pisciculture'].includes(item?.type) ? (
          <>
            {item?.detail === 'EGGS' ? (
              <TableCell className="font-medium">
                {t.formatMessage({ id: 'SALE.EGGS' })}
              </TableCell>
            ) : item?.detail === 'CHICKS' ? (
              <TableCell className="font-medium">
                {t.formatMessage({ id: 'SALE.CHICKS' })}
              </TableCell>
            ) : (
              <TableCell className="font-medium">
                {t.formatMessage({ id: 'SALE.CHICKENS' })}
              </TableCell>
            )}
          </>
        ) : null}
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
                <Download className="size-4 text-gray-600 hover:text-stone-600" />
                <span className="ml-2 cursor-pointer hover:text-stone-600">
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
      {isEdit ? (
        <UpdateSales sale={item} showModal={isEdit} setShowModal={setIsEdit} />
      ) : null}
      {isView ? (
        <ViewAvesSale sale={item} showModal={isView} setShowModal={setIsView} />
      ) : null}
    </>
  );
};
export { ListAvesSales };
