/* eslint-disable @next/next/no-img-element */
import { GetEggHarvestingsAPI } from '@/api-site/eggharvesting';
import { useInputState } from '@/components/hooks';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Egg } from 'lucide-react';
import { useState } from 'react';
import { SearchInput } from '../ui-setting';
import { CreateOrUpdateEggHarvestings } from './create-or-update-egg-harvestings';
import { ListEggHarvestings } from './list-egg-harvestings';

const TabEggHarvestings = ({ animalTypeId }: { animalTypeId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingEggHavestings,
    isError: isErrorEgghavestings,
    data: dataEggHavestings,
  } = GetEggHarvestingsAPI({
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
                    {dataEggHavestings?.pages[0]?.data?.total}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {dataEggHavestings?.pages[0]?.data?.total}{' '}
                    {t.formatMessage({ id: 'ANIMALTYPE.EGGHAVESTING' })}
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
                  id: 'ANIMALTYPE.ANIMALS.EGGHARVESTINGS.CREATE',
                })}
              </span>
            </Button>
          </div>
        </div>
        <div className="mr-auto items-center gap-2 pt-4">
          <CardDescription>
            {t.formatMessage({
              id: 'ANIMALTYPE.EGGHAVESTING.DESCRIPTION',
            })}
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
              ) : Number(dataEggHavestings?.pages[0]?.data?.total) <= 0 ? (
                <ErrorFile description="Don't have Eggharvestings created yet please do" />
              ) : (
                dataEggHavestings?.pages
                  .flatMap((page: any) => page?.data?.value)
                  .map((item, index) => (
                    <>
                      <ListEggHarvestings
                        item={item}
                        index={index}
                        key={index}
                      />
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
      <CreateOrUpdateEggHarvestings
        eggHarvesting={animalTypeId}
        showModal={isOpen}
        setShowModal={setIsOpen}
      />
    </>
  );
};
export { TabEggHarvestings };
