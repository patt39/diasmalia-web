/* eslint-disable @next/next/no-img-element */
import { GetActivityLogsAPI } from '@/api-site/activityLogs';
import { IpLocationAPI } from '@/api-site/user';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { formatDDMMYYDate } from '@/utils';
import { ListFilter } from 'lucide-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';

const ActivityLogs = () => {
  const [periode, setPeriode] = useState('');
  const { userStorage } = useInputState();
  const t = useIntl();

  const {
    isLoading: isLoadingActivityLog,
    isError: isErrorActivitylogs,
    data: dataActivityLogs,
  } = GetActivityLogsAPI({
    take: 10,
    periode,
    sort: 'desc',
    sortBy: 'createdAt',
    organizationId: userStorage?.organizationId,
  });

  const { data } = IpLocationAPI();

  return (
    <>
      <LayoutDashboard title={'Activity-logs'}>
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Card className=" dark:border-gray-800">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>
                    {t.formatMessage({ id: 'ACTIVITY.TITLE' })}
                  </CardTitle>
                  <CardDescription>
                    {t.formatMessage({ id: 'ACTIVITY.DESCRIPTION' })}
                  </CardDescription>
                </div>
                <div className="ml-auto mb-2 grid">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        onClick={() => setPeriode('')}
                        checked
                      >
                        {t.formatMessage({ id: 'ACTIVITY.FILTERALL' })}
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem onClick={() => setPeriode('7')}>
                        {t.formatMessage({ id: 'ACTIVITY.LAST7DAYS' })}
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        onClick={() => setPeriode('15')}
                      >
                        {t.formatMessage({ id: 'ACTIVITY.LAST15DAYS' })}
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        onClick={() => setPeriode('30')}
                      >
                        {t.formatMessage({ id: 'ACTIVITY.LAST30DAYS' })}
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="dark:border-gray-800">
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingActivityLog ? (
                      <LoadingFile />
                    ) : isErrorActivitylogs ? (
                      <ErrorFile
                        title="404"
                        description="Error finding data please try again..."
                      />
                    ) : Number(dataActivityLogs?.pages[0]?.data?.total) <= 0 ? (
                      ''
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
                              <TableCell>{data?.timezone}</TableCell>
                              <TableCell>{item?.message}</TableCell>
                            </TableRow>
                          </>
                        ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
          <DashboardFooter />
        </div>
      </LayoutDashboard>
    </>
  );
};
export default PrivateComponent(ActivityLogs);
