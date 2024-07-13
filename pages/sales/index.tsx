import { exportSalesAPI, getSalesAPI, GetSalesAPI } from '@/api-site/sales';
import { GetOneUserMeAPI } from '@/api-site/user';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';

import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { SearchInput } from '@/components/ui-setting';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PrivateComponent } from '@/components/util/private-component';
import { File, ListFilter } from 'lucide-react';
import { ListSales } from './list-sales';

export function ListTreatments() {
  const { search, handleSetSearch } = useInputState();
  const { data: user } = GetOneUserMeAPI();
  const { t, isOpen, setIsOpen, loading, setLoading, locale } = useInputState();

  const handleExport = async () => {
    try {
      const response = await exportSalesAPI();
      const link = document.createElement('a');
      link.href = response.config.url;
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
    }
  };

  const {
    isLoading: isLoadingSales,
    isError: isErrorSales,
    data: dataSales,
  } = GetSalesAPI({
    search,
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
  });

  const filterByType = () => {
    getSalesAPI({
      search,
      take: 10,
      sort: 'desc',
      sortBy: 'createdAt',
      type: dataSales?.pages[0]?.data?.value[0]?.type,
    });
  };

  const filterByMethod = () => {
    getSalesAPI({
      search,
      take: 10,
      sort: 'desc',
      sortBy: 'createdAt',
      method: dataSales?.pages[0]?.data?.value[0]?.method,
    });
  };

  return (
    <>
      <LayoutDashboard title={'Sales'}>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card
              className="sm:col-span-2 dark:border-gray-800"
              x-chunk="dashboard-05-chunk-0"
            >
              <CardHeader className="pb-3">
                <CardTitle>
                  {t.formatMessage({ id: 'SALE.TITLE.PAGE' })}
                </CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  {t.formatMessage({ id: 'SALE.DESCRIPTION' })}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button>{t.formatMessage({ id: 'SALE.BUTTON' })}</Button>
              </CardFooter>
            </Card>
            <Card
              x-chunk="dashboard-05-chunk-1"
              className=" dark:border-gray-800"
            >
              <CardHeader className="pb-2">
                <CardDescription>
                  {t.formatMessage({ id: 'SALE.THIS.WEEK' })}
                </CardDescription>
                <CardTitle className="text-3xl">
                  1,329 {user?.profile?.currency?.symbol}
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
                  {t.formatMessage({ id: 'SALE.THIS.MONTH' })}
                </CardDescription>
                <CardTitle className="text-3xl">
                  5,329 {user?.profile?.currency?.symbol}
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
                <TabsTrigger value="year">Analytics</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2  dark:border-gray-800">
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
                    className="dark:border-gray-800"
                  >
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem onClick={() => filterByType()}>
                      Type
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem onClick={() => filterByMethod()}>
                      Method
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                  onClick={() => handleExport()}
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card
                x-chunk="dashboard-06-chunk-0"
                className="dark:border-gray-800"
              >
                <CardHeader>
                  <div className="flex items-center">
                    <div className="ml-auto flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">
                              {dataSales?.pages[0]?.data?.total}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                              {dataSales?.pages[0]?.data?.total} sales
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <SearchInput
                        placeholder="Search by customer"
                        onChange={handleSetSearch}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="dark:border-gray-800">
                        <TableHead>
                          {t.formatMessage({ id: 'SALE.CUSTOMER' })}
                        </TableHead>
                        <TableHead>
                          {t.formatMessage({ id: 'SALE.CONTACT' })}
                        </TableHead>
                        <TableHead>
                          {t.formatMessage({ id: 'SALE.METHOD' })}
                        </TableHead>
                        <TableHead>
                          {t.formatMessage({ id: 'SALE.QUANTITY' })}
                        </TableHead>
                        <TableHead>
                          {t.formatMessage({ id: 'SALE.PRICE' })}
                        </TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>
                          <span>Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoadingSales ? (
                        <LoadingFile />
                      ) : isErrorSales ? (
                        <ErrorFile
                          title="404"
                          description="Error finding data please try again..."
                        />
                      ) : Number(dataSales?.pages[0]?.data?.total) <= 0 ? (
                        <ErrorFile description="Don't have sales yet" />
                      ) : (
                        dataSales?.pages
                          .flatMap((page: any) => page?.data?.value)
                          .map((item, index) => (
                            <>
                              <ListSales
                                item={item}
                                index={index}
                                key={index}
                              />
                            </>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{' '}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <DashboardFooter />
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(ListTreatments);
