import { GetOneAnimalAPI } from '@/api-site/animals';
import { GetOneFarrowingByAnimalIdAPI } from '@/api-site/farrowings';
import { GetOneFatteningAPI } from '@/api-site/fattenings';
import { GetTreatmentsAPI } from '@/api-site/treatment';

import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { ButtonLoadMore } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatDateDDMMYY, formatWeight } from '@/utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useIntl } from 'react-intl';

export function AnimalSaleProfile() {
  const { query, back } = useRouter();
  const { ref, inView } = useInView();
  const animalId = String(query?.animalId);
  const t = useIntl();
  const { data: getOneAnimal } = GetOneAnimalAPI({
    animalId: animalId,
  });
  const { data: getOneFattening } = GetOneFatteningAPI({
    animalId: animalId,
  });
  const { data: getOneFarrowing } = GetOneFarrowingByAnimalIdAPI({
    animalId: animalId,
  });
  const feedConversionIndex =
    getOneAnimal?.feedingsCount / getOneAnimal?.weight;

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
      <div className="relative m-auto w-full max-w-2xl overflow-y-scroll rounded-xl bg-white  p-5 shadow-lg dark:bg-[#121212]">
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-col items-center gap-1 text-center">
            <h4 className="mt-8 text-2xl font-bold tracking-tight text-center">
              {t.formatMessage({ id: 'ANIMAL.PROFILE' })}
            </h4>
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <>
              {getOneAnimal?.gender === 'FEMALE' &&
              getOneAnimal?.productionPhase === 'REPRODUCTION' ? (
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
                  <Card
                    x-chunk="dashboard-05-chunk-1"
                    className=" dark:border-gray-800"
                  >
                    <CardHeader className="pb-2">
                      <CardDescription>
                        {t.formatMessage({ id: 'FEMALE.BREEDING' })}
                      </CardDescription>
                      <CardTitle className="text-4xl">
                        {getOneAnimal?.breedingFemaleCount || 0}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card
                    x-chunk="dashboard-05-chunk-1"
                    className=" dark:border-gray-800"
                  >
                    <CardHeader className="pb-2">
                      <CardDescription>
                        {t.formatMessage({ id: 'VIEW.FEEDINGS' })}
                      </CardDescription>
                      <CardTitle className="text-4xl">
                        {getOneAnimal?.feedingsCount}kg
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              ) : getOneAnimal?.gender === 'MALE' &&
                getOneAnimal?.productionPhase === 'REPRODUCTION' ? (
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
                  <Card
                    x-chunk="dashboard-05-chunk-1"
                    className=" dark:border-gray-800"
                  >
                    <CardHeader className="pb-2">
                      <CardDescription>
                        {t.formatMessage({ id: 'VIEW.BREEDING' })}
                      </CardDescription>
                      <CardTitle className="text-4xl">
                        {getOneAnimal?.breedingMaleCount || 0}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card
                    x-chunk="dashboard-05-chunk-1"
                    className=" dark:border-gray-800"
                  >
                    <CardHeader className="pb-2">
                      <CardDescription>
                        {t.formatMessage({ id: 'VIEW.FEEDINGS' })}
                      </CardDescription>
                      <CardTitle className="text-4xl">
                        {getOneAnimal?.feedingsCount || 0}kg
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              ) : ['FATTENING', 'GROWTH'].includes(
                  getOneAnimal?.productionPhase,
                ) ? (
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
                  <Card
                    x-chunk="dashboard-05-chunk-1"
                    className=" dark:border-gray-800"
                  >
                    <CardHeader className="pb-2">
                      <CardDescription>
                        {t.formatMessage({ id: 'VIEW.FEEDINGS' })}
                      </CardDescription>
                      <CardTitle className="text-4xl">
                        {getOneAnimal?.feedingsCount || 0}kg
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card
                    x-chunk="dashboard-05-chunk-1"
                    className=" dark:border-gray-800"
                  >
                    <CardHeader className="pb-2">
                      <CardDescription>
                        <Label>{t.formatMessage({ id: 'FEED.INDEX' })}</Label>
                      </CardDescription>
                      <CardTitle className="text-4xl">
                        {feedConversionIndex.toFixed(1) || 0}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              ) : getOneAnimal?.productionPhase === 'GESTATION' ? (
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
                  <Card
                    x-chunk="dashboard-05-chunk-1"
                    className=" dark:border-gray-800"
                  >
                    <CardHeader className="pb-2">
                      <CardDescription>
                        {t.formatMessage({ id: 'FEMALE.BREEDING' })}
                      </CardDescription>
                      <CardTitle className="text-4xl">
                        {getOneAnimal?.breedingFemaleCount || 0}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card
                    x-chunk="dashboard-05-chunk-1"
                    className=" dark:border-gray-800"
                  >
                    <CardHeader className="pb-2">
                      <CardDescription>
                        {t.formatMessage({ id: 'FEMALE.FARROWING' })}
                      </CardDescription>
                      <CardTitle className="text-4xl">
                        {getOneAnimal?.farrowingCount || 0}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              ) : (
                <>
                  <Card
                    x-chunk="dashboard-05-chunk-1"
                    className=" dark:border-gray-800"
                  >
                    <CardHeader className="pb-2">
                      <CardDescription>
                        {t.formatMessage({ id: 'VIEW.FARROWINGS' })}
                      </CardDescription>
                      <CardTitle className="text-4xl">
                        {getOneAnimal?.farrowinglitterCount}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card
                    x-chunk="dashboard-05-chunk-1"
                    className=" dark:border-gray-800"
                  >
                    <CardHeader className="pb-2">
                      <CardDescription>
                        {t.formatMessage({ id: 'VIEW.WEANINGS' })}
                      </CardDescription>
                      <CardTitle className="text-4xl">
                        {getOneAnimal?.weaninglitterCount}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </>
              )}
            </>
            <div className="mt-4 flex-auto justify-center p-2">
              <div className="mb-2 flex items-center space-x-4">
                <Input disabled type="text" value={getOneAnimal?.code} />
                <Input disabled type="text" value={getOneAnimal?.gender} />
                {getOneAnimal?.productionPhase === 'GROWTH' ? (
                  <Input
                    disabled
                    type="text"
                    value={t.formatMessage({ id: 'PRODUCTIONPHASE.GROWTH' })}
                  />
                ) : getOneAnimal?.productionPhase === 'FATTENING' ? (
                  <Input
                    disabled
                    type="text"
                    value={t.formatMessage({
                      id: 'PRODUCTIONTYPE.FATTENING',
                    })}
                  />
                ) : getOneAnimal?.productionPhase === 'GESTATION' ? (
                  <Input
                    disabled
                    type="text"
                    value={getOneAnimal?.productionPhase}
                  />
                ) : getOneAnimal?.productionPhase === 'REPRODUCTION' ? (
                  <Input
                    disabled
                    type="text"
                    value={getOneAnimal?.productionPhase}
                  />
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={getOneAnimal?.productionPhase}
                  />
                )}
              </div>
              <div className="mb-2 flex items-center space-x-10">
                <div>
                  <Label> {t.formatMessage({ id: 'VIEW.BREED' })}</Label>
                  <Input
                    disabled
                    type="text"
                    value={getOneAnimal?.breed?.name}
                  />
                </div>
                <div>
                  <Label>{t.formatMessage({ id: 'VIEW.WEIGHT' })}</Label>
                  <Input
                    disabled
                    type="text"
                    value={formatWeight(getOneAnimal?.weight)}
                  />
                </div>
                <div>
                  <Label>{t.formatMessage({ id: 'VIEW.BIRTHDATE' })}</Label>
                  <Input
                    disabled
                    type="text"
                    value={formatDateDDMMYY(getOneAnimal?.birthday) || 'N/A'}
                  />
                </div>
              </div>
              <div className="mb-2 flex items-center space-x-10">
                <div>
                  {getOneAnimal?.gender === 'MALE' ? (
                    <div>
                      <Label>
                        {t.formatMessage({ id: 'VIEW.CASTRATED' })}?
                      </Label>
                      <Input
                        disabled
                        type="text"
                        value={
                          getOneAnimal?.isCastrated === 'YES'
                            ? t.formatMessage({ id: 'ISOLATED.YES' })
                            : t.formatMessage({ id: 'ISOLATED.NO' })
                        }
                      />
                    </div>
                  ) : getOneAnimal?.productionPhase === 'FATTENING' ? (
                    <div>
                      <Label>{t.formatMessage({ id: 'FATTENING.DATE' })}</Label>
                      <Input
                        disabled
                        type="text"
                        value={
                          formatDateDDMMYY(getOneFattening?.createdAt) || 'N/A'
                        }
                      />
                    </div>
                  ) : getOneAnimal?.productionPhase === 'REPRODUCTION' &&
                    getOneAnimal?.farrowinglitterCount !== 0 ? (
                    <div>
                      <Label>{t.formatMessage({ id: 'FARROWING.DATE' })}</Label>
                      <Input
                        disabled
                        type="text"
                        value={
                          formatDateDDMMYY(getOneFarrowing?.createdAt) || 'N/A'
                        }
                      />
                    </div>
                  ) : ['GESTATION', 'LACTATION'].includes(
                      getOneAnimal?.productionPhase,
                    ) ? (
                    <div>
                      <Label>{t.formatMessage({ id: 'FARROWING.DATE' })}</Label>
                      <Input
                        disabled
                        type="text"
                        value={
                          formatDateDDMMYY(getOneFarrowing?.createdAt) || 'N/A'
                        }
                      />
                    </div>
                  ) : (
                    <div>
                      <Label>{t.formatMessage({ id: 'FARROWING.DATE' })}</Label>
                      <Input disabled type="text" defaultValue={'Pas encore'} />
                    </div>
                  )}
                </div>
                <div>
                  <Label>{t.formatMessage({ id: 'VIEW.MOTHER' })}</Label>
                  <Input
                    disabled
                    type="text"
                    value={getOneAnimal?.codeMother || 'N/A'}
                  />
                </div>
                <div>
                  <Label>{t.formatMessage({ id: 'VIEW.FATHER' })}</Label>
                  <Input
                    disabled
                    type="text"
                    value={getOneAnimal?.codeFather || 'N/A'}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <h4 className="mt-8 text-xl font-bold tracking-tight text-center">
                  {t.formatMessage({ id: 'TREATMENT.PAGE' })}
                </h4>
              </div>
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
                            <div>
                              Date: {formatDateDDMMYY(item?.createdAt)}{' '}
                            </div>
                            <div>
                              Medication: {item?.medication.toLowerCase()}{' '}
                            </div>
                            <div> Dose: {item?.dose} </div>
                            <div>
                              {t.formatMessage({ id: 'SALE.METHOD' })}:{' '}
                              {item?.method.toLowerCase()}
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
            </div>
          </main>
          <DashboardFooter />
        </div>
      </div>
    </>
  );
}
export default AnimalSaleProfile;
