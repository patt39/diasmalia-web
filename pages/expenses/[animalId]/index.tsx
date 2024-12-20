import { GetOneAnimalAPI } from '@/api-site/animals';
import { GetFinancesAPI } from '@/api-site/finances';
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
import { firstLetterToUpperCase } from '@/utils/utils';
import { MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export function Expenses() {
  const { t, userStorage } = useInputState();
  const { ref, inView } = useInView();
  const { query, back } = useRouter();
  const animalId = String(query?.animalId);

  const { data: getOneAnimal } = GetOneAnimalAPI({
    animalId: animalId,
  });

  const {
    isLoading: isLoadingFinances,
    isError: isErrorFinances,
    data: dataFinances,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetFinancesAPI({
    take: 10,
    sort: 'desc',
    type: 'EXPENSE',
    sortBy: 'createdAt',
    animalId: getOneAnimal?.id,
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
      <LayoutDashboard title={`${getOneAnimal?.code} - treatments`}>
        <CardHeader>
          <div className="flex">
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
            <div className="flex items-center">
              <div className="ml-60 flex flex-col items-center gap-1 text-center">
                <h4 className="ml-20  text-2xl font-bold text-zinc-600">
                  {t.formatMessage({ id: 'EXPENSE.HISTORY' })}
                </h4>
              </div>
            </div>
          </div>
        </CardHeader>
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {isLoadingFinances ? (
              <LoadingFile />
            ) : isErrorFinances ? (
              <ErrorFile
                title="404"
                description="Error finding data please try again..."
              />
            ) : Number(dataFinances?.pages[0]?.data?.total) <= 0 ? (
              <ErrorFile description="Don't have expenses yet" />
            ) : (
              dataFinances?.pages
                .flatMap((page: any) => page?.data?.value)
                .map((item, index) => (
                  <>
                    <Accordion type="single" collapsible key={index}>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          {formatDateDDMMYY(item?.createdAt)}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div>{item?.detail} </div>
                          <div className="font-bold mt-2">
                            Amount:{' '}
                            {Number(
                              String(item?.amount).slice(1),
                            ).toLocaleString('en-US')}{' '}
                            {userStorage?.profile?.currency?.symbol}
                          </div>
                          <div className="mt-2">
                            Par:{' '}
                            {firstLetterToUpperCase(
                              userStorage?.profile?.firstName,
                            )}{' '}
                            {firstLetterToUpperCase(
                              userStorage?.profile?.lastName,
                            )}
                          </div>
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
            <div className="font-bold mt-2 ml-auto mr-10">
              {t.formatMessage({ id: 'EXPENSE.TOTAL' })}:{' '}
              {Number(
                String(getOneAnimal?.totalExpenses ?? 0).slice(1),
              ).toLocaleString('en-US')}{' '}
              {userStorage?.profile?.currency?.symbol}
            </div>
          </main>
          <DashboardFooter />
        </div>
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Expenses);
