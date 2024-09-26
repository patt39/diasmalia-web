/* eslint-disable @next/next/no-img-element */
import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import { GetFeedingsAPI } from '@/api-site/feedings';
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
import { PaginationPage } from '@/utils';
import { ListFilter } from 'lucide-react';
import { useState } from 'react';
import { SearchInput } from '../ui-setting';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { CreateFeedings } from './create-feedings';
import { ListFeedings } from './list-feedings';

const TabFeedings = ({ animalTypeId }: { animalTypeId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [periode, setPeriode] = useState('');
  const [pageItem, setPageItem] = useState(1);
  const { t, search, handleSetSearch, userStorage } = useInputState();

  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    periode,
    animalTypeId: animalTypeId,
  });

  const {
    isLoading: isLoadingFeedings,
    isError: isErrorFeedings,
    data: dataFeedings,
    isPlaceholderData,
  } = GetFeedingsAPI({
    search,
    periode,
    pageItem,
    take: 10,
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
                    {animalStatistics?.sumFeedings ?? 0}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:border-gray-800">
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {animalStatistics?.sumFeedings ?? 0}kg
                    {''} {t.formatMessage({ id: 'ANIMALTYPE.FEEDING' })}
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
              <DropdownMenuContent
                align="end"
                className="dark:border-gray-800 cursor-pointer"
              >
                <DropdownMenuCheckboxItem
                  onClick={() => setPeriode('')}
                  checked
                  className="cursor-pointer"
                >
                  {t.formatMessage({ id: 'ACTIVITY.FILTERALL' })}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  onClick={() => setPeriode('7')}
                  className="cursor-pointer"
                >
                  {t.formatMessage({ id: 'ACTIVITY.LAST7DAYS' })}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  onClick={() => setPeriode('15')}
                  className="cursor-pointer"
                >
                  {t.formatMessage({ id: 'ACTIVITY.LAST15DAYS' })}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  onClick={() => setPeriode('30')}
                  className="cursor-pointer"
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
                  {t.formatMessage({ id: 'TABFEEDING.FEEDTYPE' })}
                </TableHead>
                <TableHead>
                  {t.formatMessage({ id: 'TABFEEDING.QUANTITY' })}
                </TableHead>
                <TableHead>
                  {t.formatMessage({ id: 'TABFEEDING.PRODUCTIONPHASE' })}
                </TableHead>
                <TableHead>
                  {t.formatMessage({ id: 'VIEW.LOCATION' })}
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingFeedings ? (
                <LoadingFile />
              ) : isErrorFeedings ? (
                <ErrorFile
                  title="404"
                  description="Error finding data please try again..."
                />
              ) : Number(dataFeedings?.data?.total) <= 0 ? (
                <ErrorFile description="Don't have feedings created yet please do" />
              ) : (
                dataFeedings?.data?.value.map((item: any, index: number) => (
                  <>
                    <ListFeedings index={index} item={item} key={index} />
                  </>
                ))
              )}
            </TableBody>
          </Table>
          <PaginationPage
            setPageItem={setPageItem}
            data={dataFeedings?.data}
            pageItem={Number(pageItem)}
            isPlaceholderData={isPlaceholderData}
          />
        </CardContent>
      </main>
      <CreateFeedings
        feeding={animalTypeId}
        showModal={isOpen}
        setShowModal={setIsOpen}
      />
    </>
  );
};
export { TabFeedings };
