/* eslint-disable @next/next/no-img-element */
import { GetFatteningsAPI } from '@/api-site/fattenings';
import { useInputState } from '@/components/hooks';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
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
import { Anvil } from 'lucide-react';
import { useState } from 'react';
import { SearchInput } from '../ui-setting';
import { CreateOrUpdateFattenings } from './create-or-update-fattenings';
import { ListFattenings } from './list-fattenings';

const TabFattenings = ({ animalTypeId }: { animalTypeId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingFattenings,
    isError: isErrorFattenings,
    data: dataFattenings,
  } = GetFatteningsAPI({
    search,
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
                    {dataFattenings?.pages[0]?.data?.total}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {dataFattenings?.pages[0]?.data?.total}{' '}
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP.ANIMALS' })} en{' '}
                    {t.formatMessage({ id: 'ANIMALTYPE.FATTENING' })}{' '}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              size="sm"
              className="h-8 gap-1"
              onClick={() => setIsOpen(true)}
            >
              <Anvil className="h-3.5 w-3.5  hover:shadow-xxl" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t.formatMessage({
                  id: 'ANIMALTYPE.ANIMALS.FATTENINGS.CREATE',
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
                  {t.formatMessage({ id: 'TABFATTENING.INITIALWEIGHT' })} (kg)
                </TableHead>
                <TableHead>
                  {t.formatMessage({ id: 'TABFATTENING.ACTUALWEIGHTEDIT' })}{' '}
                  (kg)
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>
                  {t.formatMessage({ id: 'TABFATTENING.UPDATEDWEIGHT' })}
                </TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingFattenings ? (
                <LoadingFile />
              ) : isErrorFattenings ? (
                <ErrorFile
                  title="404"
                  description="Error finding data please try again..."
                />
              ) : Number(dataFattenings?.pages[0]?.data?.total) <= 0 ? (
                <ErrorFile description="Don't have fattenings created yet please do" />
              ) : (
                dataFattenings?.pages
                  .flatMap((page: any) => page?.data?.value)
                  .map((item, index) => (
                    <>
                      <ListFattenings index={index} item={item} key={index} />
                    </>
                  ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </main>
      <CreateOrUpdateFattenings
        fattening={animalTypeId}
        showModal={isOpen}
        setShowModal={setIsOpen}
      />
    </>
  );
};
export { TabFattenings };