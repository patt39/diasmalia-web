/* eslint-disable @next/next/no-img-element */
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
import { formatDateDDMMYY } from '@/utils';
import { Eye, MoreHorizontal, PencilIcon } from 'lucide-react';
import { useState } from 'react';
import { CreateOrUpdateFinances } from './create-or-update-finances';
import { ViewFinance } from './view-finance';

const ListFinances = ({ item, index }: { item: any; index: number }) => {
  const { t, userStorage } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  return (
    <>
      <TableRow key={index} className="dark:border-gray-800">
        <TableCell className="font-medium">
          {formatDateDDMMYY(item?.createdAt as Date)}
        </TableCell>
        <TableCell className="font-medium">
          {item?.type === 'INCOME'
            ? t.formatMessage({ id: 'FINANCE.INCOME' })
            : t.formatMessage({ id: 'FINANCE.EXPENSES' })}
        </TableCell>
        <TableCell>
          {item?.detail?.length > 20
            ? item?.detail?.substring(0, 20) + '...'
            : item?.detail}
        </TableCell>
        {item?.type === 'INCOME' ? (
          <TableCell className="font-bold text-green-600">
            +
            {item?.amount?.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{' '}
            {userStorage?.profile?.currency?.symbol}
          </TableCell>
        ) : item.type === 'EXPENSE' ? (
          <TableCell className="font-bold text-red-600">
            {item?.amount?.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{' '}
            {userStorage?.profile?.currency?.symbol}
          </TableCell>
        ) : (
          ''
        )}
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
            <DropdownMenuContent align="end">
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
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      {isEdit ? (
        <CreateOrUpdateFinances
          finance={item}
          showModal={isEdit}
          setShowModal={setIsEdit}
        />
      ) : null}
      {isView ? (
        <ViewFinance
          finance={item}
          showModal={isView}
          setShowModal={setIsView}
        />
      ) : null}
    </>
  );
};
export { ListFinances };
