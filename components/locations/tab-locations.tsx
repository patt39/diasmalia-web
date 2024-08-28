/* eslint-disable @next/next/no-img-element */
import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { GetLocationsAPI } from '@/api-site/locations';
import { useInputState } from '@/components/hooks';
import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader } from '@/components/ui/card';
import { Fence, ListFilter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ButtonLoadMore, SearchInput } from '../ui-setting';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { CreateLocations } from './create-locations';
import { ListLocations } from './list-locations';

const TabLocations = ({ animalTypeId }: { animalTypeId: string }) => {
  const { ref, inView } = useInView();
  const [isOpen, setIsOpen] = useState(false);
  const { t, search, handleSetSearch } = useInputState();

  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: animalTypeId,
  });

  const {
    isLoading: isLoadingLocations,
    isError: isErrorLocations,
    data: datalocations,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetLocationsAPI({
    search,
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
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
            {['Caprins', 'Bovins', 'Porciculture', 'Cuniculture'].includes(
              animalType?.name,
            ) ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="dark:border-gray-800"
                >
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem>
                    {t.formatMessage({ id: 'PRODUCTIONTYPE.GROWTH' })}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    {t.formatMessage({ id: 'ANIMALTYPE.FATTENING' })}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    {t.formatMessage({ id: 'ANIMALTYPE.GESTATIONS' })}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    {t.formatMessage({ id: 'PRODUCTIONTYPE.LACTATION' })}
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              ''
            )}

            <Button
              size="sm"
              className="h-8 gap-1"
              onClick={() => setIsOpen(true)}
            >
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
                    <ListLocations key={index} item={item} index={index} />
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
      <CreateLocations
        location={animalTypeId}
        showModal={isOpen}
        setShowModal={setIsOpen}
      />
    </>
  );
};
export { TabLocations };