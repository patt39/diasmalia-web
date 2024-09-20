/* eslint-disable @next/next/no-img-element */
import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { GetAnimalsAPI } from '@/api-site/animals';
import { useInputState } from '@/components/hooks';
import { ButtonLoadMore, SearchInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { Button } from '@/components/ui/button';
import { CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { ListFilter, Replace, ReplaceAll } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CreateAnimals } from './create-animal';
import { CreateBulkAnimals } from './create-bulk-animal';
import { ListAnimals } from './list-animals';

const TabAnimals = ({ animalTypeId }: { animalTypeId: string }) => {
  const { t, search, handleSetSearch, isOpen, setIsOpen } = useInputState();
  const { ref, inView } = useInView();
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [isBulkOpen, setIsBulkOpen] = useState<boolean>(false);
  const [productionPhase, setProductionPhase] = useState('');
  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: animalTypeId,
  });

  const {
    isLoading: isLoadingAnimals,
    isError: isErrorAnimals,
    data: dataAnimals,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetAnimalsAPI({
    search,
    gender,
    status,
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    productionPhase,
    animalTypeId: animalTypeId,
  });

  useEffect(() => {
    let fetching = false;
    if (inView) {
      fetchNextPage();
    }
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <>
      <CardHeader>
        <div className="flex items-center">
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
                    {dataAnimals?.pages[0]?.data?.total}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {dataAnimals?.pages[0]?.data?.total}{' '}
                    {dataAnimals?.pages[0]?.data?.total > 1
                      ? `${t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP.ANIMALS' })}`
                      : `${t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP.ANIMAL' })}`}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {['Caprins', 'Bovins', 'Porciculture', 'Cuniculture'].includes(
              animalType?.name,
            ) ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="dark:border-gray-80 cursor-pointer0 dark:border-gray-800"
                >
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {status ? (
                    <DropdownMenuCheckboxItem
                      checked
                      onClick={() => setStatus('')}
                      className="cursor-pointer"
                    >
                      {t.formatMessage({ id: 'ACTIVITY.FILTERALL' })}
                    </DropdownMenuCheckboxItem>
                  ) : gender ? (
                    <DropdownMenuCheckboxItem
                      checked
                      className="cursor-pointer"
                      onClick={() => setGender('')}
                    >
                      {t.formatMessage({ id: 'ACTIVITY.FILTERALL' })}
                    </DropdownMenuCheckboxItem>
                  ) : (
                    <DropdownMenuCheckboxItem
                      checked
                      className="cursor-pointer"
                      onClick={() => setProductionPhase('')}
                    >
                      {t.formatMessage({ id: 'ACTIVITY.FILTERALL' })}
                    </DropdownMenuCheckboxItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="cursor-pointer">
                      {t.formatMessage({ id: 'ANIMALTYPE.GENDER' })}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className=" dark:border-gray-800 cursor-pointer0">
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => setGender('MALE')}
                        >
                          {t.formatMessage({ id: 'ANIMAL.MALES' })}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => setGender('FEMALE')}
                        >
                          {t.formatMessage({ id: 'ANIMAL.FEMALES' })}
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="cursor-pointer">
                      {t.formatMessage({ id: 'TABWEANING.STATUS' })}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSeparator />
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className=" dark:border-gray-800">
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => setStatus('ACTIVE')}
                        >
                          {t.formatMessage({ id: 'ANIMAL.ACTIVE' })}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => setStatus('SOLD')}
                        >
                          {t.formatMessage({ id: 'ANIMAL.SOLD' })}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => setStatus('DEATH')}
                        >
                          {t.formatMessage({ id: 'ANIMAL.DEATH' })}
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="cursor-pointer">
                      {t.formatMessage({ id: 'TABFEEDING.PRODUCTIONPHASE' })}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className=" dark:border-gray-800">
                        <DropdownMenuItem
                          className="cursor-pointer dark:border-gray-800"
                          onClick={() => setProductionPhase('GROWTH')}
                        >
                          {t.formatMessage({ id: 'PRODUCTIONTYPE.GROWTH' })}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => setProductionPhase('FATTENING')}
                        >
                          {t.formatMessage({ id: 'ANIMALTYPE.FATTENING' })}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => setProductionPhase('GESTATIONS')}
                        >
                          Gestation
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => setProductionPhase('LACTATION')}
                        >
                          Lactation
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              ''
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    {t.formatMessage({ id: 'CREATION.TYPE' })}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:border-gray-800">
                <DropdownMenuCheckboxItem
                  className="cursor-pointer"
                  onClick={() => setIsOpen(true)}
                >
                  <Replace className="h-4 w-4  hover:shadow-xxl mr-1" />
                  {t.formatMessage({ id: 'ADD.AN.ANIMAL' })}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  className="cursor-pointer"
                  onClick={() => setIsBulkOpen(true)}
                >
                  <ReplaceAll className="h-4 w-4  hover:shadow-xxl mr-1" />
                  {t.formatMessage({ id: 'ADD.MANY.ANIMALS' })}
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <section className="mt-8 mb-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 xl:grid-cols-3 sm:gap-8 xl:gap-12">
            {isLoadingAnimals ? (
              <LoadingFile />
            ) : isErrorAnimals ? (
              <ErrorFile
                title="404"
                description="Error finding data please try again..."
              />
            ) : Number(dataAnimals?.pages[0]?.data?.total) <= 0 ? (
              <ErrorFile description="Don't have animals created yet please do" />
            ) : (
              dataAnimals?.pages
                .flatMap((page: any) => page?.data?.value)
                .map((item, index) => (
                  <>
                    <ListAnimals index={index} item={item} key={index} />
                  </>
                ))
            )}
            {hasNextPage && (
              <div className="mx-auto mt-4 justify-center text-center">
                <ButtonLoadMore
                  ref={ref}
                  isFetchingNextPage={isFetchingNextPage}
                  onClick={() => fetchNextPage()}
                />
              </div>
            )}
          </div>
        </div>
      </section>
      <CreateAnimals
        animal={animalTypeId}
        showModal={isOpen}
        setShowModal={setIsOpen}
      />
      <CreateBulkAnimals
        animal={animalTypeId}
        showModal={isBulkOpen}
        setShowModal={setIsBulkOpen}
      />
    </>
  );
};
export { TabAnimals };
