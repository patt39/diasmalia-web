/* eslint-disable @next/next/no-img-element */
import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import { ListFilter } from 'lucide-react';
import { useState } from 'react';
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

const ChickSalesAnalytics = ({ animalTypeId }: { animalTypeId: string }) => {
  const [periode, setPeriode] = useState('');
  const [pageItem, setPageItem] = useState(1);
  const { t } = useInputState();

  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    animalTypeId: animalTypeId,
  });

  const chartData = [
    { month: 'January', desktop: 186 },
    { month: 'February', desktop: 305 },
    { month: 'March', desktop: 237 },
    { month: 'April', desktop: 73 },
    { month: 'May', desktop: 209 },
    { month: 'June', desktop: 214 },
    { month: 'July', desktop: 14 },
    { month: 'August', desktop: 254 },
    { month: 'September', desktop: 614 },
    { month: 'October', desktop: 934 },
    { month: 'November', desktop: 193 },
    { month: 'December', desktop: 134 },
  ];
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
      {animalStatistics?.sumSaleChicks?.price !== null ? (
        <Card className="dark:border-input dark:bg-background sm:col-span-2">
          <CardHeader>
            <div className="flex items-center">
              <div className="mr-auto items-center gap-2">
                <CardTitle className="text-xl">Vente de poussins</CardTitle>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="dark:border-gray-800"
                  >
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
            <ChartContainer
              config={chartConfig}
              className="lg:h-[300px] w-full"
            >
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      ) : (
        ''
      )}
    </>
  );
};
export { ChickSalesAnalytics };
