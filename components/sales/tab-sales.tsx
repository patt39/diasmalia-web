import { exportSalesAPI, GetSalesAPI } from '@/api-site/sales';
import { useInputState } from '@/components/hooks';

import { SearchInput } from '@/components/ui-setting';
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
import { File, Stethoscope } from 'lucide-react';
import { CreateOrUpdateSales } from './create-or-update-sales';
import { ListSales } from './list-sales';

const TabSales = ({ animalTypeId }: { animalTypeId: string }) => {
  const { search, handleSetSearch } = useInputState();
  const { t, isOpen, setIsOpen } = useInputState();

  const handleExport = async () => {
    try {
      const response = await exportSalesAPI();
      const link = document.createElement('a');
      link.href = response.config.url;
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
    }
  };

  const {
    isLoading: isLoadingSales,
    isError: isErrorSales,
    data: dataSales,
  } = GetSalesAPI({
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
              placeholder="Search by customer"
              onChange={handleSetSearch}
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    {dataSales?.pages[0]?.data?.total}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {dataSales?.pages[0]?.data?.total || '0'}{' '}
                    {t.formatMessage({ id: 'MENU.SALES' })}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                    onClick={() => handleExport()}
                  >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.formatMessage({ id: 'SALES.EXPORT' })}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              size="sm"
              className="h-8 gap-1"
              onClick={() => setIsOpen(true)}
            >
              <Stethoscope className="h-3.5 w-3.5  hover:shadow-xxl" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t.formatMessage({
                  id: 'ANIMALTYPE.ANIMALS.SALES.CREATE',
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
                <TableHead>
                  {t.formatMessage({ id: 'SALE.CUSTOMER' })}
                </TableHead>
                <TableHead>{t.formatMessage({ id: 'SALE.CONTACT' })}</TableHead>
                <TableHead>{t.formatMessage({ id: 'SALE.METHOD' })}</TableHead>
                <TableHead>
                  {t.formatMessage({ id: 'SALE.QUANTITY' })}
                </TableHead>
                <TableHead>{t.formatMessage({ id: 'SALE.PRICE' })}</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingSales ? (
                <LoadingFile />
              ) : isErrorSales ? (
                <ErrorFile
                  title="404"
                  description="Error finding data please try again..."
                />
              ) : Number(dataSales?.pages[0]?.data?.total) <= 0 ? (
                <ErrorFile description="Don't have sales yet" />
              ) : (
                dataSales?.pages
                  .flatMap((page: any) => page?.data?.value)
                  .map((item, index) => (
                    <>
                      <ListSales item={item} index={index} key={index} />
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
      <CreateOrUpdateSales
        sale={animalTypeId}
        showModal={isOpen}
        setShowModal={setIsOpen}
      />
    </>
  );
};
export { TabSales };
