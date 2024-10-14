/* eslint-disable @next/next/no-img-element */
import { GetEggHarvestingsAPI } from '@/api-site/eggharvesting';
import { useInputState } from '@/components/hooks';
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
import { SearchInput } from '../ui-setting';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ListEggHarvestings } from './list-egg-harvestings';

const TabEggHarvestings = ({ animalTypeId }: { animalTypeId: string }) => {
  const [periode, setPeriode] = useState('');
  const [pageItem, setPageItem] = useState(1);
  const { t, search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingEggHavestings,
    isError: isErrorEgghavestings,
    data: dataEggHavestings,
    isPlaceholderData,
  } = GetEggHarvestingsAPI({
    search,
    periode,
    take: 10,
    pageItem,
    sort: 'desc',
    sortBy: 'createdAt',
    animalTypeId: animalTypeId,
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
                    {t.formatMessage({ id: 'WHAT.TODO' })}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:border-gray-800">
                  <p>
                    {t.formatMessage({
                      id: 'ANIMALTYPE.EGGHAVESTING.DESCRIPTION',
                    })}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    {dataEggHavestings?.data?.total}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:border-gray-800">
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {dataEggHavestings?.data?.total}{' '}
                    {t.formatMessage({ id: 'ANIMALTYPE.EGGHAVESTING' })}
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
                          : t.formatMessage({
                              id: 'ACTIVITY.LAST30DAYS',
                            })}
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
          </div>
        </div>
      </CardHeader>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="dark:border-gray-800">
                <TableHead>Code</TableHead>
                <TableHead>
                  {t.formatMessage({ id: 'TABEGGHAVESTING.NUMBER' })}
                </TableHead>
                <TableHead>
                  {t.formatMessage({ id: 'TABEGGHAVESTING.SIZE' })}
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingEggHavestings ? (
                <LoadingFile />
              ) : isErrorEgghavestings ? (
                <ErrorFile
                  title="404"
                  description="Error finding data please try again..."
                />
              ) : Number(dataEggHavestings?.data?.total) <= 0 ? (
                <ErrorFile description="Don't have Eggharvestings created yet please do" />
              ) : (
                dataEggHavestings?.data?.value.map(
                  (item: any, index: number) => (
                    <>
                      <ListEggHarvestings
                        item={item}
                        index={index}
                        key={index}
                      />
                    </>
                  ),
                )
              )}
            </TableBody>
          </Table>
          <PaginationPage
            setPageItem={setPageItem}
            data={dataEggHavestings?.data}
            pageItem={Number(pageItem)}
            isPlaceholderData={isPlaceholderData}
          />
        </CardContent>
      </main>
    </>
  );
};
export { TabEggHarvestings };
