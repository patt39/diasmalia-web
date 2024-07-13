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
} from '@/utils';
import { MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-react';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { Badge } from '../ui/badge';

const ListAnimals = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, loading, setIsOpen, setLoading } = useInputState();

  const { mutateAsync: deleteMutation } = DeleteOneAnimalAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      console.log(item);
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
          <div className="ml-auto">
            {item?.status === 'ACTIVE' ? (
              <Badge variant="default">{item?.status}</Badge>
            ) : item?.status === 'SOLD' ? (
              <Badge variant="secondary">{item?.status}</Badge>
            ) : (
              <Badge variant="destructive">{item?.status}</Badge>
            )}
          </div>
          <div className="flex items-center justify-start space-x-6">
            <div>
              <h2 className="text-sm font-medium text-gray-500 h-4">
                {t.formatMessage({ id: 'TABANIMAL.WEIGHT' })} :{item?.weight}kg
              </h2>
              <h2 className="mt-2 text-sm font-medium text-gray-500 h-4">
                Age: {formatDateDifference(item?.birthday)}
              </h2>
              {![
                'Porciculture',
                'Bovines',
                'Cuniculture',
                'Caprins',
                'Ovins',
              ].includes(item.animalType?.name) ? (
                <h2 className="mt-2 text-sm font-medium text-gray-500 h-4">
                  {t.formatMessage({
                    id: 'TABINCUBATION.QTYSTART',
                  })}
                  : {item?.quantity < 0 ? 0 : item?.quantity}
                </h2>
              ) : (
                ''
              )}
            </div>
            <div className="flex-shrink-0 w-px h-20  bg-gray-200"></div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 h-8 sm:text-base lg:text-lg">
                {(item?.code || item.electronicCode).toUpperCase()}
              </h3>

              <p className=" text-sm font-medium text-gray-500">
                {item?.productionPhase}
              </p>
              <p className=" text-sm font-medium text-gray-500">
                {item?.gender}
              </p>
              {['Piggery', 'Bovines', 'Rabbits', 'Goats'].includes(
                item.animalType?.name,
              ) ? (
                <p className=" text-sm font-medium text-gray-500">
                  {item?.gender}
                </p>
              ) : (
                ''
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
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                  <span className="ml-2 cursor-pointer hover:text-indigo-600">
                    {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                  </span>
                </DropdownMenuItem>
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
          </div>
        </div>
      </div>
    </>
  );
};
export { ListAnimals };
