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
import { MoreHorizontal, PencilIcon } from 'lucide-react';
import { useState } from 'react';
import { CreateOrUpdateFinances } from './create-or-update-finances';

const ListFinances = ({ item, index }: { item: any; index: number }) => {
  const { t, loading, isOpen, setIsOpen, setLoading } = useInputState();
  const [isEdit, setIsEdit] = useState(false);

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
          {item?.detail?.length > 60
            ? item?.detail?.substring(0, 60) + '...'
            : item?.detail}
        </TableCell>
        {item?.type === 'INCOME' ? (
          <TableCell className="font-bold text-green-600">
            + {item?.amount}
          </TableCell>
        ) : item.type === 'EXPENSE' ? (
          <TableCell className="font-bold text-red-600">
            - {item?.amount}
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
                  {t.formatMessage({
                    id: 'TABANIMAL.MENU',
                  })}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setIsEdit(true)}>
                <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                <span className="ml-2 cursor-pointer hover:text-indigo-600">
                  {t.formatMessage({
                    id: 'TABANIMAL.EDIT',
                  })}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <CreateOrUpdateFinances
        finance={item}
        showModal={isEdit}
        setShowModal={setIsEdit}
      />
    </>
  );
};
export { ListFinances };
