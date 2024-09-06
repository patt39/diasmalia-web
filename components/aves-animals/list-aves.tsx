/* eslint-disable @next/next/no-img-element */
import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
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
} from '@/utils';
import {
  ListCollapse,
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { Badge } from '../ui/badge';
import { UpdateAvesAnimals } from './update-aves';
import { ViewAvesAnimal } from './view-animal';

const ListAvesAnimals = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, loading, setIsOpen, setLoading } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);

  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: animalTypeId,
  });

  const { mutateAsync: deleteMutation } = DeleteOneAnimalAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await deleteMutation({ animalId: item.id });
      AlertSuccessNotification({
        text: 'Animal deleted successfully',
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

  return (
    <>
      <div
        key={index}
        className="relative overflow-hidden transition-allduration-200 bg-gray-100 rounded-xl hover:bg-gray-200"
      >
        <div className="p-6 lg:px-10 lg:py-8">
          <div className="ml-auto mb-4">
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
          <div className="flex items-center justify-start space-x-6">
            <div>
              <h2 className="text-sm font-medium text-gray-500 h-4">
                {t.formatMessage({ id: 'TABANIMAL.WEIGHT' })}: {item?.weight}kg
              </h2>
              <h2 className="mt-2 text-sm font-medium text-gray-500 h-4">
                Age: {formatDateDifference(item?.birthday)}
              </h2>
              <h2 className="mt-2 text-sm font-medium text-gray-500 h-4">
                {t.formatMessage({
                  id: 'LOCATION.ANIMALS',
                })}
                : {item?.quantity < 0 ? 0 : item?.quantity}
              </h2>
            </div>
            <div className="flex-shrink-0 w-px h-20  bg-gray-200"></div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 h-8 sm:text-base lg:text-lg">
                {(item?.code || item.electronicCode).toUpperCase()}
              </h3>
              {item?.productionPhase === 'GROWTH' ? (
                <p className=" text-sm font-medium text-gray-500">
                  {t.formatMessage({ id: 'PRODUCTIONPHASE.GROWTH' })}
                </p>
              ) : (
                <p className=" text-sm font-medium text-gray-500">
                  {t.formatMessage({ id: 'PRODUCTIONPHASE.LAYING' })}
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
                <DropdownMenuItem onClick={() => setIsEdit(true)}>
                  <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                  <span className="ml-2 cursor-pointer hover:text-indigo-600">
                    {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                  </span>
                </DropdownMenuItem>
                {!['Poulets de chaire'].includes(animalType?.name) ? (
                  <DropdownMenuItem onClick={() => setIsView(true)}>
                    <ListCollapse className="size-4 text-gray-600 hover:text-indigo-600" />
                    <span className="ml-2 cursor-pointer hover:text-indigo-600">
                      {t.formatMessage({ id: 'TABANIMAL.STATISTICS' })}
                    </span>
                  </DropdownMenuItem>
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
            <UpdateAvesAnimals
              animal={item}
              showModal={isEdit}
              setShowModal={setIsEdit}
            />
            <ViewAvesAnimal
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
export { ListAvesAnimals };
