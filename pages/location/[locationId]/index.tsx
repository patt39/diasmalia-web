import { GetAnimalsAPI } from '@/api-site/animals';
import { GetOneLocationAPI } from '@/api-site/locations';
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

import { CreateBulkAnimals } from '@/components/animals/create-bulk-animal';
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
import { LocationList } from './location-list';

export function ViewLocation() {
  const { t, search, handleSetSearch, userStorage } = useInputState();
  const { ref, inView } = useInView();
  const [isBulkOpen, setIsBulkOpen] = useState<boolean>(false);

  const { query, back } = useRouter();
  const locationId = String(query?.locationId);
  const { data: getOneLocation } = GetOneLocationAPI({
    locationId: locationId,
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
    take: 10,
    sort: 'desc',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    locationId: locationId,
    animalTypeId: getOneLocation?.animalTypeId,
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
      <LayoutDashboard title={`Location - ${getOneLocation?.code}`}>
        <CardHeader>
          <div className="flex items-center">
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
            <h4 className="text-xl text-zinc-950 font-bold text-center ml-96">
              {getOneLocation?.animalType?.name === 'Porciculture'
                ? t.formatMessage({ id: 'LOGE' })
                : getOneLocation?.animalType?.name === 'Cuniculture'
                  ? t.formatMessage({ id: 'HUTCHE' })
                  : getOneLocation?.animalType?.name === 'Bovins'
                    ? t.formatMessage({ id: 'STABLE' })
                    : t.formatMessage({ id: 'PEN' })}{' '}
              {getOneLocation?.code.toUpperCase()}
            </h4>
            <div className="ml-auto flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      {getOneLocation?.sumMales}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                      {getOneLocation?.sumMales}{' '}
                      {t.formatMessage({ id: 'ANIMAL.MALES' })}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      {getOneLocation?.sumFemales}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                      {getOneLocation?.sumFemales}{' '}
                      {t.formatMessage({ id: 'ANIMAL.FEMALES' })}
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
              {isLoadingAnimals ? (
                <LoadingFile />
              ) : isErrorAnimals ? (
                <ErrorFile
                  title="404"
                  description="Error finding data please try again..."
                />
              ) : Number(dataAnimals?.pages[0]?.data?.total) <= 0 ? (
                <ErrorFile
                  description={t.formatMessage({ id: 'LOCATION.EMPTY' })}
                />
              ) : (
                dataAnimals?.pages
                  .flatMap((page: any) => page?.data?.value)
                  .map((item: any, index: any) => (
                    <>
                      <LocationList index={index} item={item} key={index} />
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
      </LayoutDashboard>
      {isBulkOpen ? (
        <CreateBulkAnimals
          location={getOneLocation}
          showModal={isBulkOpen}
          setShowModal={setIsBulkOpen}
        />
      ) : null}
    </>
  );
}
export default PrivateComponent(ViewLocation);
