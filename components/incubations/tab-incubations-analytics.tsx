/* eslint-disable @next/next/no-img-element */
import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import { GetIncubationsAnalyticAPI } from '@/api-site/incubations';
import { useInputState } from '@/components/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dateTimeNowUtc, formatMMDate, getMonthNow } from '@/utils';
import { Calendar, ListFilter } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const TabIncubationsAnalytics = ({
  animalTypeId,
}: {
  animalTypeId: string;
}) => {
  const { t, locale } = useInputState();
  const [periode, setPeriode] = useState('');
  const [year, setYear] = useState<String>(`${dateTimeNowUtc().getFullYear()}`);
  const [months, setMonths] = useState<String>(`${getMonthNow(new Date())}`);

  const { data: dataIncubationsAnalyticsDay } = GetIncubationsAnalyticAPI({
    year: String(year),
    months: String(months),
    periode: String(periode),
    animalTypeId: animalTypeId,
  });
  console.log('dataIncubationsAnalyticsDay ==>', dataIncubationsAnalyticsDay);

  const { data: dataIncubationsAnalyticsMonth } = GetIncubationsAnalyticAPI({
    year: String(year),
    animalTypeId: animalTypeId,
  });

  const { data: dataIncubationsAnalyticsYear } = GetIncubationsAnalyticAPI({
    animalTypeId: animalTypeId,
  });
  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    animalTypeId: animalTypeId,
  });

  const chartConfig = {
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
      {animalStatistics?.sumIncubations !== 0 ? (
        <>
          <Card className="dark:border-input dark:bg-background sm:col-span-2">
            <CardHeader>
              <div className="flex items-center">
                <div className="mr-auto items-center gap-2">
                  <CardTitle className="text-xl">
                    {t.formatMessage({ id: 'ANALYSIS.INCUBATION' })}
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
                        {dataIncubationsAnalyticsYear?.data?.map(
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          {Number(months)
                            ? formatMMDate(Number(months), locale)
                            : months}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="dark:border-gray-800 w-auto">
                      {dataIncubationsAnalyticsMonth?.data?.map(
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          {periode == ''
                            ? t.formatMessage({ id: 'ACTIVITY.FILTERALL' })
                            : periode == '7'
                              ? t.formatMessage({ id: 'ACTIVITY.LAST7DAYS' })
                              : periode == '15'
                                ? t.formatMessage({ id: 'ACTIVITY.LAST15DAYS' })
                                : t.formatMessage({
                                    id: 'ACTIVITY.LAST30DAYS',
                                  })}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="dark:border-gray-800 w-auto">
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        className="cursor-pointer"
                        onClick={() => setPeriode('')}
                        checked
                      >
                        {t.formatMessage({ id: 'ACTIVITY.FILTERALL' })}
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        className="cursor-pointer"
                        onClick={() => setPeriode('7')}
                      >
                        {t.formatMessage({ id: 'ACTIVITY.LAST7DAYS' })}
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        className="cursor-pointer"
                        onClick={() =>
                          setPeriode(
                            `${t.formatMessage({ id: 'ACTIVITY.LAST15DAYS' })}`,
                          )
                        }
                      >
                        {t.formatMessage({ id: 'ACTIVITY.LAST15DAYS' })}
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        className="cursor-pointer"
                        onClick={() => setPeriode('30')}
                      >
                        {t.formatMessage({ id: 'ACTIVITY.LAST30DAYS' })}
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="lg:h-[400px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  data={dataIncubationsAnalyticsDay?.data}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="incubated"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                  <Bar
                    dataKey="hatched"
                    fill="var(--color-mobile)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </>
      ) : (
        ''
      )}
    </>
  );
};
export { TabIncubationsAnalytics };