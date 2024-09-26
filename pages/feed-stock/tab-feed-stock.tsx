import { GetAssignedTypesAPI } from '@/api-site/assigned-type';
import { GetFeedStockAPI } from '@/api-site/feed-stock';
import { useInputState } from '@/components/hooks';
import { ButtonLoadMore } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Salad } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CreateOrUpdateFeedStock } from './create-or-update-feed-stock';
import { ListFeedStock } from './list-feed-stock';

const TabFeedStock = () => {
  const {
    isLoading: isLoadingAssignedTypes,
    isError: isErrorAssignedTypes,
    data: dataAssignedTypes,
  } = GetAssignedTypesAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
  });

  const [animalTypeName, setAnimalTypeName] = useState(
    dataAssignedTypes?.pages[0]?.data?.value[0].animalType?.name,
  );
  const { ref, inView } = useInView();
  const { t, isOpen, setIsOpen } = useInputState();

  const {
    isLoading: isLoadingFeedStock,
    isError: isErrorFeedStock,
    data: dataFeedStock,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetFeedStockAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    animalTypeName,
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
      <Tabs
        defaultValue={
          dataAssignedTypes?.pages[0]?.data?.value[0].animalType?.name
        }
      >
        <div className="flex items-center dark:border-gray-800">
          <TabsList>
            {isLoadingAssignedTypes ? (
              <LoadingFile />
            ) : isErrorAssignedTypes ? (
              <ErrorFile description="Error finding data please try again..." />
            ) : Number(dataAssignedTypes?.pages[0]?.data?.total) <= 0 ? (
              ''
            ) : (
              dataAssignedTypes?.pages
                .flatMap((page: any) => page?.data?.value)
                .map((item, index) => (
                  <>
                    <TabsTrigger
                      key={index}
                      value={item?.animalType?.name}
                      onClick={() => setAnimalTypeName(item?.animalType?.name)}
                    >
                      {item?.animalType?.name}
                    </TabsTrigger>
                  </>
                ))
            )}
          </TabsList>
        </div>
        {isLoadingAssignedTypes ? (
          <LoadingFile />
        ) : isErrorAssignedTypes ? (
          <ErrorFile description="Error finding data please try again..." />
        ) : Number(dataAssignedTypes?.pages[0]?.data?.total) <= 0 ? (
          ''
        ) : (
          dataAssignedTypes?.pages
            .flatMap((page: any) => page?.data?.value)
            .map((item, index) => (
              <>
                <TabsContent value={item?.animalType?.name} key={index}>
                  <Card
                    x-chunk="dashboard-05-chunk-3"
                    className=" dark:border-gray-800"
                  >
                    <CardHeader>
                      <div className="flex items-center">
                        <div className="ml-auto flex items-center gap-2">
                          <Button
                            size="sm"
                            className="h-8 gap-1"
                            onClick={() => setIsOpen(true)}
                          >
                            <Salad className="h-3.5 w-3.5  hover:shadow-xxl" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                              {t.formatMessage({ id: 'ADD.STOCK' })}
                            </span>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <section className="mt-8 mb-20">
                      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 xl:grid-cols-3 sm:gap-8 xl:gap-12">
                          {isLoadingFeedStock ? (
                            <LoadingFile />
                          ) : isErrorFeedStock ? (
                            <ErrorFile
                              title="404"
                              description="Error finding data please try again..."
                            />
                          ) : Number(dataFeedStock?.pages[0]?.data?.total) <=
                            0 ? (
                            <ErrorFile
                              description={t.formatMessage({
                                id: 'FEEDSTOCK.EMPTY',
                              })}
                            />
                          ) : (
                            dataFeedStock?.pages
                              .flatMap((page: any) => page?.data?.value)
                              .map((item: any, index: any) => (
                                <>
                                  <ListFeedStock
                                    index={index}
                                    item={item}
                                    key={index}
                                  />
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
                  </Card>
                </TabsContent>
              </>
            ))
        )}
        <CreateOrUpdateFeedStock showModal={isOpen} setShowModal={setIsOpen} />
      </Tabs>
    </>
  );
};
export { TabFeedStock };
