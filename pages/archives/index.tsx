import { GetAnimalsAPI } from '@/api-site/animals';
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

import { PrivateComponent } from '@/components/util/private-component';
import { MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ListArchives } from './list-archives';

export function Archives() {
  const { t, search, handleSetSearch, userStorage } = useInputState();
  const { ref, inView } = useInView();

  const { back } = useRouter();

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
    status: 'ARCHIVED',
    sortBy: 'createdAt',
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
      <LayoutDashboard
        title={`${userStorage?.user?.profile?.firstName} ${userStorage?.user?.profile?.lastName} - Archives`}
      >
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
            <div className="mr-auto items-center gap-2"></div>
            <div className="ml-auto flex items-center gap-2">
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
              ) : Number(dataAnimals?.pages[0]?.data?.total_value) <= 0 ? (
                <ErrorFile
                  description={t.formatMessage({ id: 'ARCHIVES.EMPTY' })}
                />
              ) : (
                dataAnimals?.pages
                  .flatMap((page: any) => page?.data?.value)
                  .map((item: any, index: any) => (
                    <>
                      <ListArchives index={index} item={item} key={index} />
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
    </>
  );
}
export default PrivateComponent(Archives);
