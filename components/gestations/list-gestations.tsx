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
import { formatDateDDMMYY } from '@/utils';
import { Check, Eye, MoreHorizontal, PencilIcon } from 'lucide-react';
import { useState } from 'react';
import { TableCell, TableRow } from '../ui/table';
import { ReCheckPregnancy } from './recheck-pregnancy';
import { UpdateGestations } from './update-gestations';
import { ViewGestation } from './view-gestation';

const ListGestations = ({ item, index }: { item: any; index: number }) => {
  const { t } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isView, setIsView] = useState(false);

  const currentDate: Date = new Date();
  const createdAt: Date = new Date(item.createdAt);
  const differenceInMilliseconds: number =
    currentDate.getTime() - createdAt.getTime();
  const millisecondsInOneDay: number = 24 * 60 * 60 * 1000;
  const daysDifference: number = Math.floor(
    differenceInMilliseconds / millisecondsInOneDay,
  );

  return (
    <>
      <TableRow key={index} className="dark:border-gray-800">
        <TableCell className="font-medium">{item.animal?.code}</TableCell>
        <TableCell>{item?.method.toLowerCase()}</TableCell>
        <TableCell>{formatDateDDMMYY(item?.farrowingDate) || 'RAS'}</TableCell>
        <TableCell>
          {item?.note?.length > 20
            ? item?.note?.substring(0, 20) + '...'
            : item?.note || 'N/A'}
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
              {daysDifference < 30 ? (
                <DropdownMenuItem onClick={() => setIsCheck(true)}>
                  <Check className="size-4 text-gray-600 hover:text-red-400 cursor-pointer" />
                  <span className="ml-2 cursor-pointer hover:text-red-400">
                    {t.formatMessage({ id: 'BREEDING.RECHECK' })}
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
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <UpdateGestations
        gestation={item}
        showModal={isEdit}
        setShowModal={setIsEdit}
      />
      <ReCheckPregnancy
        gestation={item}
        showModal={isCheck}
        setShowModal={setIsCheck}
      />
      <ViewGestation
        gestation={item}
        showModal={isView}
        setShowModal={setIsView}
      />
    </>
  );
};
export { ListGestations };
