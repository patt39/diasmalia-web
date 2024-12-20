/* eslint-disable @next/next/no-img-element */
import { GetOneWeaningAPI } from '@/api-site/weanings';
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
import { Eye, MilkOff, MoreHorizontal, PencilIcon } from 'lucide-react';
import { useState } from 'react';
import { formatWeight } from '../../utils/formate-date';
import { TableCell, TableRow } from '../ui/table';
import { CreateOrUpdateWeanings } from '../weanings/create-or-update-weaning';
import { UpdateFarrowings } from './update-farrowings';
import { ViewFarrowing } from './view-farrowing';

const ListFarrowings = ({ item, index }: { item: any; index: number }) => {
  const { t } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isWeaning, setIsWeaning] = useState(false);

  const { data: getOneWeaning } = GetOneWeaningAPI({
    farrowingId: item?.id,
  });

  return (
    <>
      <TableRow key={index} className="dark:border-gray-800">
        <TableCell>{item?.animal?.code}</TableCell>
        <TableCell>{item?.litter}</TableCell>
        <TableCell>{item?.dead ?? 0}</TableCell>
        <TableCell>{formatWeight(item?.weight)}</TableCell>
        <TableCell>
          {item?.note?.length > 20
            ? item?.note?.substring(0, 20) + '...'
            : item?.note}
        </TableCell>
        <TableCell>{formatDateDDMMYY(item?.createdAt as Date)}</TableCell>
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
              {getOneWeaning?.animalId !== item?.animalId ? (
                <DropdownMenuItem onClick={() => setIsWeaning(true)}>
                  <MilkOff className="size-4 text-gray-600 hover:text-violet-600" />
                  <span className="ml-2 cursor-pointer hover:text-violet-600">
                    {t.formatMessage({ id: 'WEAN' })}
                  </span>
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      {isEdit ? (
        <UpdateFarrowings
          farrowing={item}
          showModal={isEdit}
          setShowModal={setIsEdit}
        />
      ) : null}
      {isView ? (
        <ViewFarrowing
          farrowing={item}
          showModal={isView}
          setShowModal={setIsView}
        />
      ) : null}
      {isWeaning ? (
        <CreateOrUpdateWeanings
          weaning={item?.animalTypeId}
          showModal={isWeaning}
          setShowModal={setIsWeaning}
        />
      ) : null}
    </>
  );
};
export { ListFarrowings };
