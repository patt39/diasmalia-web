/* eslint-disable @next/next/no-img-element */
import { GetMilkingsAPI } from '@/api-site/milkings';
import { useInputState } from '@/components/hooks';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eclipse } from 'lucide-react';
import { useState } from 'react';
import { SearchInput } from '../ui-setting';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { CreateOrUpdateMilkings } from './create-or-update-milkings';
import { ListMilkings } from './list-milkings';

const TabMilkings = ({ animalTypeId }: { animalTypeId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingMilkings,
    isError: isErrorMilkings,
    data: dataMilkings,
  } = GetMilkingsAPI({
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
                    {dataMilkings?.pages[0]?.data?.total}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:border-gray-800">
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {dataMilkings?.pages[0]?.data?.total}{' '}
                    {t.formatMessage({ id: 'ANIMALTYPE.INCUBATION' })}{' '}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              size="sm"
              className="h-8 gap-1"
              onClick={() => setIsOpen(true)}
            >
              <Eclipse className="h-3.5 w-3.5  hover:shadow-xxl" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t.formatMessage({
                  id: 'ANIMALTYPE.ANIMALS.MILKINGS.CREATE',
                })}
              </span>
            </Button>
          </div>
        </div>
        <div className="mr-auto pt-4 items-center gap-2">
          <CardDescription>
            {t.formatMessage({ id: 'ANIMALTYPE.ISOLATION.DESCRIPTION' })}
          </CardDescription>
        </div>
      </CardHeader>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="dark:border-gray-800">
                <TableHead>Code</TableHead>
                <TableHead>
                  {t.formatMessage({ id: 'TABFEEDING.QUANTITY' })} (L)
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingMilkings ? (
                <LoadingFile />
              ) : isErrorMilkings ? (
                <ErrorFile
                  title="404"
                  description="Error finding data please try again..."
                />
              ) : Number(dataMilkings?.pages[0]?.data?.total) <= 0 ? (
                <ErrorFile description="Don't have active animals in lactation phase" />
              ) : (
                dataMilkings?.pages
                  .flatMap((page: any) => page?.data?.value)
                  .map((item, index) => (
                    <>
                      <ListMilkings index={index} item={item} key={index} />
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
      <CreateOrUpdateMilkings
        milking={animalTypeId}
        showModal={isOpen}
        setShowModal={setIsOpen}
      />
    </>
  );
};
export { TabMilkings };
