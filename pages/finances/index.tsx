import { LayoutDashboard } from '@/components/layouts/dashboard';
import {
  ArrowRightLeftIcon,
  CreditCard,
  ListCollapseIcon,
  ListFilter,
} from 'lucide-react';

import { GetFinancesAPI, GetFinanceStatisticsAPI } from '@/api-site/finances';
import { GetOneUserMeAPI } from '@/api-site/user';
import { useInputState } from '@/components/hooks';
import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { ButtonLoadMore } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PrivateComponent } from '@/components/util/private-component';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { CreateOrUpdateFinances } from './create-or-update-finances';
import { ListFinances } from './list-finances';

export function Finances() {
  const [type, setType] = useState('');
  const { ref, inView } = useInView();
  const [periode, setPeriode] = useState('');
  const { data: user } = GetOneUserMeAPI();
  const { t, isOpen, setIsOpen } = useInputState();
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('desktop');

  const { data: financeStatistics } = GetFinanceStatisticsAPI();

  const revenue =
    Number(financeStatistics?.sumIncome) -
    Number(financeStatistics?.sumExpense);

  const {
    isLoading: isLoadingFinances,
    isError: isErrorFiances,
    data: dataFinances,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetFinancesAPI({
    type,
    periode,
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
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

  const chartData = [
    { date: '2024-04-01', desktop: 222, mobile: 150 },
    { date: '2024-04-02', desktop: 97, mobile: 180 },
    { date: '2024-04-03', desktop: 167, mobile: 120 },
    { date: '2024-04-04', desktop: 242, mobile: 260 },
    { date: '2024-04-05', desktop: 373, mobile: 290 },
    { date: '2024-04-06', desktop: 301, mobile: 340 },
    { date: '2024-04-07', desktop: 245, mobile: 180 },
    { date: '2024-04-08', desktop: 409, mobile: 320 },
    { date: '2024-04-09', desktop: 59, mobile: 110 },
    { date: '2024-04-10', desktop: 261, mobile: 190 },
    { date: '2024-04-11', desktop: 327, mobile: 350 },
    { date: '2024-04-12', desktop: 292, mobile: 210 },
    { date: '2024-04-13', desktop: 342, mobile: 380 },
    { date: '2024-04-14', desktop: 137, mobile: 220 },
    { date: '2024-04-15', desktop: 120, mobile: 170 },
    { date: '2024-04-16', desktop: 138, mobile: 190 },
    { date: '2024-04-17', desktop: 446, mobile: 360 },
    { date: '2024-04-18', desktop: 364, mobile: 410 },
    { date: '2024-04-19', desktop: 243, mobile: 180 },
    { date: '2024-04-20', desktop: 89, mobile: 150 },
    { date: '2024-04-21', desktop: 137, mobile: 200 },
    { date: '2024-04-22', desktop: 224, mobile: 170 },
    { date: '2024-04-23', desktop: 138, mobile: 230 },
    { date: '2024-04-24', desktop: 387, mobile: 290 },
    { date: '2024-04-25', desktop: 215, mobile: 250 },
    { date: '2024-04-26', desktop: 75, mobile: 130 },
    { date: '2024-04-27', desktop: 383, mobile: 420 },
    { date: '2024-04-28', desktop: 122, mobile: 180 },
    { date: '2024-04-29', desktop: 315, mobile: 240 },
    { date: '2024-04-30', desktop: 454, mobile: 380 },
    { date: '2024-05-01', desktop: 165, mobile: 220 },
    { date: '2024-05-02', desktop: 293, mobile: 310 },
    { date: '2024-05-03', desktop: 247, mobile: 190 },
    { date: '2024-05-04', desktop: 385, mobile: 420 },
    { date: '2024-05-05', desktop: 481, mobile: 390 },
    { date: '2024-05-06', desktop: 498, mobile: 520 },
    { date: '2024-05-07', desktop: 388, mobile: 300 },
    { date: '2024-05-08', desktop: 149, mobile: 210 },
    { date: '2024-05-09', desktop: 227, mobile: 180 },
    { date: '2024-05-10', desktop: 293, mobile: 330 },
    { date: '2024-05-11', desktop: 335, mobile: 270 },
    { date: '2024-05-12', desktop: 197, mobile: 240 },
    { date: '2024-05-13', desktop: 197, mobile: 160 },
    { date: '2024-05-14', desktop: 448, mobile: 490 },
    { date: '2024-05-15', desktop: 473, mobile: 380 },
    { date: '2024-05-16', desktop: 338, mobile: 400 },
    { date: '2024-05-17', desktop: 499, mobile: 420 },
    { date: '2024-05-18', desktop: 315, mobile: 350 },
    { date: '2024-05-19', desktop: 235, mobile: 180 },
    { date: '2024-05-20', desktop: 177, mobile: 230 },
    { date: '2024-05-21', desktop: 82, mobile: 140 },
    { date: '2024-05-22', desktop: 81, mobile: 120 },
    { date: '2024-05-23', desktop: 252, mobile: 290 },
    { date: '2024-05-24', desktop: 294, mobile: 220 },
    { date: '2024-05-25', desktop: 201, mobile: 250 },
    { date: '2024-05-26', desktop: 213, mobile: 170 },
    { date: '2024-05-27', desktop: 420, mobile: 460 },
    { date: '2024-05-28', desktop: 233, mobile: 190 },
    { date: '2024-05-29', desktop: 78, mobile: 130 },
    { date: '2024-05-30', desktop: 340, mobile: 280 },
    { date: '2024-05-31', desktop: 178, mobile: 230 },
    { date: '2024-06-01', desktop: 178, mobile: 200 },
    { date: '2024-06-02', desktop: 470, mobile: 410 },
    { date: '2024-06-03', desktop: 103, mobile: 160 },
    { date: '2024-06-04', desktop: 439, mobile: 380 },
    { date: '2024-06-05', desktop: 88, mobile: 140 },
    { date: '2024-06-06', desktop: 294, mobile: 250 },
    { date: '2024-06-07', desktop: 323, mobile: 370 },
    { date: '2024-06-08', desktop: 385, mobile: 320 },
    { date: '2024-06-09', desktop: 438, mobile: 480 },
    { date: '2024-06-10', desktop: 155, mobile: 200 },
    { date: '2024-06-11', desktop: 92, mobile: 150 },
    { date: '2024-06-12', desktop: 492, mobile: 420 },
    { date: '2024-06-13', desktop: 81, mobile: 130 },
    { date: '2024-06-14', desktop: 426, mobile: 380 },
    { date: '2024-06-15', desktop: 307, mobile: 350 },
    { date: '2024-06-16', desktop: 371, mobile: 310 },
    { date: '2024-06-17', desktop: 475, mobile: 520 },
    { date: '2024-06-18', desktop: 107, mobile: 170 },
    { date: '2024-06-19', desktop: 341, mobile: 290 },
    { date: '2024-06-20', desktop: 408, mobile: 450 },
    { date: '2024-06-21', desktop: 169, mobile: 210 },
    { date: '2024-06-22', desktop: 317, mobile: 270 },
    { date: '2024-06-23', desktop: 480, mobile: 530 },
    { date: '2024-06-24', desktop: 132, mobile: 180 },
    { date: '2024-06-25', desktop: 141, mobile: 190 },
    { date: '2024-06-26', desktop: 434, mobile: 380 },
    { date: '2024-06-27', desktop: 448, mobile: 490 },
    { date: '2024-06-28', desktop: 149, mobile: 200 },
    { date: '2024-06-29', desktop: 103, mobile: 160 },
    { date: '2024-06-30', desktop: 446, mobile: 400 },
  ];
  const chartConfig = {
    views: {
      label: 'Page Views',
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
      <LayoutDashboard title={'Finances'}>
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card
                className="sm:col-span-2 dark:border-gray-800"
                x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>
                    {t.formatMessage({ id: 'FINANCE.TITLE' })}
                  </CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {t.formatMessage({ id: 'FINANCE.DESCRIPTION' })}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={() => setIsOpen(true)}>
                    {t.formatMessage({ id: 'FINANCE.ADD' })}
                  </Button>
                </CardFooter>
              </Card>
              <Card className="sm:col-span-2 dark:border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t.formatMessage({ id: 'DASHBOARD.REVENUE' })}
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {revenue < 0 ? (
                    <div className="text-4xl my-2 font-bold text-red-600">
                      {revenue.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      {user?.profile?.currency?.symbol}
                    </div>
                  ) : (
                    <div className="text-4xl my-2 font-bold text-green-600">
                      {revenue.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      {user?.profile?.currency?.symbol}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            <Card className=" dark:border-gray-800">
              <CardContent className="px-2 sm:p-6">
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-[250px] w-full"
                >
                  <LineChart
                    accessibilityLayer
                    data={chartData}
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
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        });
                      }}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          className="w-[150px]"
                          nameKey="views"
                          labelFormatter={(value) => {
                            return new Date(value).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            });
                          }}
                        />
                      }
                    />
                    <Line
                      dataKey={activeChart}
                      type="monotone"
                      stroke={`var(--color-${activeChart})`}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Tabs defaultValue="all">
              <div className="flex items-center  dark:border-gray-800">
                <TabsList>
                  <TabsTrigger value="all">
                    <ArrowRightLeftIcon className="size-5 mr-2" /> Transactions
                  </TabsTrigger>
                  <TabsTrigger value="analytics">
                    <ListCollapseIcon className="size-5 mr-2" />
                    Analytics
                  </TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2 cursor-pointer dark:border-gray-800">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="dark:border-gray-80 cursor-pointer0 dark:border-gray-800"
                    >
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {periode ? (
                        <DropdownMenuCheckboxItem
                          checked
                          onClick={() => setPeriode('')}
                          className="cursor-pointer"
                        >
                          {t.formatMessage({ id: 'ACTIVITY.FILTERALL' })}
                        </DropdownMenuCheckboxItem>
                      ) : (
                        <DropdownMenuCheckboxItem
                          checked
                          className="cursor-pointer"
                          onClick={() => setType('')}
                        >
                          {t.formatMessage({ id: 'ACTIVITY.FILTERALL' })}
                        </DropdownMenuCheckboxItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="cursor-pointer">
                          {t.formatMessage({ id: 'FINANCE.PERIODE' })}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className=" dark:border-gray-800 cursor-pointer0">
                            <DropdownMenuCheckboxItem
                              onClick={() => setPeriode('7')}
                              className="cursor-pointer"
                            >
                              {t.formatMessage({ id: 'ACTIVITY.LAST7DAYS' })}
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              onClick={() => setPeriode('15')}
                              className="cursor-pointer"
                            >
                              {t.formatMessage({ id: 'ACTIVITY.LAST15DAYS' })}
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              onClick={() => setPeriode('30')}
                              className="cursor-pointer"
                            >
                              {t.formatMessage({ id: 'ACTIVITY.LAST30DAYS' })}
                            </DropdownMenuCheckboxItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="cursor-pointer">
                          {t.formatMessage({ id: 'FINANCE.TYPE' })}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSeparator />
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className=" dark:border-gray-800">
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => setType('INCOME')}
                            >
                              {t.formatMessage({ id: 'FINANCE.INCOME' })}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => setType('EXPENSE')}
                            >
                              {t.formatMessage({ id: 'FINANCE.EXPENSES' })}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">
                          {dataFinances?.pages[0]?.data?.total}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="dark:border-gray-800">
                        <p>
                          {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                          {dataFinances?.pages[0]?.data?.total} Transactions
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <TabsContent value="all">
                <Card
                  x-chunk="dashboard-05-chunk-3"
                  className=" dark:border-gray-800"
                >
                  <CardContent>
                    <Table className="mt-2">
                      <TableHeader>
                        <TableRow className="dark:border-gray-800">
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Detail</TableHead>
                          <TableHead>
                            {t.formatMessage({ id: 'FINANCE.AMOUNT' })} (
                            {user?.profile?.currency?.symbol})
                          </TableHead>
                          <TableHead>
                            <span>Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoadingFinances ? (
                          <LoadingFile />
                        ) : isErrorFiances ? (
                          <ErrorFile
                            title="404"
                            description="Error finding data please try again..."
                          />
                        ) : Number(dataFinances?.pages[0]?.data?.total) <= 0 ? (
                          <ErrorFile description="Don't have transactions yet" />
                        ) : (
                          dataFinances?.pages
                            .flatMap((page: any) => page?.data?.value)
                            .map((item, index) => (
                              <>
                                <>
                                  <ListFinances
                                    item={item}
                                    index={index}
                                    key={index}
                                  />
                                </>
                              </>
                            ))
                        )}
                      </TableBody>
                    </Table>
                    {hasNextPage && (
                      <div className="mx-auto mt-4 justify-center text-center">
                        <ButtonLoadMore
                          ref={ref}
                          isFetchingNextPage={isFetchingNextPage}
                          onClick={() => fetchNextPage()}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
          <CreateOrUpdateFinances showModal={isOpen} setShowModal={setIsOpen} />
          <DashboardFooter />
        </div>
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Finances);
