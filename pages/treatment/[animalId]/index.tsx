import { GetOneAnimalAPI } from '@/api-site/animals';
import { GetTreatmentsAPI } from '@/api-site/treatment';
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
    isLoading: isLoadingTreatments,
    isError: isErrorTreatments,
    data: dataTreatments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetTreatmentsAPI({
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
      <LayoutDashboard title={`${getOneAnimal?.code} treatments`}>
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
          </div>
        </CardHeader>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-col items-center gap-1 text-center">
            {[
              'Porciculture',
              'Bovins',
              'Cuniculture',
              'Caprins',
              'Ovins',
            ].includes(getOneAnimal?.animalType?.name) ? (
              <h4 className="mt-8 text-2xl font-bold tracking-tight text-center">
                {t.formatMessage({ id: 'TREATMENT.PAGE' })}
              </h4>
            ) : (
              <h4 className="mt-8 text-2xl font-bold tracking-tight text-center">
                {t.formatMessage({ id: 'AVES.TREATMENT.PAGE' })}
              </h4>
            )}
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {isLoadingTreatments ? (
              <LoadingFile />
            ) : isErrorTreatments ? (
              <ErrorFile
                title="404"
                description="Error finding data please try again..."
              />
            ) : Number(dataTreatments?.pages[0]?.data?.total) <= 0 ? (
              <ErrorFile
                description={t.formatMessage({ id: 'TREATMENT.EMPTY' })}
              />
            ) : (
              dataTreatments?.pages
                .flatMap((page: any) => page?.data?.value)
                .map((item, index) => (
                  <>
                    <Accordion type="single" collapsible key={index}>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>{item?.name}</AccordionTrigger>
                        <AccordionContent>
                          <div>Date: {formatDateDDMMYY(item?.createdAt)} </div>
                          <div>
                            Medication: {item?.medication.toLowerCase()}{' '}
                          </div>
                          <div> Dose: {item?.dose} </div>
                          <div> Voie: {item?.method.toLowerCase()}</div>
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
