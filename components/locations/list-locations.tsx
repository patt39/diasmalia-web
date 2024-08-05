/* eslint-disable @next/next/no-img-element */
import { DeleteOneIsolationAPI } from '@/api-site/isolations';
import { ChangeLocationStatusAPI } from '@/api-site/locations';
import { useInputState } from '@/components/hooks';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { ActionModalDialog } from '../ui-setting/shadcn';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Badge } from '../ui/badge';
import { CreateOrUpdateLocations } from './create-or-update-locations';
import { ViewIsolation } from './view-isolation';

const ListLocations = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, loading, setIsOpen, setLoading } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  const { mutateAsync: deleteMutation } = DeleteOneIsolationAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await deleteMutation({ isolationId: item.id });
      AlertSuccessNotification({
        text: 'Milking deleted successfully',
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
    setIsOpen(true);
    try {
      await saveMutation({ locationId: item?.id });
      AlertSuccessNotification({
        text: 'Status changed successfully',
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
        <div className="p-8 lg:px-10 lg:py-8">
          <div className="ml-36">
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
          <div className="flex items-center justify-start space-x-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500 h-4">
                sfce: {item.squareMeter}m
              </h2>
              <h2 className="mt-2 text-sm font-medium text-gray-500 h-4">
                mangers: {item.manger}
              </h2>
              <h2 className="mt-2 text-sm font-medium text-gray-500 h-4">
                throughs: {item.through}
              </h2>
              {['Piggery', 'Bovines', 'Rabbits', 'Goats'].includes(
                item.animalType?.name,
              ) ? (
                <h2 className="mt-2 text-sm font-medium text-gray-500 h-4">
                  animals: {item._count.animals}
                </h2>
              ) : (
                ''
              )}
            </div>
            <div className="flex-shrink-0 w-px h-20  bg-gray-200"></div>
            <div className="">
              <h3 className="text-sm font-bold text-gray-900 h-8 sm:text-base lg:text-lg">
                {(item?.code).toUpperCase()}
              </h3>
              <p className=" text-sm font-medium text-gray-500">
                {item?.productionPhase}
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
                <Button variant="ghost">
                  {t.formatMessage({
                    id: 'TABANIMAL.EDIT',
                  })}
                </Button>
                <Button variant="ghost" onClick={() => changeItem(item)}>
                  {t.formatMessage({
                    id: 'TABANIMAL.CHANGESTATUS',
                  })}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost">
                      {t.formatMessage({
                        id: 'TABANIMAL.DELETE',
                      })}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="dark:border-gray-800">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {t.formatMessage({ id: 'ALERT.TITLE' })}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {t.formatMessage({
                          id: 'ALERT.DESCRIPTION',
                        })}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        {t.formatMessage({
                          id: 'ALERT.CANCEL',
                        })}
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteItem(item)}>
                        {t.formatMessage({
                          id: 'ALERT.CONTINUE',
                        })}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
      <CreateOrUpdateLocations
        location={item}
        showModal={isEdit}
        setShowModal={setIsEdit}
      />
      <ViewIsolation
        isolation={item}
        showModal={isView}
        setShowModal={setIsView}
      />
    </>
  );
};
export { ListLocations };
