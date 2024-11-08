/* eslint-disable @next/next/no-img-element */
import {
  ChangeLocationStatusAPI,
  DeleteOneLocationAPI,
} from '@/api-site/locations';
import { useInputState } from '@/components/hooks';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import {
  Anvil,
  ArrowLeftRight,
  BadgeCheck,
  Droplets,
  Eye,
  Grid2X2,
  Hospital,
  MoreHorizontal,
  PencilIcon,
  Salad,
  TrashIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { CreateOrUpdateFattenings } from '../fattenings/create-or-update-fattenings';
import { CreateFeedings } from '../feedings/create-feedings';
import { BulkCreateTreatments } from '../treatments/bulk-create-treatments';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { ActionModalConfirmeDialog } from '../ui-setting/shadcn/action-modal-confirme-dialog';
import { Badge } from '../ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { AnimalsChangeLocations } from './change-animals-locations';
import { UpdateLocations } from './update-locations';

const ListLocations = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen, isConfirmOpen, setIsConfirmOpen } =
    useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isFeeding, setIsFeeding] = useState(false);
  const [isTreatment, setIsTreatment] = useState(false);
  const [isFattening, setIsFattening] = useState(false);
  const [isChangeLocation, setIsChangeLocation] = useState(false);

  const { isPending: loading, mutateAsync: deleteMutation } =
    DeleteOneLocationAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ locationId: item.id });
      AlertSuccessNotification({
        text: 'Location deleted successfully',
      });
      setIsOpen(false);
    } catch (error: any) {
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const { isPending: loadingConfirme, mutateAsync: saveMutation } =
    ChangeLocationStatusAPI();

  const changeItem = async (item: any) => {
    setIsConfirmOpen(true);
    try {
      await saveMutation({ locationId: item?.id });
      AlertSuccessNotification({
        text: 'Status changed successfully',
      });
      setIsConfirmOpen(false);
    } catch (error: any) {
      setIsConfirmOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const animalPerSquareMeter = Number(
    item?.squareMeter / item?._count?.animals,
  );

  return (
    <>
      <div
        key={index}
        className="relative overflow-hidden transition-allduration-200 bg-gray-100 rounded-xl hover:bg-gray-200"
      >
        <div className="p-6 lg:px-10 lg:py-8">
          <div className="flex space-x-32">
            <div className="justify-items-start mb-2">
              {item?.status ? (
                <Badge variant="secondary">
                  {t.formatMessage({ id: 'TABANIMAL.INSERVICE' })}
                </Badge>
              ) : (
                <Badge variant="destructive">
                  {t.formatMessage({
                    id: 'TABANIMAL.OUTSERVICE',
                  })}
                </Badge>
              )}
            </div>
            <div>
              {item?.productionPhase === 'GROWTH' &&
              item?.animalType?.name === 'Porciculture' &&
              animalPerSquareMeter < 0.15 ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mt-2">
                        <span className="relative flex size-4">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex size-4 rounded-full bg-red-500"></span>
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="dark:border-gray-800">
                      {t.formatMessage({ id: 'POPULATION.DENSITY' })}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : item?.productionPhase === 'FATTENING' &&
                item?.animalType?.name === 'Porciculture' &&
                animalPerSquareMeter < 0.65 ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mt-2">
                        <span className="relative flex size-4">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex size-4 rounded-full bg-red-500"></span>
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="dark:border-gray-800">
                      {t.formatMessage({ id: 'POPULATION.DENSITY' })}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : item?.productionPhase === 'REPRODUCTION' &&
                ['Ovins', 'Caprins'].includes(item?.animalType?.name) &&
                animalPerSquareMeter < 1.2 ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mt-2">
                        <span className="relative flex size-4">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex size-4 rounded-full bg-red-500"></span>
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="dark:border-gray-800">
                      {t.formatMessage({ id: 'POPULATION.DENSITY' })}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : item?.productionPhase === 'FATTENING' &&
                ['Ovins', 'Caprins'].includes(item?.animalType?.name) &&
                animalPerSquareMeter < 0.5 ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mt-2">
                        <span className="relative flex size-4">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex size-4 rounded-full bg-red-500"></span>
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="dark:border-gray-800">
                      {t.formatMessage({ id: 'POPULATION.DENSITY' })}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : item?.productionPhase === 'REPRODUCTION' &&
                item?.animalType?.name === 'Cuniculture' &&
                animalPerSquareMeter < 0.5 ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mt-2">
                        <span className="relative flex size-4">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex size-4 rounded-full bg-red-500"></span>
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="dark:border-gray-800">
                      {t.formatMessage({ id: 'POPULATION.DENSITY' })}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : item?.animalType?.name === 'Cuniculture' &&
                ['FATTENING', 'GROWTH'].includes(item?.productionPhase) &&
                animalPerSquareMeter < 0.07 ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mt-2">
                        <span className="relative flex size-4">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex size-4 rounded-full bg-red-500"></span>
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="dark:border-gray-800">
                      {t.formatMessage({ id: 'POPULATION.DENSITY' })}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <span className="relative flex size-4 text-black">
                          {item?._count?.animals}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="dark:border-gray-800">
                      {item?._count?.animals} {''}
                      {item?._count?.animals === 1
                        ? t.formatMessage({ id: 'LOCATION.ANIMAL' })
                        : t.formatMessage({ id: 'LOCATION.ANIMALS' })}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
          {item?.productionPhase !== 'FATTENING' ? (
            <div className="flex items-center justify-center space-x-2">
              <div>
                <h2 className="text-sm font-medium text-gray-500 h-4">
                  <h2 className="mt-2 flex items-center text-sm font-medium text-gray-500 h-4">
                    <Grid2X2 className="h-3.5 w-3.5  hover:shadow-xxl" />
                    Surface: {item?.squareMeter}m<sup>2</sup>
                  </h2>
                </h2>
                {['Pisciculture'].includes(item?.animalType?.name) ? (
                  ''
                ) : (
                  <>
                    <h2 className="mt-2 flex items-center text-sm font-medium text-gray-500 h-4">
                      <Salad className="h-3.5 w-3.5  hover:shadow-xxl" />
                      {t.formatMessage({ id: 'LOCATION.MANGERS' })}:{' '}
                      {item?.manger}
                    </h2>
                    <h2 className="mt-2 flex items-center text-sm font-medium text-gray-500 h-4">
                      <Droplets className="h-3.5 w-3.5  hover:shadow-xxl" />
                      {t.formatMessage({ id: 'LOCATION.THROUGHS' })}:{' '}
                      {item?.through}
                    </h2>
                  </>
                )}
              </div>
              <div className="flex-shrink-0 w-px h-20  bg-gray-200"></div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 h-8 sm:text-base lg:text-lg">
                  {(item?.code).toUpperCase()}
                </h3>
                {item?.productionPhase === 'GROWTH' ? (
                  <p className=" text-sm font-medium text-gray-500">
                    {t.formatMessage({ id: 'PRODUCTIONPHASE.GROWTH' })}
                  </p>
                ) : item?.productionPhase === 'FATTENING' ? (
                  <p className=" text-sm font-medium text-gray-500">
                    {t.formatMessage({ id: 'PRODUCTIONTYPE.FATTENING' })}
                  </p>
                ) : (
                  <p className=" text-sm font-medium text-gray-500">
                    {item?.productionPhase}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-1">
              <div>
                <h2 className="text-sm font-medium text-gray-500 h-4">
                  <h2 className="mt-2 flex items-center text-sm font-medium text-gray-500 h-4">
                    <Grid2X2 className="h-3.5 w-3.5  hover:shadow-xxl" />
                    Surface: {item?.squareMeter}m<sup>2</sup>
                  </h2>
                </h2>
                {['Pisciculture'].includes(item?.animalType?.name) ? (
                  ''
                ) : (
                  <>
                    <h2 className="mt-2 flex items-center text-sm font-medium text-gray-500 h-4">
                      <Salad className="h-3.5 w-3.5  hover:shadow-xxl" />
                      {t.formatMessage({ id: 'LOCATION.MANGERS' })}:{' '}
                      {item?.manger}
                    </h2>
                    <h2 className="mt-2 flex items-center text-sm font-medium text-gray-500 h-4">
                      <Droplets className="h-3.5 w-3.5  hover:shadow-xxl" />
                      {t.formatMessage({ id: 'LOCATION.THROUGHS' })}:{' '}
                      {item?.through}
                    </h2>
                  </>
                )}
              </div>
              <div className="flex-shrink-0 w-px h-20  bg-gray-200"></div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 h-8 sm:text-base lg:text-lg">
                  {(item?.code).toUpperCase()}
                </h3>
                {item?.productionPhase === 'GROWTH' ? (
                  <p className=" text-sm font-medium text-gray-500">
                    {t.formatMessage({ id: 'PRODUCTIONPHASE.GROWTH' })}
                  </p>
                ) : item?.productionPhase === 'FATTENING' ? (
                  <p className=" text-sm font-medium text-gray-500">
                    {t.formatMessage({ id: 'PRODUCTIONTYPE.FATTENING' })}
                  </p>
                ) : (
                  <p className=" text-sm font-medium text-gray-500">
                    {item?.productionPhase}
                  </p>
                )}
              </div>
            </div>
          )}

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
                <Link href={`/location/${item?.id}`}>
                  <DropdownMenuItem>
                    <Eye className="size-4 text-gray-600 hover:text-yellow-600" />
                    <span className="ml-2 cursor-pointer hover:text-yellow-600">
                      {t.formatMessage({ id: 'TABANIMAL.VIEW' })}
                    </span>
                  </DropdownMenuItem>
                </Link>
                {item?._count?.animals !== 0 ? (
                  <DropdownMenuItem onClick={() => setIsTreatment(true)}>
                    <Hospital className="size-4 text-gray-600 hover:text-lime-600" />
                    <span className="ml-2 cursor-pointer hover:text-lime-600">
                      {t.formatMessage({
                        id: 'ANIMALTYPE.CARE',
                      })}
                    </span>
                  </DropdownMenuItem>
                ) : (
                  ''
                )}
                {item?._count?.animals !== 0 ? (
                  <DropdownMenuItem onClick={() => setIsFeeding(true)}>
                    <Salad className="size-4 text-gray-600 hover:text-green-600" />
                    <span className="ml-2 cursor-pointer hover:text-green-600">
                      {t.formatMessage({
                        id: 'ANIMALTYPE.FEEDINGS',
                      })}
                    </span>
                  </DropdownMenuItem>
                ) : (
                  ''
                )}
                {item?._count?.animals !== 0 &&
                !['FATTENING', 'GESTATION'].includes(item?.productionPhase) ? (
                  <DropdownMenuItem onClick={() => setIsFattening(true)}>
                    <Anvil className="size-4 text-gray-600 hover:text-emerald-600" />
                    <span className="ml-2 cursor-pointer hover:text-emerald-600">
                      {t.formatMessage({ id: 'ANIMALTYPE.FATTENING' })}
                    </span>
                  </DropdownMenuItem>
                ) : (
                  ''
                )}
                {item?._count?.animals !== 0 ? (
                  <DropdownMenuItem onClick={() => setIsChangeLocation(true)}>
                    <ArrowLeftRight className="size-4 text-gray-600 hover:text-teal-600" />
                    <span className="ml-2 cursor-pointer hover:text-teal-600">
                      {t.formatMessage({ id: 'ANIMAL.MOVEMENT' })}
                    </span>
                  </DropdownMenuItem>
                ) : (
                  ''
                )}
                <DropdownMenuItem onClick={() => setIsEdit(true)}>
                  <PencilIcon className="size-4 text-gray-600 hover:text-cyan-600" />
                  <span className="ml-2 cursor-pointer hover:text-cyan-600">
                    {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                  </span>
                </DropdownMenuItem>
                {item?._count?.animals === 0 ? (
                  <DropdownMenuItem onClick={() => setIsConfirmOpen(true)}>
                    <BadgeCheck className="size-4 text-gray-600 hover:text-sky-600" />
                    <span className="ml-2 cursor-pointer hover:text-sky-400">
                      {t.formatMessage({ id: 'CHANGE.STATUS' })}
                    </span>
                  </DropdownMenuItem>
                ) : (
                  ''
                )}
                {item?._count?.animals === 0 ? (
                  <DropdownMenuItem onClick={() => setIsOpen(true)}>
                    <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                    <span className="ml-2 cursor-pointer hover:text-red-600">
                      {t.formatMessage({ id: 'TABANIMAL.DELETE' })}
                    </span>
                  </DropdownMenuItem>
                ) : (
                  ''
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <ActionModalDialog
        loading={loading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={() => deleteItem(item)}
      />
      <ActionModalConfirmeDialog
        loading={loadingConfirme}
        isConfirmOpen={isConfirmOpen}
        setIsConfirmOpen={setIsConfirmOpen}
        onClick={() => changeItem(item)}
      />
      <UpdateLocations
        location={item}
        showModal={isEdit}
        setShowModal={setIsEdit}
      />

      <CreateFeedings
        location={item}
        feeding={item}
        showModal={isFeeding}
        setShowModal={setIsFeeding}
      />
      <BulkCreateTreatments
        location={item}
        showModal={isTreatment}
        setShowModal={setIsTreatment}
      />
      <AnimalsChangeLocations
        location={item}
        showModal={isChangeLocation}
        setShowModal={setIsChangeLocation}
      />
      <CreateOrUpdateFattenings
        location={item}
        fattening={item?.animalTypeId}
        showModal={isFattening}
        setShowModal={setIsFattening}
      />
    </>
  );
};
export { ListLocations };
