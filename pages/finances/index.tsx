import { LayoutDashboard } from '@/components/layouts/dashboard';
import {
  ArrowRightLeftIcon,
  Calendar,
  CreditCard,
  ListFilter,
} from 'lucide-react';

import {
  GetFinancesAnalyticAPI,
  GetFinancesAPI,
  GetFinanceStatisticsAPI,
} from '@/api-site/finances';
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
import { dateTimeNowUtc, formatMMDate, getMonthNow } from '@/utils';
import { Fragment, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { CreateOrUpdateFinances } from './create-or-update-finances';
import { ListFinances } from './list-finances';

export function Finances() {
  const [type, setType] = useState('');
  const { ref, inView } = useInView();
  const [periode, setPeriode] = useState('');
  const [year, setYear] = useState<String>(`${dateTimeNowUtc().getFullYear()}`);
  const [months, setMonths] = useState<String>(`${getMonthNow(new Date())}`);
  const { data: user } = GetOneUserMeAPI();
  const { t, isOpen, setIsOpen, locale } = useInputState();

  const { data: financeStatistics } = GetFinanceStatisticsAPI();

  const { data: dataFinancesAnalytics } = GetFinancesAnalyticAPI({
    year: String(year),
    months: String(months),
    periode: String(periode),
  });

  const { data: dataFinancesAnalyticsMonth } = GetFinancesAnalyticAPI({
    year: String(year),
  });

  const { data: dataFinancesAnalyticsYear } = GetFinancesAnalyticAPI({});

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

  const chartConfig = {
    views: {
      label: `${t.formatMessage({ id: 'DASHBOARD.REVENUE' })}`,
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
                </CardContent>
              </Card>
            </div>
            <Card className=" dark:border-gray-800">
              <CardHeader>
                <div className="flex items-center">
                  <div className="mr-auto items-center gap-2">
                    <CardTitle className="text-xl">
                      {t.formatMessage({ id: 'DASHBOARD.REVENUE' })}
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
                          {dataFinancesAnalyticsYear?.data?.map(
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
                          {dataFinancesAnalyticsMonth?.data?.map(
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
                    ) : (
                      ''
                    )}
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
                    data={dataFinancesAnalytics?.data}
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
                          className="w-[150px]"
                          nameKey="views"
                        />
                      }
                    />
                    <Line
                      dataKey="revenue"
                      type="monotone"
                      stroke={`var(--color-desktop)`}
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
                  <Button onClick={() => setIsOpen(true)}>
                    {t.formatMessage({ id: 'FINANCE.ADD' })}
                  </Button>
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
                            {t.formatMessage({ id: 'FINANCE.AMOUNT' })}
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
