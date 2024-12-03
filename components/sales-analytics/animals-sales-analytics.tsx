/* eslint-disable @next/next/no-img-element */
import { SalesAnalyticAPI } from '@/api-site/sales';
import { dateTimeNowUtc, formatMMDate } from '@/utils';
import { Calendar } from 'lucide-react';
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
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const AnimalSalesAnalytics = ({ animalTypeId }: { animalTypeId: string }) => {
  const [year, setYear] = useState<String>(`${dateTimeNowUtc().getFullYear()}`);
  const [months, setMonths] = useState<String>('');
  const { t, locale, userStorage } = useInputState();

  const { data: dataAnimalsAnalyticsDay } = SalesAnalyticAPI({
    year: String(year),
    months: String(months),
    animalTypeId: animalTypeId,
    organizationId: userStorage?.organizationId,
  });

  const { data: dataAnimalsAnalyticsMonth } = SalesAnalyticAPI({
    year: String(year),
    animalTypeId: animalTypeId,
    organizationId: userStorage?.organizationId,
  });

  const { data: dataAnimalsAnalyticsYear } = SalesAnalyticAPI({
    animalTypeId: animalTypeId,
    organizationId: userStorage?.organizationId,
  });

  const chartConfig = {
    sum: {
      label: `${t.formatMessage({ id: 'AMOUNT.SOLD' })}`,
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
      <Card className="dark:border-input dark:bg-background sm:col-span-2">
        <CardHeader>
          <div className="flex items-center">
            <div className="mr-auto items-center gap-2">
              <CardTitle className="text-xl">
                {t.formatMessage({ id: 'ANIMAL.FEED' })}
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
                    {dataAnimalsAnalyticsYear?.data?.map(
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
                  {dataAnimalsAnalyticsMonth?.data?.map(
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
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="lg:h-[400px] w-full">
            <AreaChart
              accessibilityLayer
              data={dataAnimalsAnalyticsDay?.data}
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
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                labelClassName="w-40"
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="sum"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
};
export { AnimalSalesAnalytics };
