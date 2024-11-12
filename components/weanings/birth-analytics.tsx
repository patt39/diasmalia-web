/* eslint-disable @next/next/no-img-element */
import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import { GetBirthAnalyticAPI } from '@/api-site/weanings';
import { dateTimeNowUtc, formatMMDate } from '@/utils';
import { Calendar } from 'lucide-react';
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
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const FarrowingsWeaningsAnalytics = ({
  animalTypeId,
}: {
  animalTypeId: string;
}) => {
  const { t, locale, userStorage } = useInputState();
  const [periode, setPeriode] = useState('');
  const [year, setYear] = useState<String>(`${dateTimeNowUtc().getFullYear()}`);
  const [months, setMonths] = useState<String>('');
  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    animalTypeId: animalTypeId,
    organizationId: userStorage?.organizationId,
  });

  const { data: dataBirthsAnalyticsDay } = GetBirthAnalyticAPI({
    year: String(year),
    months: String(months),
    periode: String(periode),
    animalTypeId: animalTypeId,
    organizationId: userStorage?.organizationId,
  });

  const { data: dataBirthsAnalyticsMonth } = GetBirthAnalyticAPI({
    year: String(year),
    animalTypeId: animalTypeId,
    organizationId: userStorage?.organizationId,
  });

  const { data: dataBirthsAnalyticsYear } = GetBirthAnalyticAPI({
    animalTypeId: animalTypeId,
    organizationId: userStorage?.organizationId,
  });

  const chartConfig = {
    litter: {
      label: `${t.formatMessage({ id: 'WEAN' })}`,
    },
    farrowingLitter: {
      label: `${t.formatMessage({ id: 'FARROWING' })}`,
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
