import { GetOneAnimalAPI } from '@/api-site/animals';
import { GetBreedingHistoryAPI } from '@/api-site/breedings';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';

import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { ButtonInput, ButtonLoadMore } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CardHeader } from '@/components/ui/card';
import { PrivateComponent } from '@/components/util/private-component';
import { formatDateDDMMYY } from '@/utils';
import { MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export function Faq() {
  const { t } = useInputState();
  const { ref, inView } = useInView();
  const { query, back } = useRouter();
  const animalId = String(query?.animalId);

  const { data: getOneAnimal } = GetOneAnimalAPI({
    animalId: animalId,
  });

  const {
    isLoading: isLoadingHistory,
    isError: isErrorHistory,
    data: dataHistory,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetBreedingHistoryAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    animalId: animalId,
    animalTypeId: getOneAnimal?.animalTypeId,
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
      <LayoutDashboard title={`${getOneAnimal?.code} breeding history`}>
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
            <div className="ml-80 flex flex-col items-center gap-1 text-center">
              <h4 className="mx-auto text-2xl font-semibold text-zinc-600 tracking-tight text-center">
                {t.formatMessage({ id: 'REPRODUCTION.CAREER' })}{' '}
                {getOneAnimal?.code}
              </h4>
            </div>
          </div>
        </CardHeader>
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {isLoadingHistory ? (
              <LoadingFile />
            ) : isErrorHistory ? (
              <ErrorFile
                title="404"
                description="Error finding data please try again..."
              />
            ) : Number(dataHistory?.pages[0]?.data?.total) <= 0 ? (
              <ErrorFile
                description={t.formatMessage({ id: 'BREEDING.EMPTY' })}
              />
            ) : (
              dataHistory?.pages
                .flatMap((page: any) => page?.data?.value)
                .map((item, index) => (
                  <>
                    <Accordion type="single" collapsible key={index}>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          {t.formatMessage({ id: 'BREEDING.DATE' })}:{' '}
                          {formatDateDDMMYY(item?.createdAt)}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="mb-4">
                            <div>Male: {item?.maleCode} </div>
                            <div>Female: {item?.femaleCode} </div>
                            <div>
                              {t.formatMessage({ id: 'RESULT' })}:{' '}
                              {item?.result === 'PREGNANT'
                                ? t.formatMessage({ id: 'BREEDING.POSITIVE' })
                                : t.formatMessage({ id: 'BREEDING.NEGATIVE' })}
                            </div>
                            <div> Method: {item?.method.toLowerCase()}</div>
                            <div> Note: {item?.note}</div>
                          </div>
                          {item?.weaning !== null ? (
                            <>
                              <h4 className="my-2 text-sm font-bold tracking-tight">
                                {t.formatMessage({ id: 'FARROWING' })}
                              </h4>
                              <div className="mb-4">
                                <div>
                                  Date:{' '}
                                  {formatDateDDMMYY(
                                    item?.weaning?.farrowing?.createdAt,
                                  )}
                                </div>
                                <div>
                                  {t.formatMessage({
                                    id: 'TABFARROWING.LITTER',
                                  })}
                                  : {item?.weaning?.farrowing?.litter}
                                </div>
                                <div>
                                  Note: {item?.weaning?.farrowing?.note}
                                </div>
                              </div>
                            </>
                          ) : (
                            ''
                          )}
                          {item?.weaning !== null ? (
                            <>
                              <h4 className="my-2 text-sm font-bold tracking-tight">
                                {t.formatMessage({ id: 'WEANING' })}{' '}
                              </h4>
                              <div className="mb-4">
                                <div>
                                  Date:{' '}
                                  {formatDateDDMMYY(item?.weaning?.createdAt)}{' '}
                                </div>
                                <div>
                                  {' '}
                                  {t.formatMessage({
                                    id: 'TABFARROWING.LITTER',
                                  })}
                                  : {item?.weaning?.litter}{' '}
                                </div>
                              </div>
                            </>
                          ) : (
                            ''
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
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
          </main>
          <DashboardFooter />
        </div>
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Faq);
