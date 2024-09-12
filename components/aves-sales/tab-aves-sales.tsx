import { useInputState } from '@/components/hooks';

import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import { exportSalesAPI, GetSalesAPI } from '@/api-site/sales';
import { GetOneUserMeAPI } from '@/api-site/user';
import { SearchInput } from '@/components/ui-setting';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PaginationPage } from '@/utils';
import { File, HeartHandshakeIcon, ListFilter } from 'lucide-react';
import { useState } from 'react';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { CreateOrUpdateAvesSales } from './create-or-update-aves-sales';
import { ListAvesSales } from './list-aves-sales';

const TabAvesSales = ({ animalTypeId }: { animalTypeId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [periode, setPeriode] = useState('');
  const [pageItem, setPageItem] = useState(1);
  const { t, search, handleSetSearch } = useInputState();
  const { data: user } = GetOneUserMeAPI();

  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: animalTypeId,
  });

  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    periode,
    animalTypeId: animalTypeId,
  });

  const {
    isLoading: isLoadingSales,
    isError: isErrorSales,
    data: dataSales,
    isPlaceholderData,
  } = GetSalesAPI({
    search,
    periode,
    pageItem,
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    animalTypeId: animalTypeId,
  });

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

  return (
    <>
      <CardHeader>
        <div className="flex items-center">
          <div className="mr-auto items-center gap-2">
            <SearchInput
              placeholder="Search by code"
              onChange={handleSetSearch}
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            {!['Pisciculture'].includes(animalType?.name) ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      {animalStatistics?.sumSaleChicks?.price?.toLocaleString(
                        'en-US',
                      ) || 0}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="dark:border-gray-800">
                    <p>
                      {t.formatMessage({ id: 'SOLD.FOR.CHICKS' })}{' '}
                      {animalStatistics?.sumSaleChicks?.price?.toLocaleString(
                        'en-US',
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      ) || 0}
                      {user?.profile?.currency?.symbol}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              ''
            )}
            {!['Poulet de chair', 'Pisciculture'].includes(animalType?.name) ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      {animalStatistics?.sumSaleEggs?.price?.toLocaleString(
                        'en-US',
                      ) || 0}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="dark:border-gray-800">
                    <p>
                      {t.formatMessage({ id: 'SOLD.FOR.EGGS' })}{' '}
                      {animalStatistics?.sumSaleEggs?.price?.toLocaleString(
                        'en-US',
                      ) || 0}
                      {user?.profile?.currency?.symbol}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              ''
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    {animalStatistics?.sumSaleChickens?.price?.toLocaleString(
                      'en-US',
                    ) || 0}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:border-gray-800">
                  {animalType?.name === 'Pisciculture' ? (
                    <p>
                      {t.formatMessage({ id: 'SOLD.FOR.FISH' })}{' '}
                      {animalStatistics?.sumSaleChickens?.price?.toLocaleString(
                        'en-US',
                      ) || 0}
                      {user?.profile?.currency?.symbol}
                    </p>
                  ) : (
                    <p>
                      {t.formatMessage({ id: 'SOLD.FOR.CHICKENS' })}{' '}
                      {animalStatistics?.sumSaleChickens?.price?.toLocaleString(
                        'en-US',
                      ) || 0}
                      {user?.profile?.currency?.symbol}
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">{dataSales?.data?.total}</Button>
                </TooltipTrigger>
                <TooltipContent className="dark:border-gray-800">
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {t.formatMessage({ id: 'MENU.SALES' })}{' '}
                    {dataSales?.data?.total || '0'}
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
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.formatMessage({ id: 'SALES.EXPORT' })}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:border-gray-800">
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
            <Button
              size="sm"
              className="h-8 gap-1"
              onClick={() => setIsOpen(true)}
            >
              <HeartHandshakeIcon className="h-3.5 w-3.5  hover:shadow-xxl" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t.formatMessage({
                  id: 'ANIMALTYPE.ANIMALS.SALES.CREATE',
                })}
              </span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="dark:border-gray-800">
                <TableHead>
                  {t.formatMessage({ id: 'SALE.CUSTOMER' })}
                </TableHead>
                <TableHead>{t.formatMessage({ id: 'SALE.CONTACT' })}</TableHead>
                {!['Pisciculture'].includes(animalType?.name) ? (
                  <TableHead>Details</TableHead>
                ) : (
                  ''
                )}
                <TableHead>
                  {t.formatMessage({ id: 'SALE.QUANTITY' })}
                </TableHead>
                <TableHead>{t.formatMessage({ id: 'SALE.PRICE' })}</TableHead>
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
                <ErrorFile description="Don't have animals soled yet please add" />
              ) : (
                dataSales?.data?.value.map((item: any, index: number) => (
                  <>
                    <ListAvesSales item={item} index={index} key={index} />
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
      </main>
      <CreateOrUpdateAvesSales
        sale={animalTypeId}
        showModal={isOpen}
        setShowModal={setIsOpen}
      />
    </>
  );
};
export { TabAvesSales };
