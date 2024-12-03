import { LayoutDashboard } from '@/components/layouts/dashboard';
import { ArrowUpRight, Calendar, Frame, Users } from 'lucide-react';

import { GetActivityLogsAPI } from '@/api-site/activityLogs';
import { GetAssignedTypesAPI } from '@/api-site/assigned-type';
import { GetContributorsAPI } from '@/api-site/contributors';
import { GetFinancesAnalyticAPI, GetFinancesAPI } from '@/api-site/finances';
import { GetSalesAPI } from '@/api-site/sales';
import { GetTasksAPI } from '@/api-site/task';
import { useInputState } from '@/components/hooks';
import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PrivateComponent } from '@/components/util/private-component';
import {
  dateTimeNowUtc,
  formatDateDDMMYY,
  formatDDMMYYDate,
  formatMMDate,
  getDayOfMonth,
  getMonthNow,
} from '@/utils';
import {
  capitalizeOneFirstLetter,
  firstLetterToUpperCase,
} from '@/utils/utils';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

export function Dashboard() {
  const { t, userStorage, locale } = useInputState();
  const [pageItem, setPageItem] = useState(1);
  const [year, setYear] = useState<String>(`${dateTimeNowUtc().getFullYear()}`);
  const [months, setMonths] = useState<String>(`${getMonthNow(new Date())}`);

  const {
    isLoading: isLoadingActivityLogs,
    isError: isErrorActivityLogs,
    data: dataActivityLogs,
  } = GetActivityLogsAPI({
    take: 6,
    sort: 'desc',
    sortBy: 'createdAt',
    organizationId: userStorage?.organizationId,
  });

  const {
    isLoading: isLoadingFinances,
    isError: isErrorFinances,
    data: dataFinances,
  } = GetFinancesAPI({
    take: 6,
    sort: 'desc',
    sortBy: 'createdAt',
    organizationId: userStorage?.organizationId,
  });

  const {
    isLoading: isLoadingSales,
    isError: isErrorSales,
    data: dataSales,
  } = GetSalesAPI({
    take: 6,
    pageItem,
    sort: 'desc',
    sortBy: 'createdAt',
    organizationId: userStorage?.organizationId,
  });

  const { data: dataCollaborators } = GetContributorsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    organizationId: userStorage?.organizationId,
  });

  const { data: dataAssignedTypes } = GetAssignedTypesAPI({
    take: 20,
    sort: 'desc',
    sortBy: 'createdAt',
  });

  const {
    isLoading: isLoadingTasks,
    isError: isErrorTasks,
    data: dataTasks,
  } = GetTasksAPI({
    take: 6,
    pageItem,
    sort: 'desc',
    type: 'SPECIFIC',
    sortBy: 'createdAt',
    organizationId: userStorage?.organizationId,
  });

  const { data: finances } = GetFinancesAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    organizationId: userStorage?.organizationId,
  });

  const { data: dataFinancesAnalytics } = GetFinancesAnalyticAPI({
    year: String(year),
    months: String(months),
    organizationId: userStorage?.organizationId,
  });

  const { data: dataFinancesAnalyticsMonth } = GetFinancesAnalyticAPI({
    year: String(year),
    organizationId: userStorage?.organizationId,
  });

  const { data: dataFinancesAnalyticsYear } = GetFinancesAnalyticAPI({});

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
      <LayoutDashboard
        title={`${userStorage?.profile?.firstName} ${userStorage?.profile?.lastName} - Dashboard`}
      >
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card
                className="sm:col-span-2 dark:border-gray-800"
                x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>
                    {t.formatMessage({ id: 'DASHBOARD.TITLE' })}
                    {userStorage?.organization?.name}
                  </CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {t.formatMessage({ id: 'DASHBOARD.DESCRIPTION' })}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="dark:border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t.formatMessage({ id: 'FARM.NUMBER' })}
                  </CardTitle>
                  <Frame className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dataAssignedTypes?.pages[0]?.data?.total}
                  </div>
                </CardContent>
              </Card>
              <Card className="dark:border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t.formatMessage({ id: 'DASHBOARD.USERS' })}
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dataCollaborators?.pages[0]?.data?.total}
                  </div>
                </CardContent>
              </Card>
            </div>
            {userStorage?.role === 'SUPERADMIN' &&
            finances?.pages[0]?.data?.revenue > 0 ? (
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
                            labelClassName="w-40"
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
                      <ChartTooltipContent
                        labelClassName="w-40"
                        nameKey="views"
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            ) : null}
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              <Card className="xl:col-span-2 dark:border-gray-800">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle className="text-lg font-bold">
                      {t.formatMessage({ id: 'ACTIVITY.TITLE' })}
                    </CardTitle>
                    <CardDescription>
                      {t.formatMessage({ id: 'ACTIVITY.DESCRIPTION' })}
                    </CardDescription>
                  </div>
                  <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href={`/activity-logs`}>
                      {t.formatMessage({ id: 'ACTIVITY.ALL' })}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="dark:border-gray-800">
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoadingActivityLogs ? (
                        <LoadingFile />
                      ) : isErrorActivityLogs ? (
                        <ErrorFile
                          title="404"
                          description="Error finding data please try again..."
                        />
                      ) : Number(dataActivityLogs?.pages[0]?.data?.total) <=
                        0 ? (
                        <ErrorFile description="Don't have activities yet" />
                      ) : (
                        dataActivityLogs?.pages
                          .flatMap((page: any) => page?.data?.value)
                          .map((item, index) => (
                            <>
                              <TableRow
                                key={index}
                                className="dark:border-gray-800"
                              >
                                <TableCell>
                                  <div className="font-medium">
                                    {formatDDMMYYDate(item?.createdAt as Date)}
                                  </div>
                                </TableCell>
                                <TableCell>{item?.message}</TableCell>
                              </TableRow>
                            </>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card className="dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">
                    {t.formatMessage({ id: 'RECENT.TASKS' })}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                  <Table>
                    <TableHeader>
                      <TableRow className="dark:border-gray-800">
                        <TableHead>
                          {t.formatMessage({ id: 'MENU.CONTRIBUTOR' })}
                        </TableHead>
                        <TableHead>
                          {t.formatMessage({ id: 'DUEDATE' })}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoadingTasks ? (
                        <LoadingFile />
                      ) : isErrorTasks ? (
                        <ErrorFile
                          title="404"
                          description="Error finding data please try again..."
                        />
                      ) : Number(dataTasks?.data?.total) <= 0 ? (
                        <ErrorFile description="Don't have assigned tasks yet" />
                      ) : (
                        dataTasks?.data?.value.map(
                          (item: any, index: number) => (
                            <>
                              <TableRow key={index}>
                                <TableCell className="flex items-center gap-4 cursor-pointer">
                                  <Avatar>
                                    <AvatarImage
                                      src={
                                        item?.contributor?.user?.profile?.photo
                                      }
                                    />
                                    <AvatarFallback>
                                      {capitalizeOneFirstLetter(
                                        item?.contributor?.user?.profile
                                          ?.firstName,
                                      )}{' '}
                                      {capitalizeOneFirstLetter(
                                        item?.contributor?.user?.profile
                                          ?.lastName,
                                      )}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                      {firstLetterToUpperCase(
                                        item?.contributor?.user?.profile
                                          ?.firstName,
                                      )}{' '}
                                      {firstLetterToUpperCase(
                                        item?.contributor?.user?.profile
                                          ?.lastName,
                                      )}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {getDayOfMonth(item?.dueDate) -
                                    new Date().getDate() ==
                                  2 ? (
                                    <span className="relative inline-flex animate-pulse text-orange-600">
                                      Dans 2 jours
                                    </span>
                                  ) : getDayOfMonth(item?.dueDate) ==
                                    new Date().getDate() ? (
                                    <span className="relative inline-flex animate-bounce text-red-600">
                                      Aujourdhui
                                    </span>
                                  ) : (
                                    formatDateDDMMYY(item?.dueDate)
                                  )}
                                </TableCell>
                              </TableRow>
                            </>
                          ),
                        )
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            {userStorage?.role === 'SUPERADMIN' ? (
              <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Card className="xl:col-span-2 dark:border-gray-800">
                  <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                      <CardTitle className="text-lg font-bold">
                        {t.formatMessage({ id: 'RECENT.TRANSACTIONS' })}
                      </CardTitle>
                      <CardDescription>
                        {t.formatMessage({ id: 'TRANSACTIONS.DESCRIPTION' })}
                      </CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                      <Link href={`/finances`}>
                        {t.formatMessage({ id: 'ACTIVITY.ALL' })}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardHeader>
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
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoadingFinances ? (
                          <LoadingFile />
                        ) : isErrorFinances ? (
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
                                <TableRow
                                  key={index}
                                  className="dark:border-gray-800"
                                >
                                  <TableCell className="font-medium">
                                    {formatDateDDMMYY(item?.createdAt as Date)}
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {item?.type === 'INCOME'
                                      ? t.formatMessage({
                                          id: 'FINANCE.INCOME',
                                        })
                                      : t.formatMessage({
                                          id: 'FINANCE.EXPENSES',
                                        })}
                                  </TableCell>
                                  <TableCell>
                                    {item?.detail?.length > 20
                                      ? item?.detail?.substring(0, 20) + '...'
                                      : item?.detail}
                                  </TableCell>
                                  {item?.type === 'INCOME' ? (
                                    <TableCell className="font-bold text-green-600">
                                      +
                                      {item?.amount?.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })}{' '}
                                      {userStorage?.profile?.currency?.symbol}
                                    </TableCell>
                                  ) : item.type === 'EXPENSE' ? (
                                    <TableCell className="font-bold text-red-600">
                                      {item?.amount?.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })}{' '}
                                      {userStorage?.profile?.currency?.symbol}
                                    </TableCell>
                                  ) : null}
                                </TableRow>
                              </>
                            ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card className="dark:border-gray-800">
                  <CardHeader className="flex flex-row items-center">
                    <CardTitle className="text-lg font-bold">
                      {t.formatMessage({ id: 'SALE.TITLE' })}
                    </CardTitle>
                    <Button asChild size="xsm" className="ml-auto gap-1">
                      <Link href={`/sales`}>
                        {t.formatMessage({ id: 'ACTIVITY.ALL' })}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="grid gap-8">
                    {isLoadingSales ? (
                      <LoadingFile />
                    ) : isErrorSales ? (
                      <ErrorFile
                        title="404"
                        description="Error finding data please try again..."
                      />
                    ) : Number(dataSales?.data?.total) <= 0 ? (
                      <ErrorFile description="Don't have sales yet" />
                    ) : (
                      dataSales?.data?.value.map((item: any, index: number) => (
                        <>
                          <Link
                            href={`${item?.animalTypeId}`}
                            key={index}
                            className="flex items-center gap-4 cursor-pointer"
                          >
                            <div className="grid gap-1">
                              <p className="text-sm font-medium leading-none">
                                {item?.soldTo}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {item?.email?.length > 40
                                  ? item?.email?.substring(0, 40) + '...'
                                  : item?.email}
                              </p>
                            </div>
                            <div className="ml-auto font-medium">
                              {item?.price.toLocaleString('en-US')}{' '}
                              {userStorage?.profile?.currency?.symbol}
                            </div>
                          </Link>
                        </>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : null}
          </main>
          <DashboardFooter />
        </div>
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Dashboard);
