/* eslint-disable @next/next/no-img-element */
import { GetIncubationsAPI } from '@/api-site/incubations';
import { useInputState } from '@/components/hooks';
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
import { ListFilter } from 'lucide-react';
import { useState } from 'react';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { ListIncubations } from './list-incubations';

const TabIncubations = ({ animalTypeId }: { animalTypeId: string }) => {
  const { t, userStorage } = useInputState();
  const [pageItem, setPageItem] = useState(1);
  const [periode, setPeriode] = useState('');

  const {
    isLoading: isLoadingIncubations,
    isError: isErrorIncubations,
    data: dataIncubations,
    isPlaceholderData,
  } = GetIncubationsAPI({
    take: 10,
    periode,
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
          <div className="ml-auto flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    {dataIncubations?.data?.total}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:border-gray-800">
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {dataIncubations?.data?.total}{' '}
                    {t.formatMessage({ id: 'ANIMALTYPE.INCUBATION' })}{' '}
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
                <TableHead>Date</TableHead>
                <TableHead>
                  {t.formatMessage({ id: 'TABINCUBATION.QTYSTART' })}
                </TableHead>
                <TableHead>
                  {t.formatMessage({ id: 'TABINCUBATION.QTYEND' })}
                </TableHead>
                <TableHead>
                  {t.formatMessage({ id: 'TABINCUBATION.DUEDATE' })}
                </TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingIncubations ? (
                <LoadingFile />
              ) : isErrorIncubations ? (
                <ErrorFile
                  title="404"
                  description="Error finding data please try again..."
                />
              ) : Number(dataIncubations?.data?.total) <= 0 ? (
                <ErrorFile description="Don't have eggs in incubation" />
              ) : (
                dataIncubations?.data?.value.map((item: any, index: number) => (
                  <>
                    <ListIncubations index={index} item={item} key={index} />
                  </>
                ))
              )}
            </TableBody>
          </Table>
          <PaginationPage
            setPageItem={setPageItem}
            data={dataIncubations?.data}
            pageItem={Number(pageItem)}
            isPlaceholderData={isPlaceholderData}
          />
        </CardContent>
      </main>
    </>
  );
};
export { TabIncubations };
