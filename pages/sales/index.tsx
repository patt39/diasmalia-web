import { GetOneUserMeAPI } from '@/api-site/user';
import { useReactHookForm } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';

import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { GetAssignedTypesAPI } from '@/api-site/assigned-type';
import {
  exportSalesAPI,
  GetSalesAPI,
  SalesAnalyticAPI,
} from '@/api-site/sales';
import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { ButtonInput } from '@/components/ui-setting';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PrivateComponent } from '@/components/util/private-component';
import { dateTimeNowUtc, formatMMDate, PaginationPage } from '@/utils';
import {
  Calendar,
  File,
  Frame,
  HeartHandshakeIcon,
  MoveLeftIcon,
  Signature,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import * as yup from 'yup';
import { AddAvesSales } from './add-aves-sales';
import { AddSales } from './add-sales';
import { ListSales } from './list-sales';

export function Sales() {
  const schema = yup.object();
  const [pageItem, setPageItem] = useState(1);
  const [isAveSales, setIsAveSales] = useState(false);
  const [isAnimalSales, setIsAnimalSales] = useState(false);
  const { t, control, watch, setValue, locale } = useReactHookForm({
    schema,
  });
  const { back } = useRouter();
  const watchAnimalTypeId = watch('animalTypeId', '');
  const { data: user } = GetOneUserMeAPI();
  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: watchAnimalTypeId,
  });
  const {
    isLoading: isLoadingAssignedTypes,
    isError: isErrorAssignedTypes,
    data: dataAssignedTypes,
  } = GetAssignedTypesAPI({
    take: 20,
    sort: 'desc',
    sortBy: 'createdAt',
  });

  const [animalTypeName, setAnimalTypeName] = useState(
    dataAssignedTypes?.pages[0]?.data?.value[0].animalType?.name,
  );

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
    isPlaceholderData,
  } = GetSalesAPI({
    take: 10,
    pageItem,
    sort: 'desc',
    sortBy: 'createdAt',
    animalTypeId: watchAnimalTypeId,
    organizationId: user?.organizationId,
  });

  const [year, setYear] = useState<String>(`${dateTimeNowUtc().getFullYear()}`);
  const [months, setMonths] = useState<String>('');

  const { data: dataSalesAnalyticsDay } = SalesAnalyticAPI({
    year: String(year),
    months: String(months),
    animalTypeId: watchAnimalTypeId,
    organizationId: user?.organizationId,
  });

  const { data: dataSalesAnalyticsMonth } = SalesAnalyticAPI({
    year: String(year),
    animalTypeId: watchAnimalTypeId,
    organizationId: user?.organizationId,
  });

  const { data: dataSalesAnalyticsYear } = SalesAnalyticAPI({
    animalTypeId: watchAnimalTypeId,
    organizationId: user?.organizationId,
  });

  const chartConfig = {
    sum: {
      label: `${t.formatMessage({ id: 'AMOUNT.SOLD' })}`,
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
        title={`${user?.profile?.firstName} ${user?.profile?.lastName} - Sales`}
      >
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col md:gap-4 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card
                className="sm:col-span-2 dark:border-gray-800"
                x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>
                    {t.formatMessage({ id: 'SALES.TITLE' })}
                  </CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {t.formatMessage({ id: 'SALE.DESCRIPTION' })}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="dark:border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t.formatMessage({ id: 'SALES.NUMBER' })}
                  </CardTitle>
                  <Frame className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dataSales?.data?.total}
                  </div>
                </CardContent>
              </Card>
              <Card className="dark:border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t.formatMessage({ id: 'CONTRACT.SALES.NUMBER' })}
                  </CardTitle>
                  <Signature className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dataSales?.data?.salesContract}
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="dark:border-input dark:bg-background sm:col-span-2">
              <CardHeader>
                <div className="flex items-center">
                  {user?.role === 'SUPERADMIN' ? (
                    <div className="flex items-center">
                      <div className="gap-2 flex">
                        <Controller
                          control={control}
                          name="animalTypeId"
                          render={({ field: { value, onChange } }) => (
                            <Select
                              onValueChange={onChange}
                              name={'animalTypeId'}
                              value={value}
                            >
                              <SelectTrigger className="w-full space-x-2">
                                <SelectValue
                                  placeholder={t.formatMessage({
                                    id: 'SELECT.ANIMALTYPE',
                                  })}
                                />
                              </SelectTrigger>
                              <SelectContent className="dark:border-gray-800">
                                <SelectGroup>
                                  {isLoadingAssignedTypes ? (
                                    <LoadingFile />
                                  ) : isErrorAssignedTypes ? (
                                    <ErrorFile
                                      title="404"
                                      description="Error finding data please try again..."
                                    />
                                  ) : Number(
                                      dataAssignedTypes?.pages[0]?.data?.total,
                                    ) <= 0 ? (
                                    <ErrorFile description="Don't have location codes" />
                                  ) : (
                                    dataAssignedTypes?.pages
                                      .flatMap((page: any) => page?.data?.value)
                                      .map((item, index) => (
                                        <>
                                          <SelectItem
                                            key={index}
                                            value={item?.animalTypeId}
                                            onClick={() =>
                                              setAnimalTypeName(
                                                item?.animalTypeId,
                                              )
                                            }
                                          >
                                            {item?.animalType?.name}
                                          </SelectItem>
                                        </>
                                      ))
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                      {watchAnimalTypeId ? (
                        <div className="ml-4  items-center">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setValue('animalTypeId', '');
                            }}
                          >
                            {t.formatMessage({ id: 'ACTIVITY.FILTERALL' })}
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
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
                          {dataSalesAnalyticsYear?.data?.map(
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1"
                        >
                          <Calendar className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            {Number(months)
                              ? formatMMDate(Number(months), locale)
                              : 'select month'}
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="dark:border-gray-800 w-auto">
                        {dataSalesAnalyticsMonth?.data?.map(
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
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-[250px] w-full"
                >
                  <AreaChart
                    accessibilityLayer
                    data={dataSalesAnalyticsDay?.data}
                    margin={{
                      top: 12,
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
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      labelClassName="w-40"
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Area
                      dataKey={`sum`}
                      connectNulls={true}
                      type="natural"
                      isAnimationActive={true}
                      fill="var(--color-mobile)"
                      fillOpacity={0.4}
                      stroke="var(--color-mobile)"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <h2>
              <ButtonInput
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  back();
                }}
                icon={<MoveLeftIcon className="size-4" />}
              >
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {t.formatMessage({ id: 'UTIL.COME_BACK' })}
                </span>
              </ButtonInput>
            </h2>
            <Card
              x-chunk="dashboard-06-chunk-0"
              className="dark:border-gray-800 mt-0"
            >
              <CardHeader>
                {user?.role === 'SUPERADMIN' ? (
                  <div className="flex items-center">
                    <div className="gap-2 flex">
                      <Controller
                        control={control}
                        name="animalTypeId"
                        render={({ field: { value, onChange } }) => (
                          <Select
                            onValueChange={onChange}
                            name={'animalTypeId'}
                            value={value}
                          >
                            <SelectTrigger className="w-full space-x-2">
                              <SelectValue
                                placeholder={t.formatMessage({
                                  id: 'ANIMALTYPE',
                                })}
                              />
                            </SelectTrigger>
                            <SelectContent className="dark:border-gray-800">
                              <SelectGroup>
                                {isLoadingAssignedTypes ? (
                                  <LoadingFile />
                                ) : isErrorAssignedTypes ? (
                                  <ErrorFile
                                    title="404"
                                    description="Error finding data please try again..."
                                  />
                                ) : Number(
                                    dataAssignedTypes?.pages[0]?.data?.total,
                                  ) <= 0 ? (
                                  <ErrorFile description="Don't have location codes" />
                                ) : (
                                  dataAssignedTypes?.pages
                                    .flatMap((page: any) => page?.data?.value)
                                    .map((item, index) => (
                                      <>
                                        <SelectItem
                                          key={index}
                                          value={item?.animalTypeId}
                                          onClick={() =>
                                            setAnimalTypeName(
                                              item?.animalTypeId,
                                            )
                                          }
                                        >
                                          {item?.animalType?.name}
                                        </SelectItem>
                                      </>
                                    ))
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    {watchAnimalTypeId ? (
                      <div className="ml-4  items-center">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setValue('animalTypeId', '');
                          }}
                        >
                          {t.formatMessage({ id: 'ACTIVITY.FILTERALL' })}
                        </Button>
                      </div>
                    ) : null}

                    <div className="ml-auto flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">
                              {dataSales?.data?.total}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="dark:border-gray-800">
                            <p>
                              {dataSales?.data?.total}{' '}
                              {t.formatMessage({ id: 'ASSIGNED.TASKS' })}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 gap-1 text-sm"
                              onClick={() => handleExport()}
                            >
                              <File className="h-3.5 w-3.5" />
                              <span className="sr-only sm:not-sr-only">
                                Export to xlsx
                              </span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t.formatMessage({ id: 'SALES.EXPORT' })}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      {[
                        'Porciculture',
                        'Ovins',
                        'Cuniculture',
                        'Caprins',
                        'Bovins',
                      ].includes(animalType?.name) ? (
                        <Button
                          size="sm"
                          className="h-8 gap-1"
                          onClick={() => setIsAnimalSales(true)}
                        >
                          <HeartHandshakeIcon className="h-3.5 w-3.5  hover:shadow-xxl" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            {t.formatMessage({
                              id: 'ANIMALTYPE.ANIMALS.SALES.CREATE',
                            })}
                          </span>
                        </Button>
                      ) : [
                          'Dinde',
                          'Canard',
                          'Poulets Goliaths',
                          'Pondeuses',
                          'Poulets Brahma',
                          'Pintarde',
                          'Quails',
                          'Pisciculture',
                          'Poulet de chair',
                        ].includes(animalType?.name) ? (
                        <Button
                          size="sm"
                          className="h-8 gap-1"
                          onClick={() => setIsAveSales(true)}
                        >
                          <HeartHandshakeIcon className="h-3.5 w-3.5  hover:shadow-xxl" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            {t.formatMessage({
                              id: 'ANIMALTYPE.ANIMALS.SALES.CREATE',
                            })}
                          </span>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                ) : null}
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
                        {t.formatMessage({ id: 'ANIMALTYPE' })}
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
                    ) : Number(dataSales?.data?.total) <= 0 ? (
                      <ErrorFile description="Don't have tasks yet" />
                    ) : (
                      dataSales?.data?.value.map((item: any, index: number) => (
                        <>
                          <ListSales item={item} index={index} key={index} />
                        </>
                      ))
                    )}
                  </TableBody>
                </Table>
                <PaginationPage
                  setPageItem={setPageItem}
                  data={dataSales?.data}
                  pageItem={Number(pageItem)}
                  isPlaceholderData={isPlaceholderData}
                />
              </CardContent>
            </Card>
          </main>
          <DashboardFooter />
        </div>
        {isAnimalSales ? (
          <AddSales
            animalTypeId={animalType?.id}
            showModal={isAnimalSales}
            setShowModal={setIsAnimalSales}
          />
        ) : null}
        {isAveSales ? (
          <AddAvesSales
            animalTypeId={animalType?.id}
            showModal={isAveSales}
            setShowModal={setIsAveSales}
          />
        ) : null}
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Sales);
