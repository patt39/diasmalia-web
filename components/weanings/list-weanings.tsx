/* eslint-disable @next/next/no-img-element */
import { DeleteOneWeaningAPI } from '@/api-site/weanings';
import { useInputState } from '@/components/hooks';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formatDateDDMMYY,
  formatWeight,
} from '@/utils';
import {
  Hospital,
  IdCard,
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';
import { useState } from 'react';
import { CreateBulkAnimals } from '../animals/create-bulk-animal';
import { BulkCreateTreatments } from '../treatments/bulk-create-treatments';
import { CreateTreatments } from '../treatments/create-treatments';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { Badge } from '../ui/badge';
import { TableCell, TableRow } from '../ui/table';
import { CreateOrUpdateWeanings } from './create-or-update-weaning';

const ListWeanings = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, loading, setIsOpen } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isIdentification, setIsIdentification] = useState(false);
  const [isTreatment, setIsTreatment] = useState(false);
  const [isGrowthTreatment, setIsGrowthTreatment] = useState(false);

  const { mutateAsync: deleteMutation } = DeleteOneWeaningAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ weaningId: item.id });
      AlertSuccessNotification({
        text: 'Weaning deleted successfully',
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
        <TableCell className="font-medium">{item?.animal?.code}</TableCell>
        <TableCell>{item?.farrowing?.litter}</TableCell>
        <TableCell>{item?.litter}</TableCell>
        <TableCell>{formatWeight(item?.weight)}</TableCell>
        <TableCell>
          {Number(item?.farrowing?.litter - item?.litter) <= 2 ? (
            <Badge className="text-xs" variant="default">
              {t.formatMessage({ id: 'GOOD.MOTHER' })}
            </Badge>
          ) : (
            <Badge className="text-xs" variant="destructive">
              {t.formatMessage({ id: 'BAD.MOTHER' })}
            </Badge>
          )}
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
              <DropdownMenuItem onClick={() => setIsTreatment(true)}>
                <Hospital className="size-4 text-gray-600 hover:text-lime-600" />
                <span className="ml-2 cursor-pointer hover:text-lime-600">
                  {t.formatMessage({ id: 'FEMALE.CARE' })}
                </span>
              </DropdownMenuItem>
              {item?.animal?.location?._count?.animals ==
                Number(item?.farrowing?.litter + 1) ||
              (item?.animal?.location?._count?.animals ==
                Number(item?.litter + 1) &&
                item?.animalType?.name !== 'Cuniculture') ? (
                <DropdownMenuItem onClick={() => setIsGrowthTreatment(true)}>
                  <Hospital className="size-4 text-gray-600 hover:text-green-600" />
                  <span className="ml-2 cursor-pointer hover:text-green-600">
                    {t.formatMessage({ id: 'OFFSPRINGS.CARE' })}
                  </span>
                </DropdownMenuItem>
              ) : null}
              {item?.animal?.location?._count?.animals !==
                Number(item?.farrowing?.litter + 1) &&
              item?.animalType?.name !== 'Cuniculture' ? (
                <DropdownMenuItem onClick={() => setIsIdentification(true)}>
                  <IdCard className="size-4 text-gray-600 hover:text-fuchsia-600" />
                  <span className="ml-2 cursor-pointer hover:text-fuchsia-600">
                    {t.formatMessage({ id: 'OFFSPRING.IDENTIFICATION' })}
                  </span>
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                <span className="ml-2 cursor-pointer hover:text-red-600">
                  {t.formatMessage({ id: 'TABANIMAL.DELETE' })}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isOpen ? (
            <ActionModalDialog
              loading={loading}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onClick={() => deleteItem(item)}
            />
          ) : null}
        </TableCell>
      </TableRow>
      {isEdit ? (
        <CreateOrUpdateWeanings
          weaning={item}
          showModal={isEdit}
          setShowModal={setIsEdit}
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
          location={item}
          farrowing={item}
          showModal={isGrowthTreatment}
          setShowModal={setIsGrowthTreatment}
        />
      ) : null}
    </>
  );
};
export { ListWeanings };
