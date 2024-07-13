/* eslint-disable @next/next/no-img-element */
import { GetIncubationsAPI } from '@/api-site/incubations';
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
import { Egg } from 'lucide-react';
import { useState } from 'react';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { CreateOrUpdateIncubations } from './create-or-update-incubations';
import { ListIncubations } from './list-incubations';

const TabIncubations = ({ animalTypeId }: { animalTypeId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingIncubations,
    isError: isErrorIncubations,
    data: dataIncubations,
  } = GetIncubationsAPI({
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
            <CardDescription>
              {t.formatMessage({
                id: 'ANIMALTYPE.EGGHAVESTING.DESCRIPTION',
              })}
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    {dataIncubations?.pages[0]?.data?.total}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {dataIncubations?.pages[0]?.data?.total}{' '}
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
              <Egg className="h-3.5 w-3.5  hover:shadow-xxl" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t.formatMessage({
                  id: 'ANIMALTYPE.ANIMALS.INCUBATION.CREATE',
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
              ) : Number(dataIncubations?.pages[0]?.data?.total) <= 0 ? (
                <ErrorFile description="Don't have eggs in incubation" />
              ) : (
                dataIncubations?.pages
                  .flatMap((page: any) => page?.data?.value)
                  .map((item, index) => (
                    <>
                      <ListIncubations index={index} item={item} key={index} />
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
      <CreateOrUpdateIncubations
        incubation={animalTypeId}
        showModal={isOpen}
        setShowModal={setIsOpen}
      />
    </>
  );
};
export { TabIncubations };
