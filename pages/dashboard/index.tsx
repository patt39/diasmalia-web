import { LayoutDashboard } from '@/components/layouts/dashboard';
import { ArrowUpRight, CreditCard, Users } from 'lucide-react';

import { GetActivityLogsAPI } from '@/api-site/activityLogs';
import { GetFinanceStatisticsAPI } from '@/api-site/finances';
import { GetSalesAPI } from '@/api-site/sales';
import { GetOneUserMeAPI } from '@/api-site/user';
import { DashboardFooter } from '@/components/layouts/dashboard/footer';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PrivateComponent } from '@/components/util/private-component';
import { formatDDMMYYDate } from '@/utils';
import Link from 'next/link';
import { useState } from 'react';
import { useIntl } from 'react-intl';

export function Dashboard() {
  const t = useIntl();
  const [pageItem, setPageItem] = useState(1);

  const {
    isLoading: isLoadingActivityLogs,
    isError: isErrorActivityLogs,
    data: dataActivityLogs,
  } = GetActivityLogsAPI({
    take: 6,
    sort: 'desc',
    sortBy: 'createdAt',
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
  });

  const { data: financeStatistics } = GetFinanceStatisticsAPI();

  const revenue =
    Number(financeStatistics?.sumIncome) -
    Number(financeStatistics?.sumExpense);

  const { data: user } = GetOneUserMeAPI();

  return (
    <>
      <LayoutDashboard title={'Dashboard'}>
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
                    {user?.organization?.name}
                  </CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {t.formatMessage({ id: 'DASHBOARD.DESCRIPTION' })}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="dark:border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t.formatMessage({ id: 'DASHBOARD.REVENUE' })}
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {revenue < 0 ? (
                    <div className="text-2xl font-bold text-red-600">
                      {revenue || '00'} {user?.profile?.currency?.symbol}
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-green-600">
                      {revenue || '00'} {user?.profile?.currency?.symbol}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
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
                    {user?._count?.contributors}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              <Card className="xl:col-span-2 dark:border-gray-800">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>
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
                  <CardTitle>{t.formatMessage({ id: 'SALE.TITLE' })}</CardTitle>
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
                        <div key={index} className="flex items-center gap-4">
                          <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                              {item.soldTo}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {item.email}
                            </p>
                          </div>
                          <div className="ml-auto font-medium">
                            {item.price} {user?.profile?.currency?.symbol}
                          </div>
                        </div>
                      </>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
          <DashboardFooter />
        </div>
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Dashboard);
