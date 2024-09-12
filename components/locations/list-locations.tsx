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
  Eye,
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';
import { useState } from 'react';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { ActionModalConfirmeDialog } from '../ui-setting/shadcn/action-modal-confirme-dialog';
import { Badge } from '../ui/badge';
import { UpdateLocations } from './update-locations';
import { ViewLocation } from './view-location';

const ListLocations = ({ item, index }: { item: any; index: number }) => {
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
  const [isView, setIsView] = useState(false);

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

  return (
    <>
      <div
        key={index}
        className="relative overflow-hidden transition-allduration-200 bg-gray-100 rounded-xl hover:bg-gray-200"
      >
        <div className="p-6 lg:px-10 lg:py-8">
          <div className="mb-4">
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

              {[
                'Pisciculture',
                'Poulets Goliaths',
                'Pondeuses',
                'Poulet de chair',
                'Pintarde',
                'Canard',
                'Poulets Brahma',
                'Dinde',
              ].includes(item?.animalType?.name) ? (
                ''
              ) : (
                <h2 className="mt-2 text-sm font-medium text-gray-500 h-4 space-x-2">
                  {item?._count?.animals === 1
                    ? t.formatMessage({ id: 'LOCATION.ANIMAL' })
                    : t.formatMessage({ id: 'LOCATION.ANIMALS' })}
                  : {item?._count?.animals}
                </h2>
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
              ) : item?.productionPhase === 'REPRODUCTION' ? (
                <p className=" text-sm font-medium text-gray-500">
                  {item?.productionPhase}
                </p>
              ) : item?.productionPhase === 'GESTATION' ? (
                <p className=" text-sm font-medium text-gray-500">
                  {item?.productionPhase}
                </p>
              ) : item?.productionPhase === 'LAYING' ? (
                <p className=" text-sm font-medium text-gray-500">
                  {t.formatMessage({ id: 'PRODUCTIONPHASE.LAYING' })}
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
                {item._count?.animals !== 1 ? (
                  <DropdownMenuItem onClick={() => setIsEdit(true)}>
                    <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                    <span className="ml-2 cursor-pointer hover:text-indigo-600">
                      {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                    </span>
                  </DropdownMenuItem>
                ) : (
                  ''
                )}
                {['FATTENING', 'GROWTH'].includes(item?.productionPhase) &&
                ![
                  'Pisciculture',
                  'Poulets Goliaths',
                  'Pondeuses',
                  'Poulet de chair',
                  'Pintarde',
                  'Canard',
                  'Poulets Brahma',
                  'Dinde',
                ].includes(item?.animalType?.name) &&
                item?._count?.animals >= 1 ? (
                  <DropdownMenuItem onClick={() => setIsView(true)}>
                    <Eye className="size-4 text-gray-600 hover:text-indigo-600" />
                    <span className="ml-2 cursor-pointer hover:text-indigo-600">
                      {t.formatMessage({ id: 'TABANIMAL.VIEW' })}
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
                <DropdownMenuItem onClick={() => setIsOpen(true)}>
                  <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                  <span className="ml-2 cursor-pointer hover:text-red-600">
                    {t.formatMessage({ id: 'TABANIMAL.DELETE' })}
                  </span>
                </DropdownMenuItem>
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
      <UpdateLocations
        location={item}
        showModal={isEdit}
        setShowModal={setIsEdit}
      />
      <ViewLocation
        location={item}
        showModal={isView}
        setShowModal={setIsView}
      />
    </>
  );
};
export { ListLocations };
