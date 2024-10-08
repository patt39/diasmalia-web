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
import { capitalizeFirstLetter } from '@/utils/utils';
import { MoreHorizontal, PencilIcon } from 'lucide-react';
import { useState } from 'react';
import { formatWeight } from '../../utils/formate-date';
import { TableCell, TableRow } from '../ui/table';
import { UpdateFeedings } from './update-feedings';

const ListFeedings = ({ item, index }: { item: any; index: number }) => {
  const { t } = useInputState();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <TableRow key={index} className="dark:border-gray-800">
        <TableCell className="font-medium">{item.animal?.code}</TableCell>
        <TableCell className="font-medium">
          {item?.feedStock?.feedCategory === 'PRESTARTER' ? (
            <p className="font-medium text-orange-600">
              {t.formatMessage({ id: 'FEED.PRESTARTER' })}
            </p>
          ) : item?.feedStock?.feedCategory === 'CONCENTRATES' ? (
            <p className="font-medium text-blue-600">
              {t.formatMessage({ id: 'FEED.CONCENTRATES' })}
            </p>
          ) : item?.feedStock?.feedCategory === 'BYPRODUCTS' ? (
            <p className="font-medium text-cyan-600">
              {t.formatMessage({ id: 'BYPRODUCTS' })}
            </p>
          ) : item?.feedStock?.feedCategory === 'COMPLETEFEED' ? (
            <p className="font-medium text-sky-600">
              {t.formatMessage({ id: 'FEED.COMPLETEFEED' })}
            </p>
          ) : item?.feedStock?.feedCategory === 'FORAGES' ? (
            <p className="font-medium text-emerald-600 ">
              {t.formatMessage({ id: 'FEED.FORAGES' })}
            </p>
          ) : item?.feedStock?.feedCategory === 'SILAGES' ? (
            <p className="font-medium text-teal-600">
              {t.formatMessage({ id: 'FORAGES.SILAGES' })}
            </p>
          ) : item?.feedStock?.feedCategory === 'LACTATING_FEMALES' ? (
            <p className="font-medium text-indigo-600">
              {t.formatMessage({ id: 'FEED.LACTATINGFEMALES' })}
            </p>
          ) : item?.feedStock?.feedCategory === 'GESTATION_FEMALES' ? (
            <p className="font-medium text-violet-600">
              {t.formatMessage({ id: 'FEED.FEMALEGESTATION' })}
            </p>
          ) : item?.feedStock?.feedCategory === 'STARTER' ? (
            <p className="font-medium text-amber-600">
              {t.formatMessage({ id: 'FEED.STARTER' })}
            </p>
          ) : item?.feedStock?.feedCategory === 'GROWER' ? (
            <p className="font-medium text-yellow-600">
              {t.formatMessage({ id: 'FEED.GROWER' })}
            </p>
          ) : item?.feedStock?.feedCategory === 'FATTENER' ? (
            <p className="font-medium text-lime-600">
              {t.formatMessage({ id: 'FEED.FATTENER' })}
            </p>
          ) : item?.feedStock?.feedCategory === 'FINISHER' ? (
            <p className="font-medium text-green-600">
              {t.formatMessage({ id: 'FEED.FINISHER' })}
            </p>
          ) : item?.feedCategory === 'LAYERS_FEED' ? (
            <div className="justify-items-start text-purple-600 text-sm font-bold mb-2">
              {t.formatMessage({ id: 'FEED.LAYERSFEED' })}
            </div>
          ) : (
            <p className="font-medium text-purple-600">
              {item?.feedStock?.feedCategory}
            </p>
          )}
        </TableCell>
        <TableCell className="font-medium">
          {formatWeight(item?.quantity)}
        </TableCell>
        <TableCell>
          {capitalizeFirstLetter(item?.animal?.productionPhase)}
        </TableCell>
        <TableCell className="font-medium">
          {item?.animal?.location?.code}
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
      <UpdateFeedings
        feeding={item}
        showModal={isEdit}
        setShowModal={setIsEdit}
      />
    </>
  );
};
export { ListFeedings };
