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
  BadgeCheck,
  Columns4,
  Container,
  Droplets,
  Egg,
  Grid2X2,
  MoreHorizontal,
  PencilIcon,
  Salad,
  Settings,
  TrashIcon,
  Waves,
} from 'lucide-react';
import { useState } from 'react';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { ActionModalConfirmeDialog } from '../ui-setting/shadcn/action-modal-confirme-dialog';
import { Badge } from '../ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { AvesParameters } from './aves-parameters';
import { AvesLocationParameters } from './list-location-parameters';
import { UpdateAvesLocations } from './update-aves-locations';

const ListAvesLocations = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen, isConfirmOpen, setIsConfirmOpen, userStorage } =
    useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isParameters, setIsParameters] = useState(false);
  const [isLocationParameters, setIsLocationParameters] = useState(false);

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

  const initialValue = 0;
  const sumQuantity = item?.animals.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator + currentValue.quantity,
    initialValue,
  );

  const animalPerSquareMeter = Number(sumQuantity / item?.squareMeter);

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
              item?.animalType?.name === 'Poulet de chair' &&
              animalPerSquareMeter > 20 ? (
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
              ) : item?.productionPhase === 'LAYING' &&
                item?.animalType?.name === 'Pondeuses' &&
                animalPerSquareMeter > 16 ? (
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
              ) : ['GROWTH', 'LAYING'].includes(item?.productionPhase) &&
                ['Dind', 'Canard'].includes(item?.animalType?.name) &&
                animalPerSquareMeter > 8 ? (
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
              ) : null}
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center justify-center space-x-2 cursor-pointer"
                  onClick={() => setIsParameters(true)}
                >
                  <div>
                    <h2 className="text-sm font-medium text-gray-500 h-4">
                      {item?.addCages === 'YES' &&
                      ['Pisciculture'].includes(item?.animalType?.name) ? (
                        <h2 className="mt-2 text-sm flex items-center font-medium text-gray-500 h-4">
                          <Container className="h-3.5 w-3.5  hover:shadow-xxl mr-1" />
                          {t.formatMessage({ id: 'TANK' })}: {item?.squareMeter}
                          m<sup>3</sup>
                        </h2>
                      ) : item?.addCages === 'NO' &&
                        ['Pisciculture'].includes(item?.animalType?.name) ? (
                        <h2 className="mt-2 text-sm flex items-center font-medium text-gray-500 h-4">
                          <Waves className="h-3.5 w-3.5  hover:shadow-xxl mr-1" />
                          {t.formatMessage({ id: 'POND' })}: {item?.squareMeter}
                          m<sup>3</sup>
                        </h2>
                      ) : (
                        <h2 className="mt-2 text-sm  items-center flex font-medium text-gray-500 h-4">
                          <Grid2X2 className="h-3.5 w-3.5  hover:shadow-xxl" />
                          Surface: {item?.squareMeter}m<sup>2</sup>
                        </h2>
                      )}
                    </h2>
                    {['Pisciculture'].includes(
                      item?.animalType?.name,
                    ) ? null : (
                      <>
                        <h2 className="mt-2 flex text-sm items-center font-medium text-gray-500 h-4">
                          <Salad className="h-3.5 w-3.5  hover:shadow-xxl" />
                          {t.formatMessage({ id: 'LOCATION.MANGERS' })}:{' '}
                          {item?.manger}
                        </h2>
                        <h2 className="mt-2 flex items-center text-sm font-medium text-gray-500 h-4">
                          <Droplets className="h-3.5 w-3.5  hover:shadow-xxl" />
                          {t.formatMessage({ id: 'LOCATION.THROUGHS' })}:{' '}
                          {item?.through}
                        </h2>
                        {item?.productionPhase === 'LAYING' &&
                        item?.addCages === 'NO' ? (
                          <h2 className="mt-2 text-sm flex items-center font-medium text-gray-500 h-4">
                            <Egg className="h-3.5 w-3.5  hover:shadow-xxl" />
                            {t.formatMessage({ id: 'LOCATION.NEST' })}:{' '}
                            {item?.nest}
                          </h2>
                        ) : item?.addCages === 'YES' &&
                          !['Canard', 'Pisciculture'].includes(
                            item?.animalType?.name,
                          ) ? (
                          <h2 className="mt-2 text-sm flex items-center font-medium text-gray-500 h-4">
                            <Columns4 className="h-3.5 w-3.5  hover:shadow-xxl" />
                            Cages: {item?.cages}
                          </h2>
                        ) : null}
                      </>
                    )}
                  </div>
                  <div className="flex-shrink-0 w-px h-20  bg-gray-200"></div>
                  <div className="">
                    <h3 className="text-sm font-bold text-gray-900 h-8 sm:text-base lg:text-lg">
                      {(item?.code).toUpperCase()}
                    </h3>
                    {item?.productionPhase === 'GROWTH' ? (
                      <p className=" text-sm font-medium text-gray-500">
                        {t.formatMessage({ id: 'PRODUCTIONPHASE.GROWTH' })}
                      </p>
                    ) : item?.productionPhase === 'LAYING' ? (
                      <p className=" text-sm font-medium text-gray-500">
                        {t.formatMessage({ id: 'PRODUCTIONPHASE.LAYING' })}
                      </p>
                    ) : (
                      <p className=" text-sm font-medium text-gray-500">
                        {t.formatMessage({ id: 'PRODUCTIONTYPE.FATTENING' })}
                      </p>
                    )}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.formatMessage({ id: 'CLICK.TOSEE' })} </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="grid grid-cols-1 mt-6 sm:mt-2 px-20 sm:grid-cols-2 xl:grid-cols-3 sm:gap-8 xl:gap-12">
            {userStorage?.role === 'SUPERADMIN' ? (
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
                <DropdownMenuContent
                  align="end"
                  className="dark:border-gray-800"
                >
                  <DropdownMenuItem onClick={() => setIsEdit(true)}>
                    <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                    <span className="ml-2 cursor-pointer hover:text-indigo-600">
                      {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                    </span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setIsLocationParameters(true)}
                  >
                    <Settings className="size-4 text-gray-600 hover:text-purple-600" />
                    <span className="ml-2 cursor-pointer hover:text-indigo-600">
                      Paramètres
                    </span>
                  </DropdownMenuItem>
                  {item?._count?.animals === 0 ? (
                    <DropdownMenuItem onClick={() => setIsConfirmOpen(true)}>
                      <BadgeCheck className="size-4 text-gray-600 hover:text-yellow-600 cursor-pointer" />
                      <span className="ml-2 cursor-pointer hover:text-yellow-400">
                        {t.formatMessage({ id: 'CHANGE.STATUS' })}
                      </span>
                    </DropdownMenuItem>
                  ) : null}
                  {item?._count?.animals === 0 ? (
                    <DropdownMenuItem onClick={() => setIsOpen(true)}>
                      <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                      <span className="ml-2 cursor-pointer hover:text-red-600">
                        {t.formatMessage({ id: 'TABANIMAL.DELETE' })}
                      </span>
                    </DropdownMenuItem>
                  ) : null}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="grid grid-cols-1 mt-6 sm:mt-2 px-20 sm:grid-cols-2 xl:grid-cols-3 sm:gap-8 xl:gap-12"></div>
            )}
          </div>
        </div>
      </div>
      <ActionModalDialog
        loading={loading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={() => deleteItem(item)}
      />
      {isConfirmOpen ? (
        <ActionModalConfirmeDialog
          loading={loadingConfirme}
          isConfirmOpen={isConfirmOpen}
          setIsConfirmOpen={setIsConfirmOpen}
          onClick={() => changeItem(item)}
        />
      ) : null}
      {isEdit ? (
        <UpdateAvesLocations
          location={item}
          showModal={isEdit}
          setShowModal={setIsEdit}
        />
      ) : null}
      {isParameters ? (
        <AvesParameters
          location={item}
          showModal={isParameters}
          setShowModal={setIsParameters}
        />
      ) : null}
      {isLocationParameters ? (
        <AvesLocationParameters
          location={item}
          showModal={isLocationParameters}
          setShowModal={setIsLocationParameters}
        />
      ) : null}
    </>
  );
};
export { ListAvesLocations };
