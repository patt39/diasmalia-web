/* eslint-disable @next/next/no-img-element */
import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import { GetBirthAnalyticAPI } from '@/api-site/weanings';
import { dateTimeNowUtc, formatMMDate } from '@/utils';
import { Calendar, ListFilter } from 'lucide-react';
import { Fragment, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { useInputState } from '../hooks';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
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

const FarrowingsWeaningsAnalytics = ({
  animalTypeId,
}: {
  animalTypeId: string;
}) => {
  const { t, locale } = useInputState();
  const [periode, setPeriode] = useState('');
  const [year, setYear] = useState<String>(`${dateTimeNowUtc().getFullYear()}`);
  const [months, setMonths] = useState<String>('');
  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    animalTypeId: animalTypeId,
  });

  const { data: dataBirthsAnalyticsDay } = GetBirthAnalyticAPI({
    year: String(year),
    months: String(months),
    periode: String(periode),
    animalTypeId: animalTypeId,
  });

  const { data: dataBirthsAnalyticsMonth } = GetBirthAnalyticAPI({
    year: String(year),
    animalTypeId: animalTypeId,
  });

  const { data: dataBirthsAnalyticsYear } = GetBirthAnalyticAPI({
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
      {animalStatistics?.sumFarrowings ||
      animalStatistics?.sumWeanings !== null ? (
        <Card className="dark:border-input dark:bg-background sm:col-span-2">
          <CardHeader>
            <div className="flex items-center">
              <div className="mr-auto items-center gap-2">
                <CardTitle className="text-xl">Vente animaux</CardTitle>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          {year}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="dark:border-gray-800 w-auto">
                      {dataBirthsAnalyticsYear?.data?.map(
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
                    {dataBirthsAnalyticsMonth?.data?.map(
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
                              : t.formatMessage({ id: 'ACTIVITY.LAST30DAYS' })}
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
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={dataBirthsAnalyticsDay?.data}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  //tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  labelClassName="w-40"
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="farrowingLitter"
                  type="monotone"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="litter"
                  type="monotone"
                  stroke="var(--color-mobile)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      ) : (
        ''
      )}
    </>
  );
};
export { FarrowingsWeaningsAnalytics };