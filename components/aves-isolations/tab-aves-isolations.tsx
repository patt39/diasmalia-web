/* eslint-disable @next/next/no-img-element */
import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import { GetIsolationsAPI } from '@/api-site/isolations';
import { useInputState } from '@/components/hooks';
import { ButtonLoadMore, SearchInput } from '@/components/ui-setting';
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
import { ListFilter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useIntl } from 'react-intl';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { CreateOrUpdateAvesIsolations } from './create-or-update-aves-isolations';
import { ListAvesIsolations } from './list-aves-isolations';

const TabAvesIsolations = ({ animalTypeId }: { animalTypeId: string }) => {
  const t = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const [periode, setPeriode] = useState('');
  const { ref, inView } = useInView();
  const { search, handleSetSearch, userStorage } = useInputState();

  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    periode,
    animalTypeId: animalTypeId,
    organizationId: userStorage?.organizationId,
  });

  const {
    isLoading: isLoadingIsolations,
    isError: isErrorIsolations,
    data: dataIsolations,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetIsolationsAPI({
    search,
    periode,
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    animalTypeId: animalTypeId,
    organizationId: userStorage?.organizationId,
  });

  useEffect(() => {
    let fetching = false;
    if (inView) {
      fetchNextPage();
    }
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

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
                  <p>{t.formatMessage({ id: 'ISOLATIONS.WHATODO' })}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    {animalStatistics?.sumIsolations ?? 0}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:border-gray-800">
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {animalStatistics?.sumIsolations ?? 0}{' '}
                    {t.formatMessage({ id: 'ANIMAL.ISOLATED' })}{' '}
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
                  onClick={() => setPeriode('')}
                  checked
                  className="cursor-pointer"
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
                  {t.formatMessage({ id: 'AVESDEATH.NUMBER' })}
                </TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingIsolations ? (
                <LoadingFile />
              ) : isErrorIsolations ? (
                <ErrorFile
                  title="404"
                  description="Error finding data please try again..."
                />
              ) : Number(dataIsolations?.pages[0]?.data?.total) <= 0 ? (
                <ErrorFile description="Don't have isolated animals" />
              ) : (
                dataIsolations?.pages
                  .flatMap((page: any) => page?.data?.value)
                  .map((item: any, index: any) => (
                    <>
                      <ListAvesIsolations
                        item={item}
                        index={index}
                        key={index}
                      />
                    </>
                  ))
              )}
            </TableBody>
          </Table>
          {hasNextPage && (
            <div className="mx-auto mt-4 justify-center text-center">
              <ButtonLoadMore
                ref={ref}
                isFetchingNextPage={isFetchingNextPage}
                onClick={() => fetchNextPage()}
              />
            </div>
          )}
        </CardContent>
      </main>
      {isOpen ? (
        <CreateOrUpdateAvesIsolations
          isolation={animalTypeId}
          showModal={isOpen}
          setShowModal={setIsOpen}
        />
      ) : null}
    </>
  );
};
export { TabAvesIsolations };
