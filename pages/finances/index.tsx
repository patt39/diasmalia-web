import { LayoutDashboard } from '@/components/layouts/dashboard';
import { ListFilter } from 'lucide-react';

import { GetFinancesAPI, GetFinanceStatisticsAPI } from '@/api-site/finances';
import { GetOneUserMeAPI } from '@/api-site/user';
import { useInputState } from '@/components/hooks';
import { DashboardFooter } from '@/components/layouts/dashboard/footer';
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PrivateComponent } from '@/components/util/private-component';
import { useState } from 'react';
import { CreateOrUpdateFinances } from './create-or-update-finances';
import { ListFinances } from './list-finances';

export function Finances() {
  const [type, setType] = useState('');
  const { t, isOpen, setIsOpen } = useInputState();
  const { data: user } = GetOneUserMeAPI();

  const { data: financeStatistics } = GetFinanceStatisticsAPI();

  const {
    isLoading: isLoadingFinances,
    isError: isErrorFiances,
    data: dataFinances,
  } = GetFinancesAPI({
    type,
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
  });

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
              <Card
                x-chunk="dashboard-05-chunk-1"
                className=" dark:border-gray-800"
              >
                <CardHeader className="pb-2">
                  <CardDescription>
                    {t.formatMessage({ id: 'FINANCE.INCOME' })}
                  </CardDescription>
                  <CardTitle className="text-3xl">
                    {financeStatistics?.sumIncome}{' '}
                    {user?.profile?.currency?.symbol}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card
                x-chunk="dashboard-05-chunk-2"
                className=" dark:border-gray-800"
              >
                <CardHeader className="pb-2">
                  <CardDescription>
                    {t.formatMessage({ id: 'FINANCE.EXPENSES' })}
                  </CardDescription>
                  <CardTitle className="text-3xl">
                    {financeStatistics?.sumExpense}{' '}
                    {user?.profile?.currency?.symbol}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +10% from last month
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="all">
              <div className="flex items-center  dark:border-gray-800">
                <TabsList>
                  <TabsTrigger value="all">
                    {t.formatMessage({ id: 'SALE.ALL' })}
                  </TabsTrigger>
                  <TabsTrigger value="month">
                    {t.formatMessage({ id: 'SALE.MONTH' })}
                  </TabsTrigger>
                  <TabsTrigger value="year">
                    {t.formatMessage({ id: 'SALE.YEAR' })}
                  </TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
                      className="dark:border-gray-80 cursor-pointer0"
                    >
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem onClick={() => setType('')}>
                        All
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        onClick={() => setType('INCOME')}
                      >
                        {t.formatMessage({ id: 'FINANCE.INCOME' })}
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        onClick={() => setType('EXPENSE')}
                      >
                        {t.formatMessage({ id: 'FINANCE.EXPENSES' })}
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="month">
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
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="year">
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
