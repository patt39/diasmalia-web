/* eslint-disable @next/next/no-img-element */
import { GetMilkingsAPI } from '@/api-site/milkings';
import { useInputState } from '@/components/hooks';
import { SearchInput } from '@/components/ui-setting';
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
import { Milk, MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-react';
import { useIntl } from 'react-intl';

const TabMilkings = ({ animalTypeId }: { animalTypeId: string }) => {
  const t = useIntl();
  const { search, handleSetSearch, isOpen, setIsOpen, setLoading } =
    useInputState();

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
                    {dataMilkings?.pages[0]?.data?.total}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {dataMilkings?.pages[0]?.data?.total}{' '}
                    {t.formatMessage({ id: 'ANIMALTYPE.MILKINGS' })}{' '}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button size="sm" className="h-8 gap-1">
              <Milk className="h-3.5 w-3.5  hover:shadow-xxl" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t.formatMessage({
                  id: 'ANIMALTYPE.ANIMALS.MILKINGS.CREATE',
                })}
              </span>
            </Button>
          </div>
        </div>
        <div className="mr-auto items-center gap-2">
          <CardDescription>
            {t.formatMessage({ id: 'ANIMALTYPE.FATTENING.DESCRIPTION' })}
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
                <ErrorFile description="Don't have milkings created yet please do" />
              ) : (
                dataMilkings?.pages
                  .flatMap((page: any) => page?.data?.value)
                  .map((item, index) => (
                    <>
                      <TableRow className="dark:border-gray-800">
                        <TableCell className="font-medium">
                          {item.animal.code}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
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
                                <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                                <span className="ml-2 cursor-pointer hover:text-indigo-600">
                                  {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                                </span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                                <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                                <span className="ml-2 cursor-pointer hover:text-red-600">
                                  {t.formatMessage({ id: 'TABANIMAL.DELETE' })}
                                </span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      {/* <ActionModalDialog
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        onClick={() => deleteItem(item)}
                      /> */}
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
export default TabMilkings;
