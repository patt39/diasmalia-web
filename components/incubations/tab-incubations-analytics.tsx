/* eslint-disable @next/next/no-img-element */
import { GetIncubationsAPI } from '@/api-site/incubations';
import { useInputState } from '@/components/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListFilter } from 'lucide-react';
import { useState } from 'react';
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const TabIncubationsAnalytics = ({
  animalTypeId,
}: {
  animalTypeId: string;
}) => {
  const { t } = useInputState();
  const [pageItem, setPageItem] = useState(1);
  const [periode, setPeriode] = useState('');

  const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
    { month: 'July', desktop: 224, mobile: 100 },
    { month: 'August', desktop: 290, mobile: 131 },
    { month: 'September', desktop: 933, mobile: 931 },
    { month: 'October', desktop: 131, mobile: 141 },
    { month: 'November', desktop: 203, mobile: 910 },
    { month: 'December', desktop: 831, mobile: 310 },
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

  const {
    isLoading: isLoadingIncubations,
    isError: isErrorIncubations,
    data: dataIncubations,
    isPlaceholderData,
  } = GetIncubationsAPI({
    take: 10,
    periode,
    pageItem,
    sort: 'desc',
    sortBy: 'createdAt',
    animalTypeId: animalTypeId,
  });

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <div className="mr-auto items-center gap-2">
              <CardTitle>Incubés / éclos</CardTitle>
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
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
};
export { TabIncubationsAnalytics };
