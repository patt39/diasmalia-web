/* eslint-disable @next/next/no-img-element */
import {
  ChangeLocationStatusAPI,
  DeleteOneLocationAPI,
  GetLocationsAPI,
} from '@/api-site/locations';
import { useInputState } from '@/components/hooks';
import { SearchInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
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
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { Fence, ListFilter, MoreHorizontal } from 'lucide-react';
import { useIntl } from 'react-intl';

const TabLocations = ({ animalTypeId }: { animalTypeId: string }) => {
  const t = useIntl();
  const {
    search,
    handleSetSearch,
    isOpen,
    setIsOpen,
    loading,
    setLoading,
    locale,
  } = useInputState();

  const {
    isLoading: isLoadingLocations,
    isError: isErrorLocations,
    data: datalocations,
  } = GetLocationsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    search,
    animalTypeId: animalTypeId,
  });

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

  const { mutateAsync: deleteMutation } = DeleteOneLocationAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await deleteMutation({ locationId: item?.id });
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

  return (
    <>
      <CardHeader>
        <div className="flex mb-4 items-center">
          <div className="mr-auto items-center gap-2">
            <SearchInput
              placeholder="Search by code"
              onChange={handleSetSearch}
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    {datalocations?.pages[0]?.data?.total}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {datalocations?.pages[0]?.data?.total}{' '}
                    {datalocations?.pages[0]?.data?.total > 1
                      ? `${t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP.LOCATIONS' })}`
                      : `${t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP.LOCATION' })}`}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuCheckboxItem>
                  {t.formatMessage({ id: 'PRODUCTIONTYPE.GROWTH' })}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  {t.formatMessage({ id: 'ANIMALTYPE.FATTENING' })}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  {t.formatMessage({
                    id: 'PRODUCTIONTYPE.REPRODUCTION',
                  })}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  {t.formatMessage({ id: 'ANIMALTYPE.GESTATIONS' })}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  {t.formatMessage({ id: 'PRODUCTIONTYPE.LACTATION' })}
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="h-8 gap-1">
              <Fence className="h-3.5 w-3.5  hover:shadow-xxl" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t.formatMessage({ id: 'ANIMALTYPE.LOCATION.CREATE' })}
              </span>
            </Button>
          </div>
        </div>
        <div className="mr-auto mb-8 items-center gap-2">
          <CardDescription>
            {t.formatMessage({ id: 'ANIMALTYPE.LOCATION.DESCRIPTION' })}
          </CardDescription>
        </div>
      </CardHeader>
      <section className="mt-8 mb-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 xl:grid-cols-3 sm:gap-8 xl:gap-12">
            {isLoadingLocations ? (
              <LoadingFile />
            ) : isErrorLocations ? (
              <ErrorFile
                title="404"
                description="Error finding data please try again..."
              />
            ) : Number(datalocations?.pages[0]?.data?.total) <= 0 ? (
              <ErrorFile description="Don't have locations created yet please do" />
            ) : (
              datalocations?.pages
                .flatMap((page: any) => page?.data?.value)
                .map((item, index) => (
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
                            {[
                              'Piggery',
                              'Bovines',
                              'Rabbits',
                              'Goats',
                            ].includes(item.animalType?.name) ? (
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
                            <DropdownMenuContent
                              align="end"
                              className="dark:border-gray-800"
                            >
                              <Button variant="ghost">
                                {t.formatMessage({
                                  id: 'TABANIMAL.EDIT',
                                })}
                              </Button>
                              <Button
                                variant="ghost"
                                onClick={() => changeItem(item)}
                              >
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
                                    <AlertDialogAction
                                      onClick={() => deleteItem(item)}
                                    >
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
                  </>
                ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default TabLocations;
