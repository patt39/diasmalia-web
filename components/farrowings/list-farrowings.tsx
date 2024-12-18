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
import {
  Eye,
  Hospital,
  IdCard,
  MilkOff,
  MoreHorizontal,
  PencilIcon,
} from 'lucide-react';
import { useState } from 'react';
import { formatWeight } from '../../utils/formate-date';
import { CreateBulkAnimals } from '../animals/create-bulk-animal';
import { BulkCreateTreatments } from '../treatments/bulk-create-treatments';
import { CreateTreatments } from '../treatments/create-treatments';
import { TableCell, TableRow } from '../ui/table';
import { CreateOrUpdateWeanings } from '../weanings/create-or-update-weaning';
import { UpdateFarrowings } from './update-farrowings';
import { ViewFarrowing } from './view-farrowing';

const ListFarrowings = ({ item, index }: { item: any; index: number }) => {
  const { t } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isWeaning, setIsWeaning] = useState(false);
  const [isIdentification, setIsIdentification] = useState(false);
  const [isTreatment, setIsTreatment] = useState(false);
  const [isGrowthTreatment, setIsGrowthTreatment] = useState(false);

  const { data: getOneWeaning } = GetOneWeaningAPI({
    farrowingId: item?.id,
  });

  const offspringsAlive = Number(item?.litter - item?.dead);

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
              <DropdownMenuItem onClick={() => setIsTreatment(true)}>
                <Hospital className="size-4 text-gray-600 hover:text-lime-600" />
                <span className="ml-2 cursor-pointer hover:text-lime-600">
                  {t.formatMessage({ id: 'FEMALE.CARE' })}
                </span>
              </DropdownMenuItem>
              {item?.animal?.location?._count?.animals ===
                Number(offspringsAlive + 1) &&
              item?.animalType?.name !== 'Cuniculture' ? (
                <DropdownMenuItem onClick={() => setIsGrowthTreatment(true)}>
                  <Hospital className="size-4 text-gray-600 hover:text-green-600" />
                  <span className="ml-2 cursor-pointer hover:text-green-600">
                    {t.formatMessage({ id: 'OFFSPRINGS.CARE' })}
                  </span>
                </DropdownMenuItem>
              ) : null}
              {item?.animal?.location?._count?.animals !==
                Number(offspringsAlive + 1) &&
              item?.animalType?.name !== 'Cuniculture' ? (
                <DropdownMenuItem onClick={() => setIsIdentification(true)}>
                  <IdCard className="size-4 text-gray-600 hover:text-fuchsia-600" />
                  <span className="ml-2 cursor-pointer hover:text-fuchsia-600">
                    {t.formatMessage({ id: 'OFFSPRING.IDENTIFICATION' })}
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
          animal={item}
          weaning={item?.animalTypeId}
          showModal={isWeaning}
          setShowModal={setIsWeaning}
        />
      ) : null}
      {isIdentification ? (
        <CreateBulkAnimals
          farrowing={item}
          location={item?.animalTypeId}
          showModal={isIdentification}
          setShowModal={setIsIdentification}
        />
      ) : null}
      {isTreatment ? (
        <CreateTreatments
          animal={item}
          farrowing={item}
          showModal={isTreatment}
          setShowModal={setIsTreatment}
        />
      ) : null}
      {isGrowthTreatment ? (
        <BulkCreateTreatments
          farrowing={item}
          location={item}
          showModal={isGrowthTreatment}
          setShowModal={setIsGrowthTreatment}
        />
      ) : null}
    </>
  );
};
export { ListFarrowings };
