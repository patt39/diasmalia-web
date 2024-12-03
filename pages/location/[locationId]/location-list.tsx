/* eslint-disable @next/next/no-img-element */
import { DeleteOneAnimalAPI } from '@/api-site/animals';
import { UpdateAnimals } from '@/components/animals/update-animal';
import { ViewAnimal } from '@/components/animals/view-animal';
import { CreateFarrowings } from '@/components/farrowings/create-farrowings';
import { useInputState } from '@/components/hooks';
import { ActionModalDialog } from '@/components/ui-setting/shadcn';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formatDateDifference,
  formatWeight,
} from '@/utils';
import {
  Anvil,
  Calendar,
  History,
  Hospital,
  MoreHorizontal,
  Origami,
  PencilIcon,
  ScanQrCode,
  TrashIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
const LocationList = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen, userStorage } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isFarrowing, setIsFarrowing] = useState(false);

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
        className="relative overflow-hidden transition-allduration-200 bg-gray-200 rounded-xl hover:bg-gray-400"
      >
        <div className="p-6 lg:px-10 lg:py-8">
          <div className="ml-auto mb-2">
            {item?.status === 'ACTIVE' ? (
              <Badge variant="default">
                {t.formatMessage({ id: 'STATUS.ACTIVE' })}
              </Badge>
            ) : item?.status === 'SOLD' ? (
              <Badge variant="secondary">
                {t.formatMessage({ id: 'STATUS.SOLD' })}
              </Badge>
            ) : (
              <Badge variant="destructive">
                {t.formatMessage({ id: 'STATUS.DEATH' })}
              </Badge>
            )}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center justify-center space-x-4 cursor-pointer"
                  onClick={() => setIsView(true)}
                >
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
                      ) : item?.productionPhase === 'GESTATION' ? (
                        <p className="text-sm font-medium text-gray-500">
                          {item?.productionPhase}
                        </p>
                      ) : item?.productionPhase === 'REPRODUCTION' ? (
                        <p className="text-sm font-medium text-gray-500">
                          {item?.productionPhase}
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
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.formatMessage({ id: 'CLICK.TOSEE' })}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
                <DropdownMenuItem onClick={() => setIsEdit(true)}>
                  <PencilIcon className="size-4 text-gray-600 hover:text-cyan-600" />
                  <span className="ml-2 cursor-pointer hover:text-cyan-600">
                    {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                  </span>
                </DropdownMenuItem>
                <Link href={`/treatment/${item?.id}`}>
                  <DropdownMenuItem>
                    <Hospital className="size-4 text-gray-600 hover:text-green-600" />
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
                ) : null}
                {item?.status === 'SOLD' ? (
                  <Link href={`/animal/${item?.id}`}>
                    <DropdownMenuItem>
                      <ScanQrCode className="size-4 text-gray-600 hover:text-amber-600" />
                      <span className="ml-2 cursor-pointer hover:text-amber-600">
                        {t.formatMessage({ id: 'SALE.PROFILE' })}
                      </span>
                    </DropdownMenuItem>
                  </Link>
                ) : null}
                {item?.location?._count?.animals == 1 &&
                ['GESTATION'].includes(item?.productionPhase) ? (
                  <DropdownMenuItem onClick={() => setIsFarrowing(true)}>
                    <Origami className="size-4 text-gray-600 hover:text-emerald-600" />
                    <span className="ml-2 cursor-pointer hover:text-emerald-600">
                      {t.formatMessage({ id: 'TABWEANING.FARROWING' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                {userStorage?.role === 'SUPERADMIN' &&
                item?.status !== 'ACTIVE' ? (
                  <DropdownMenuItem onClick={() => setIsOpen(true)}>
                    <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                    <span className="ml-2 cursor-pointer hover:text-red-600">
                      {t.formatMessage({ id: 'TABANIMAL.DELETE' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
              </DropdownMenuContent>
              <ActionModalDialog
                loading={loading}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onClick={() => deleteItem(item)}
              />
            </DropdownMenu>
            {isEdit ? (
              <UpdateAnimals
                animal={item}
                showModal={isEdit}
                setShowModal={setIsEdit}
              />
            ) : null}
            {isView ? (
              <ViewAnimal
                animal={item}
                showModal={isView}
                setShowModal={setIsView}
              />
            ) : null}
            {isFarrowing ? (
              <CreateFarrowings
                animal={item}
                showModal={isFarrowing}
                setShowModal={setIsFarrowing}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
export { LocationList };
