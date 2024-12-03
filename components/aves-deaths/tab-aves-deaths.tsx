/* eslint-disable @next/next/no-img-element */
import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import { GetDeathsAPI } from '@/api-site/deaths';
import { useInputState } from '@/components/hooks';
import { SearchInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader } from '@/components/ui/card';
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
import { PaginationPage } from '@/utils';
import { ListFilter } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { CreateOrUpdateAvesDeaths } from './create-or-update-aves-deaths';
import { ListAvesDeaths } from './list-aves-deaths';

const TabAvesDeaths = ({ animalTypeId }: { animalTypeId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [periode, setPeriode] = useState('');
  const [pageItem, setPageItem] = useState(1);
  const { t, search, handleSetSearch, userStorage } = useInputState();

  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    periode,
    animalTypeId: animalTypeId,
    organizationId: userStorage?.organizationId,
  });

  const {
    isLoading: isLoadingDeaths,
    isError: isErrorDeaths,
    data: dataDeaths,
    isPlaceholderData,
  } = GetDeathsAPI({
    search,
    periode,
    take: 10,
    pageItem,
    sort: 'desc',
    sortBy: 'createdAt',
    animalTypeId: animalTypeId,
    organizationId: userStorage?.organizationId,
  });

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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    {animalStatistics?.sumDeaths ?? 0}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:border-gray-800">
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {animalStatistics?.sumDeaths ?? 0}{' '}
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP.ANIMALS' })}{' '}
                    {t.formatMessage({ id: 'ANIMALTYPE.DEATHS' })}{' '}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    {periode == ''
                      ? t.formatMessage({ id: 'ACTIVITY.FILTERALL' })
                      : periode == '7'
                        ? t.formatMessage({ id: 'ACTIVITY.LAST7DAYS' })
                        : periode == '15'
                          ? t.formatMessage({ id: 'ACTIVITY.LAST15DAYS' })
                          : t.formatMessage({ id: 'ACTIVITY.LAST30DAYS' })}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:border-gray-800">
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
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="dark:border-gray-800">
                <TableHead>Bande</TableHead>
                <TableHead>
                  {t.formatMessage({ id: 'AVESDEATH.NUMBER' })}
                </TableHead>
                <TableHead>Cause</TableHead>
                <TableHead>
                  {t.formatMessage({ id: 'TABFEEDING.PRODUCTIONPHASE' })}
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingDeaths ? (
                <LoadingFile />
              ) : isErrorDeaths ? (
                <ErrorFile
                  title="404"
                  description="Error finding data please try again..."
                />
              ) : Number(dataDeaths?.data?.total) <= 0 ? (
                <ErrorFile description="Don't have death birds created yet" />
              ) : (
                dataDeaths?.data?.value.map((item: any, index: number) => (
                  <>
                    <ListAvesDeaths item={item} index={index} key={index} />
                  </>
                ))
              )}
            </TableBody>
          </Table>
          <PaginationPage
            setPageItem={setPageItem}
            data={dataDeaths?.data}
            pageItem={Number(pageItem)}
            isPlaceholderData={isPlaceholderData}
          />
        </CardContent>
      </main>
      {isOpen ? (
        <CreateOrUpdateAvesDeaths
          death={animalTypeId}
          showModal={isOpen}
          setShowModal={setIsOpen}
        />
      ) : null}
    </>
  );
};
export { TabAvesDeaths };
