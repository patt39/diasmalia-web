/* eslint-disable @next/next/no-img-element */
import { GetEggHarvestingsAnalyticAPI } from '@/api-site/eggharvesting';
import { dateTimeNowUtc, formatMMDate, getMonthNow } from '@/utils';
import { Calendar, ListFilter } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const EggHarvestingsAnalytics = ({
  animalTypeId,
}: {
  animalTypeId: string;
}) => {
  const { t, locale } = useInputState();
  const [periode, setPeriode] = useState('');
  const [year, setYear] = useState<String>(`${dateTimeNowUtc().getFullYear()}`);
  const [months, setMonths] = useState<String>(`${getMonthNow(new Date())}`);

  const { data: dataEggHarvestingAnalyticsDay } = GetEggHarvestingsAnalyticAPI({
    year: String(year),
    months: String(months),
    periode: String(periode),
    animalTypeId: animalTypeId,
  });

  const { data: dataEggHarvestingAnalyticsMonth } =
    GetEggHarvestingsAnalyticAPI({
      year: String(year),
      animalTypeId: animalTypeId,
    });

  const { data: dataEggHarvestingAnalyticsYear } = GetEggHarvestingsAnalyticAPI(
    { animalTypeId: animalTypeId },
  );

  const chartConfig = {
    edge: {
      label: 'Edge',
      color: 'hsl(var(--chart-4))',
    },
    mobile: {
      label: 'Mobile',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  return (
    <>
      <Card className="dark:border-input dark:bg-background sm:col-span-2">
        <CardHeader>
          <div className="flex items-center">
            <div className="mr-auto items-center gap-2">
              <CardTitle className="text-xl">
                {t.formatMessage({ id: 'ANIMAL.EGGHAVESTED' })}
              </CardTitle>
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
                    {dataEggHarvestingAnalyticsYear?.data?.map(
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
                  {dataEggHarvestingAnalyticsMonth?.data?.map(
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
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
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
                    onClick={() => setPeriode('15')}
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
          <ChartContainer config={chartConfig} className="lg:h-[400px] w-full">
            <AreaChart
              accessibilityLayer
              data={dataEggHarvestingAnalyticsDay?.data}
              margin={{
                top: 12,
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
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="sum"
                type="natural"
                fill="var(--color-edge)"
                fillOpacity={0.4}
                stroke="var(--color-edge)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
};
export { EggHarvestingsAnalytics };