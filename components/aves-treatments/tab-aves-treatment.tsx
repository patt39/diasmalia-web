import { GetTreatmentsAPI } from '@/api-site/treatment';
import { useInputState } from '@/components/hooks';

import { ButtonLoadMore, SearchInput } from '@/components/ui-setting';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ListFilter, Stethoscope } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
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
import { CreateBulkAvestreatments } from './create-bulk-aves-treatments';
import { ListAvesTreatments } from './list-aves-treatments';

const TabAvesTreatments = ({ animalTypeId }: { animalTypeId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [periode, setPeriode] = useState('');
  const { ref, inView } = useInView();
  const { t, search, handleSetSearch, userStorage } = useInputState();

  const {
    isLoading: isLoadingTreatments,
    isError: isErrorTreatments,
    data: dataTreatments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetTreatmentsAPI({
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
                    {dataTreatments?.pages[0]?.data?.total}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:border-gray-800">
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {dataTreatments?.pages[0]?.data?.total}{' '}
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
            <Button
              size="sm"
              className="h-8 gap-1"
              onClick={() => setIsOpen(true)}
            >
              <Stethoscope className="h-3.5 w-3.5  hover:shadow-xxl" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t.formatMessage({
                  id: 'ANIMALTYPE.ANIMALS.TREATMENT.AVES.CREATE',
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
                <TableHead>Name</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Dose</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingTreatments ? (
                <LoadingFile />
              ) : isErrorTreatments ? (
                <ErrorFile
                  title="404"
                  description="Error finding data please try again..."
                />
              ) : Number(dataTreatments?.pages[0]?.data?.total) <= 0 ? (
                <ErrorFile description="Don't have treatments yet please add" />
              ) : (
                dataTreatments?.pages
                  .flatMap((page: any) => page?.data?.value)
                  .map((item, index) => (
                    <>
                      <ListAvesTreatments
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
        <CreateBulkAvestreatments
          treatment={animalTypeId}
          showModal={isOpen}
          setShowModal={setIsOpen}
        />
      ) : null}
    </>
  );
};
export { TabAvesTreatments };
