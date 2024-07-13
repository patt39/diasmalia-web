/* eslint-disable @next/next/no-img-element */
import { GetWeaningsAPI } from '@/api-site/weanings';
import { useInputState } from '@/components/hooks';
import { SearchInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatDateDDMMYY } from '@/utils';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { MilkOff, MoreHorizontal } from 'lucide-react';
import { useIntl } from 'react-intl';

const TabWeanings = ({ animalTypeId }: { animalTypeId: string }) => {
  const t = useIntl();
  const { handleSetSearch, isOpen, setIsOpen, setLoading } = useInputState();

  const {
    isLoading: isLoadingWeanings,
    isError: isErrorWeanings,
    data: dataWeanings,
  } = GetWeaningsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    animalTypeId: animalTypeId,
  });

  return (
    <>
      <CardHeader>
        <div className="flex mb-4 items-center">
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
                    {dataWeanings?.pages[0]?.data?.total}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}
                    {dataWeanings?.pages[0]?.data?.total}{' '}
                    {t.formatMessage({
                      id: 'ANIMALTYPE.TOOLTIP.ANIMALS',
                    })}{' '}
                    en {t.formatMessage({ id: 'ANIMALTYPE.WEANINGS' })}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button size="sm" className="h-8 gap-1">
              <MilkOff className="h-3.5 w-3.5  hover:shadow-xxl" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t.formatMessage({ id: 'ANIMALTYPE.ANIMALS.WEANINGS.CREATE' })}
              </span>
            </Button>
          </div>
        </div>
        <div className="mr-auto items-center gap-2">
          <CardDescription>
            {t.formatMessage({
              id: 'ANIMALTYPE.WEANING.DESCRIPTION',
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
                  {t.formatMessage({ id: 'TABWEANING.FARROWING' })}
                </TableHead>
                <TableHead>
                  {t.formatMessage({ id: 'TABWEANING.WEANING' })}
                </TableHead>
                <TableHead>
                  {t.formatMessage({ id: 'TABWEANING.STATUS' })}
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingWeanings ? (
                <LoadingFile />
              ) : isErrorWeanings ? (
                <ErrorFile
                  title="404"
                  description="Error finding data please try again..."
                />
              ) : Number(dataWeanings?.pages[0]?.data?.total) <= 0 ? (
                <ErrorFile description="Don't have weanings created yet please do" />
              ) : (
                dataWeanings?.pages
                  .flatMap((page: any) => page?.data?.value)
                  .map((item, index) => (
                    <>
                      <TableRow className="dark:border-gray-800">
                        <TableCell className="font-medium">
                          {item.animal.code}
                        </TableCell>
                        <TableCell>{item.farrowing.litter}</TableCell>
                        <TableCell>{item.litter}</TableCell>
                        <TableCell>
                          {item.litter === item.farrowing.litter ? (
                            <Badge className="text-xs" variant="default">
                              Good Mother
                            </Badge>
                          ) : (
                            <Badge className="text-xs" variant="secondary">
                              Not good
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {formatDateDDMMYY(item?.createdAt as Date)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">
                                  {t.formatMessage({ id: 'TABANIMAL.MENU' })}
                                </span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                {t.formatMessage({ id: 'TABANIMAL.DELETE' })}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
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
    </>
  );
};
export default TabWeanings;
