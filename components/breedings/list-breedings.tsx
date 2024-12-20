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
import { Check, MoreHorizontal, PencilIcon } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { TableCell, TableRow } from '../ui/table';
import { CheckPregnancy } from './check-pregnancy';
import { UpdateBreedings } from './update-breedings';

const ListBreedings = ({ item, index }: { item: any; index: number }) => {
  const { t } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  return (
    <>
      <TableRow key={index} className="dark:border-gray-800">
        <TableCell className="font-medium">{item?.maleCode}</TableCell>
        <TableCell className="font-medium">{item?.femaleCode}</TableCell>
        <TableCell>{item?.method}</TableCell>
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
              {item?.checkStatus === false &&
              item?.checkPregnancyId !== null ? (
                <DropdownMenuItem onClick={() => setIsCheck(true)}>
                  <Check className="size-4 text-gray-600 hover:text-red-400 cursor-pointer" />
                  <span className="ml-2 cursor-pointer hover:text-red-400">
                    {t.formatMessage({ id: 'BREEDING.CHECK' })}
                  </span>
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      {isEdit ? (
        <UpdateBreedings
          breeding={item}
          showModal={isEdit}
          setShowModal={setIsEdit}
        />
      ) : null}
      {isCheck ? (
        <CheckPregnancy
          breeding={item}
          showModal={isCheck}
          setShowModal={setIsCheck}
        />
      ) : null}
    </>
  );
};
export { ListBreedings };
