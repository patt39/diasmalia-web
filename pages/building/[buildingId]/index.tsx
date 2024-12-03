import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import {
  ButtonInput,
  ButtonLoadMore,
  SearchInput,
} from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { CardHeader } from '@/components/ui/card';

import { GetOneBuildingAPI } from '@/api-site/buildings';
import { GetLocationsAPI } from '@/api-site/locations';
import { CreateBulkLocations } from '@/components/locations/bulk-create-locations';
import { CreateLocations } from '@/components/locations/create-locations';
import { ListLocations } from '@/components/locations/list-locations';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PrivateComponent } from '@/components/util/private-component';
import { MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export function ViewBuilding() {
  const { t, search, handleSetSearch, userStorage, isOpen, setIsOpen } =
    useInputState();
  const { ref, inView } = useInView();
  const [isBulkOpen, setIsBulkOpen] = useState<boolean>(false);
  const { query, back } = useRouter();
  const buildingId = String(query?.buildingId);
  const { data: getOneBuilding } = GetOneBuildingAPI({
    buildingId: buildingId,
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
    buildingId: buildingId,
    animalTypeId: getOneBuilding?.animalTypeId,
    organizationId: userStorage?.organizationId,
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
      <LayoutDashboard title={`Building - ${getOneBuilding?.code}`}>
        <CardHeader>
          <div className="flex mb-4 items-center">
            <ButtonInput
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                back();
              }}
              icon={<MoveLeftIcon className="size-4" />}
            >
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t.formatMessage({ id: 'UTIL.COME_BACK' })}
              </span>
            </ButtonInput>
            <h4 className="text-xl text-zinc-950  font-bold ml-auto">
              {t.formatMessage({ id: 'BUILDING' })}{' '}
              {getOneBuilding?.code?.toUpperCase()}
            </h4>
            <div className="ml-auto flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      {datalocations?.pages[0]?.data?.animals}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t.formatMessage({ id: 'ANIMALS.AVAILABLE' })}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
                      {getOneBuilding?.animalType?.name === 'Porciculture'
                        ? t.formatMessage({ id: 'LOGE' })
                        : getOneBuilding?.animalType?.name === 'Cuniculture'
                          ? t.formatMessage({ id: 'HUTCHE' })
                          : getOneBuilding?.animalType?.name === 'Bovins'
                            ? t.formatMessage({ id: 'STABLE' })
                            : t.formatMessage({ id: 'PEN' })}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <SearchInput
                placeholder="Search by code"
                onChange={handleSetSearch}
              />
            </div>
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
                <ErrorFile
                  description={t.formatMessage({ id: 'BUILDING.EMPTY' })}
                />
              ) : (
                datalocations?.pages
                  .flatMap((page: any) => page?.data?.value)
                  .map((item: any, index: any) => (
                    <>
                      <ListLocations index={index} item={item} key={index} />
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
        {isOpen ? (
          <CreateLocations
            location={getOneBuilding?.animalTypeId}
            showModal={isOpen}
            setShowModal={setIsOpen}
          />
        ) : null}
        {isBulkOpen ? (
          <CreateBulkLocations
            building={getOneBuilding?.animalTypeId}
            showModal={isBulkOpen}
            setShowModal={setIsBulkOpen}
          />
        ) : null}
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(ViewBuilding);
