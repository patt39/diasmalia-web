/* eslint-disable @next/next/no-img-element */
import { GetFarrowingsAPI } from '@/api-site/farrowings';
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
import { ListFilter, Origami } from 'lucide-react';
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
import { CreateOrUpdateFarrowings } from './create-or-update-farrowings';
import { ListFarrowings } from './list-farrowings';

const TabFarrowings = ({ animalTypeId }: { animalTypeId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, search, handleSetSearch } = useInputState();
  const [pageItem, setPageItem] = useState(1);
  const [periode, setPeriode] = useState('');

  const {
    isLoading: isLoadingFarrowings,
    isError: isErrorFarrowings,
    data: dataFarrowings,
    isPlaceholderData,
  } = GetFarrowingsAPI({
    search,
    periode,
    pageItem,
    take: 10,
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
                    {dataFarrowings?.data?.total}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {dataFarrowings?.data?.total}{' '}
                    {t.formatMessage({ id: 'ANIMALTYPE.FARROWING' })}{' '}
                  </p>
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
              <Origami className="h-3.5 w-3.5  hover:shadow-xxl" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t.formatMessage({
                  id: 'ANIMALTYPE.ANIMALS.FARROWING.CREATE',
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
                <TableHead>Code</TableHead>
                <TableHead>
                  {t.formatMessage({ id: 'TABFARROWING.LITTER' })}
                </TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingFarrowings ? (
                <LoadingFile />
              ) : isErrorFarrowings ? (
                <ErrorFile
                  title="404"
                  description="Error finding data please try again..."
                />
              ) : Number(dataFarrowings?.data?.total) <= 0 ? (
                <ErrorFile description="Don't have farrowings created yet please do" />
              ) : (
                dataFarrowings?.data?.value.map((item: any, index: number) => (
                  <>
                    <ListFarrowings item={item} index={index} key={index} />
                  </>
                ))
              )}
            </TableBody>
          </Table>
          <PaginationPage
            setPageItem={setPageItem}
            data={dataFarrowings?.data}
            pageItem={Number(pageItem)}
            isPlaceholderData={isPlaceholderData}
          />
        </CardContent>
      </main>
      <CreateOrUpdateFarrowings
        farrowing={animalTypeId}
        showModal={isOpen}
        setShowModal={setIsOpen}
      />
    </>
  );
};
export { TabFarrowings };
