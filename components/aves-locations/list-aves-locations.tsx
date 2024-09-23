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
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
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
import { UpdateGrowthLocations } from './update-growth-locations';
import { UpdateLayingLocations } from './update-laying-locations';

const ListAvesLocations = ({ item, index }: { item: any; index: number }) => {
  const {
    t,
    isOpen,
    loading,
    setIsOpen,
    setLoading,
    isConfirmOpen,
    setIsConfirmOpen,
  } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isGrowthEdit, setIsGrowthEdit] = useState(false);

  const { mutateAsync: deleteMutation } = DeleteOneLocationAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await deleteMutation({ locationId: item.id });
      AlertSuccessNotification({
        text: 'Location deleted successfully',
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const { mutateAsync: saveMutation } = ChangeLocationStatusAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const changeItem = async (item: any) => {
    setLoading(true);
    setIsConfirmOpen(true);
    try {
      await saveMutation({ locationId: item?.id });
      AlertSuccessNotification({
        text: 'Status changed successfully',
      });
      setLoading(false);
      setIsConfirmOpen(false);
    } catch (error: any) {
      setLoading(false);
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
  console.log('animalPerSquareMeter ==>', animalPerSquareMeter);

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
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500 h-4">
                {['Pisciculture'].includes(item?.animalType?.name) ? (
                  <h2 className="mt-2 text-sm font-medium text-gray-500 h-4">
                    Volume: {item?.squareMeter}m<sup>3</sup>
                  </h2>
                ) : (
                  <h2 className="mt-2 text-sm font-medium text-gray-500 h-4">
                    Surface: {item?.squareMeter}m<sup>2</sup>
                  </h2>
                )}
              </h2>
              {['Pisciculture'].includes(item?.animalType?.name) ? (
                ''
              ) : (
                <>
                  <h2 className="mt-2 text-sm font-medium text-gray-500 h-4">
                    {t.formatMessage({ id: 'LOCATION.MANGERS' })}:{' '}
                    {item?.manger}
                  </h2>
                  <h2 className="mt-2 text-sm font-medium text-gray-500 h-4">
                    {t.formatMessage({ id: 'LOCATION.THROUGHS' })}:{' '}
                    {item?.through}
                  </h2>
                  {item?.productionPhase === 'LAYING' ? (
                    <h2 className="mt-2 text-sm font-medium text-gray-500 h-4">
                      {t.formatMessage({ id: 'LOCATION.NEST' })}: {item?.nest}
                    </h2>
                  ) : (
                    ''
                  )}
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
              ) : (
                <p className=" text-sm font-medium text-gray-500">
                  {item?.productionPhase}
                </p>
              )}
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
                {item?.productionPhase === 'LAYING' ? (
                  <DropdownMenuItem onClick={() => setIsEdit(true)}>
                    <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                    <span className="ml-2 cursor-pointer hover:text-indigo-600">
                      {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                    </span>
                  </DropdownMenuItem>
                ) : item?.productionPhase === 'GROWTH' ? (
                  <DropdownMenuItem onClick={() => setIsGrowthEdit(true)}>
                    <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                    <span className="ml-2 cursor-pointer hover:text-indigo-600">
                      {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                    </span>
                  </DropdownMenuItem>
                ) : (
                  ''
                )}
                <DropdownMenuItem onClick={() => setIsConfirmOpen(true)}>
                  <BadgeCheck className="size-4 text-gray-600 hover:text-red-400 cursor-pointer" />
                  <span className="ml-2 cursor-pointer hover:text-red-400">
                    {t.formatMessage({ id: 'CHANGE.STATUS' })}
                  </span>
                </DropdownMenuItem>
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
        loading={loading}
        isConfirmOpen={isConfirmOpen}
        setIsConfirmOpen={setIsConfirmOpen}
        onClick={() => changeItem(item)}
      />
      <UpdateLayingLocations
        location={item}
        showModal={isEdit}
        setShowModal={setIsEdit}
      />
      <UpdateGrowthLocations
        location={item}
        showModal={isGrowthEdit}
        setShowModal={setIsGrowthEdit}
      />
    </>
  );
};
export { ListAvesLocations };
