/* eslint-disable @next/next/no-img-element */
import { DeleteOneAnimalAPI } from '@/api-site/animals';
import { useInputState } from '@/components/hooks';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formatDateDifference,
  formatWeight,
} from '@/utils';
import {
  Anvil,
  Calendar,
  ClipboardPlus,
  Eye,
  History,
  MoreHorizontal,
  PencilIcon,
  ScanQrCode,
  TrashIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { Badge } from '../ui/badge';
import { UpdateAnimals } from './update-animal';
import { ViewAnimal } from './view-animal';

const ListAnimals = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  const { isPending: loading, mutateAsync: deleteMutation } =
    DeleteOneAnimalAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ animalId: item?.id });
      AlertSuccessNotification({
        text: 'Animal deleted successfully',
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
      <div
        key={index}
        className="relative overflow-hidden transition-allduration-200 bg-gray-100 rounded-xl hover:bg-gray-200"
      >
        <div className="p-6 lg:px-10 lg:py-8">
          <div className="ml-auto mb-2">
            {item?.status === 'ACTIVE' && item?.gender === 'MALE' ? (
              <Badge variant="default">
                {t.formatMessage({ id: 'STATUS.ACTIVE' })}
              </Badge>
            ) : item?.status === 'SOLD' ? (
              <Badge variant="secondary">
                {t.formatMessage({ id: 'STATUS.SOLD' })}
              </Badge>
            ) : item?.status === 'DEAD' ? (
              <Badge variant="destructive">
                {t.formatMessage({ id: 'STATUS.DEATH' })}
              </Badge>
            ) : (
              <Badge variant="default">{item?.status}</Badge>
            )}
          </div>
          <div className="flex items-center justify-start space-x-2">
            <div>
              <h2 className="text-sm flex items-center font-medium text-gray-500">
                <Anvil className="h-3.5 w-3.5  hover:shadow-xxl" />
                {t.formatMessage({ id: 'TABANIMAL.WEIGHT' })}:{' '}
                {formatWeight(item?.weight)}
              </h2>
              <h2 className="mt-2 text-sm flex items-center font-medium text-gray-500 h-4">
                <Calendar className="h-3.5 w-3.5  hover:shadow-xxl" />
                Age: {formatDateDifference(item?.birthday)}
              </h2>
            </div>
            <div className="flex-shrink-0 w-px h-20  bg-gray-200"></div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 h-8 sm:text-base lg:text-lg">
                {(item?.code).toUpperCase()}
              </h3>
              <p className="mb-1 text-sm font-medium text-gray-500">
                {item?.productionPhase === 'GROWTH' ? (
                  <p className="text-sm font-medium text-gray-500">
                    {t.formatMessage({ id: 'PRODUCTIONPHASE.GROWTH' })}
                  </p>
                ) : item?.productionPhase === 'FATTENING' ? (
                  <p className="text-sm font-medium text-gray-500">
                    {t.formatMessage({ id: 'PRODUCTIONTYPE.FATTENING' })}
                  </p>
                ) : (
                  <p className="text-sm font-medium text-gray-500">
                    {item?.productionPhase}
                  </p>
                )}
              </p>
              <p className="text-sm font-medium text-gray-500">
                {item?.gender === 'FEMALE'
                  ? t.formatMessage({ id: 'ANIMAL.GENDER' })
                  : item?.gender}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 mt-6 sm:mt-2 px-20 sm:grid-cols-2 xl:grid-cols-3 sm:gap-8 xl:gap-12">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-haspopup="true"
                  size="icon"
                  variant="ghost"
                  className="ml-40"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">
                    {t.formatMessage({ id: 'TABANIMAL.MENU' })}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:border-gray-800">
                <DropdownMenuItem onClick={() => setIsView(true)}>
                  <Eye className="size-4 text-gray-600 hover:text-indigo-600" />
                  <span className="ml-2 cursor-pointer hover:text-indigo-600">
                    {t.formatMessage({ id: 'TABANIMAL.VIEW' })}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsEdit(true)}>
                  <PencilIcon className="size-4 text-gray-600 hover:text-cyan-600" />
                  <span className="ml-2 cursor-pointer hover:text-cyan-600">
                    {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                  </span>
                </DropdownMenuItem>
                <Link href={`/treatment/${item?.id}`}>
                  <DropdownMenuItem>
                    <ClipboardPlus className="size-4 text-gray-600 hover:text-green-600" />
                    <span className="ml-2 cursor-pointer hover:text-green-600">
                      {t.formatMessage({ id: 'HEALTH' })}
                    </span>
                  </DropdownMenuItem>
                </Link>
                {['GESTATION', 'LACTATION', 'REPRODUCTION'].includes(
                  item?.productionPhase,
                ) && item?.gender === 'FEMALE' ? (
                  <Link href={`/breedings/${item?.id}`}>
                    <DropdownMenuItem>
                      <History className="size-4 text-gray-600 hover:text-orange-600" />
                      <span className="ml-2 cursor-pointer hover:text-orange-600">
                        {t.formatMessage({ id: 'BREEDING.HISTORY' })}
                      </span>
                    </DropdownMenuItem>
                  </Link>
                ) : (
                  ''
                )}
                {item?.status === 'SOLD' ? (
                  <Link href={`/animal/${item?.id}`}>
                    <DropdownMenuItem>
                      <ScanQrCode className="size-4 text-gray-600 hover:text-amber-600" />
                      <span className="ml-2 cursor-pointer hover:text-amber-600">
                        {t.formatMessage({ id: 'SALE.PROFILE' })}
                      </span>
                    </DropdownMenuItem>
                  </Link>
                ) : (
                  ''
                )}
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
            <UpdateAnimals
              animal={item}
              showModal={isEdit}
              setShowModal={setIsEdit}
            />
            <ViewAnimal
              animal={item}
              showModal={isView}
              setShowModal={setIsView}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export { ListAnimals };
