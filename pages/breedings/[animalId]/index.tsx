import { GetOneAnimalAPI } from '@/api-site/animals';
import { GetBreedingHistoryAPI } from '@/api-site/breedings';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';

import { GetFarrowingsAnalyticAPI } from '@/api-site/farrowings';
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
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PrivateComponent } from '@/components/util/private-component';
import { formatDateDDMMYY } from '@/utils';
import { firstLetterToUpperCase } from '@/utils/utils';
import { Calendar, MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import {
  dateTimeNowUtc,
  formatMMDate,
  formatWeight,
} from '../../../utils/formate-date';

export function Breeding() {
  const { t, userStorage, locale } = useInputState();
  const { ref, inView } = useInView();
  const { query, back } = useRouter();
  const [year, setYear] = useState<String>(`${dateTimeNowUtc().getFullYear()}`);
  const [months, setMonths] = useState<String>('');
  const animalId = String(query?.animalId);

  const { data: getOneAnimal } = GetOneAnimalAPI({
    animalId: animalId,
  });

  const { data: dataFarrowingsAnalytics } = GetFarrowingsAnalyticAPI({
    year: String(year),
    months: String(months),
    animalId: getOneAnimal?.id,
    animalTypeId: getOneAnimal?.animalTypeId,
    organizationId: userStorage?.organizationId,
  });

  const { data: dataFarrowingsAnalyticsMonth } = GetFarrowingsAnalyticAPI({
    year: String(year),
    animalId: getOneAnimal?.id,
    animalTypeId: getOneAnimal?.animalTypeId,
    organizationId: userStorage?.organizationId,
  });

  const { data: dataFarrowingsAnalyticsYear } = GetFarrowingsAnalyticAPI({
    animalId: getOneAnimal?.id,
    animalTypeId: getOneAnimal?.animalTypeId,
    organizationId: userStorage?.organizationId,
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
    animalFemaleId: getOneAnimal?.id,
    animalTypeId: getOneAnimal?.animalTypeId,
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

  const chartConfig = {
    views: {
      label: `${t.formatMessage({ id: 'LITTER' })}`,
    },
    desktop: {
      label: 'Desktop',
      color: 'hsl(var(--chart-1))',
    },
    mobile: {
      label: 'Mobile',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

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
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 lg:mb-96">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
                    {t.formatMessage({ id: 'PROLIFICITE' })}
                  </CardDescription>
                  <CardTitle className="text-4xl flex">
                    {getOneAnimal?.prolificity?.toFixed(1) || 0}
                    <CardDescription>
                      <div className="pt-5 text-xs font-normal">
                        /{t.formatMessage({ id: 'LITTER.PER.FARROWING' })}
                      </div>
                    </CardDescription>
                  </CardTitle>
                </CardHeader>
              </Card>
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
            </div>
            <Card className="dark:border-gray-800">
              <CardHeader>
                <div className="flex items-center">
                  <div className="mr-auto items-center gap-2">
                    <CardTitle className="text-xl">
                      {t.formatMessage({ id: 'FARROWINGS.GRAPH' })}
                    </CardTitle>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1"
                          >
                            <Calendar className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                              {year}
                            </span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="dark:border-gray-800 w-auto">
                          {dataFarrowingsAnalyticsYear?.data?.map(
                            (item: any, index: number) => (
                              <Fragment key={index}>
                                <DropdownMenuCheckboxItem
                                  className="cursor-pointer"
                                  onClick={() => setYear(item?.dateNumeric)}
                                >
                                  {item?.date}
                                </DropdownMenuCheckboxItem>
                              </Fragment>
                            ),
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                    {year ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1"
                          >
                            <Calendar className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                              {Number(months)
                                ? formatMMDate(Number(months), locale)
                                : 'Select month'}
                            </span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="dark:border-gray-800 w-auto">
                          <DropdownMenuCheckboxItem
                            className="cursor-pointer"
                            onClick={() => setMonths('')}
                            checked
                          >
                            {t.formatMessage({ id: 'ACTIVITY.FILTERALL' })}
                          </DropdownMenuCheckboxItem>
                          {dataFarrowingsAnalyticsMonth?.data?.map(
                            (item: any, index: number) => (
                              <Fragment key={index}>
                                <DropdownMenuCheckboxItem
                                  className="cursor-pointer"
                                  onClick={() => setMonths(item?.dateNumeric)}
                                >
                                  {item?.date}
                                </DropdownMenuCheckboxItem>
                              </Fragment>
                            ),
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : null}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-2 sm:p-6">
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-[250px] w-full"
                >
                  <LineChart
                    accessibilityLayer
                    data={dataFarrowingsAnalytics?.data}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          className="w-[200px]"
                          nameKey="views"
                        />
                      }
                    />
                    <Line
                      dataKey="litter"
                      type="monotone"
                      stroke={`var(--color-desktop)`}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
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
                                : t.formatMessage({
                                    id: 'BREEDING.NEGATIVE',
                                  })}
                            </div>
                            <div>Method: {item?.method?.toLowerCase()}</div>
                            <div>Note: {item?.note}</div>
                            <div>
                              Par:{' '}
                              {firstLetterToUpperCase(
                                userStorage?.profile?.firstName,
                              )}{' '}
                              {firstLetterToUpperCase(
                                userStorage?.profile?.lastName,
                              )}{' '}
                            </div>
                          </div>
                          {item?.farrowing !== null ? (
                            <>
                              <h4 className="my-2 text-sm font-bold tracking-tight">
                                {t.formatMessage({ id: 'FARROWING' })}
                              </h4>
                              <div className="mb-4">
                                <div>
                                  Date:{' '}
                                  {formatDateDDMMYY(item?.farrowing?.createdAt)}
                                </div>
                                <div>
                                  {t.formatMessage({
                                    id: 'TABFARROWING.LITTER',
                                  })}
                                  : {item?.farrowing?.litter}
                                </div>
                                <div>
                                  {t.formatMessage({ id: 'ANIMALTYPE.DEATHS' })}
                                  : {item?.farrowing?.dead}
                                </div>
                                <div>
                                  {t.formatMessage({ id: 'VIEW.WEIGHT' })}:{' '}
                                  {formatWeight(item?.farrowing?.weight)}
                                </div>
                                <div>Note: {item?.farrowing?.note}</div>
                              </div>
                            </>
                          ) : null}
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
                                  {t.formatMessage({
                                    id: 'TABFARROWING.LITTER',
                                  })}
                                  : {item?.weaning?.litter}{' '}
                                </div>
                                <div>
                                  {t.formatMessage({ id: 'VIEW.WEIGHT' })}:{' '}
                                  {formatWeight(item?.weaning?.weight)}
                                </div>
                              </div>
                            </>
                          ) : null}
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
export default PrivateComponent(Breeding);
