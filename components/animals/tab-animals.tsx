/* eslint-disable @next/next/no-img-element */
import { GetAnimalsAPI } from '@/api-site/animals';
import { useInputState } from '@/components/hooks';
import { SearchInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { Button } from '@/components/ui/button';
import { CardHeader } from '@/components/ui/card';
import { Command, CommandList } from '@/components/ui/command';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { ListFilter, PawPrint } from 'lucide-react';
import { ListAnimals } from './list-animals';

const TabAnimals = ({ animalTypeId }: { animalTypeId: string }) => {
  const { t, search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingAnimals,
    isError: isErrorAnimals,
    data: dataAnimals,
  } = GetAnimalsAPI({
    search,
    take: 10,
    sort: 'asc',
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
                    {dataAnimals?.pages[0]?.data?.total}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {dataAnimals?.pages[0]?.data?.total}{' '}
                    {dataAnimals?.pages[0]?.data?.total > 1
                      ? `${t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP.ANIMALS' })}`
                      : `${t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP.ANIMAL' })}`}
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
              <DropdownMenuContent align="end">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    {t.formatMessage({ id: 'ANIMALTYPE.GENDER' })}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="p-0">
                    <Command>
                      <CommandList>
                        <DropdownMenuCheckboxItem>
                          {t.formatMessage({ id: 'ANIMALTYPE.MALE' })}
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          {t.formatMessage({ id: 'ANIMALTYPE.FEMALE' })}
                        </DropdownMenuCheckboxItem>
                      </CommandList>
                    </Command>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    {t.formatMessage({ id: 'TABWEANING.STATUS' })}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="p-0">
                    <Command>
                      <CommandList>
                        <DropdownMenuCheckboxItem>
                          {t.formatMessage({ id: 'ANIMAL.ACTIVE' })}
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          {t.formatMessage({ id: 'ANIMAL.SOLD' })}
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          {t.formatMessage({ id: 'ANIMALTYPE.DEATHS' })}
                        </DropdownMenuCheckboxItem>
                      </CommandList>
                    </Command>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    {t.formatMessage({ id: 'ANIMALTYPE.PRODUCTIONPHASE' })}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="p-0">
                    <Command>
                      <CommandList>
                        <DropdownMenuCheckboxItem>
                          {t.formatMessage({ id: 'PRODUCTIONTYPE.GROWTH' })}
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          {t.formatMessage({ id: 'ANIMALTYPE.FATTENING' })}
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          {t.formatMessage({
                            id: 'PRODUCTIONTYPE.REPRODUCTION',
                          })}
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          {t.formatMessage({ id: 'ANIMALTYPE.GESTATIONS' })}
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          {t.formatMessage({ id: 'PRODUCTIONTYPE.LACTATION' })}
                        </DropdownMenuCheckboxItem>
                      </CommandList>
                    </Command>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="h-8 gap-1">
              <PawPrint className="h-3.5 w-3.5  hover:shadow-xxl" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t.formatMessage({ id: 'ANIMALTYPE.ANIMALS.CREATE' })}
              </span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <section className="mt-8 mb-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 xl:grid-cols-3 sm:gap-8 xl:gap-12">
            {isLoadingAnimals ? (
              <LoadingFile />
            ) : isErrorAnimals ? (
              <ErrorFile
                title="404"
                description="Error finding data please try again..."
              />
            ) : Number(dataAnimals?.pages[0]?.data?.total) <= 0 ? (
              <ErrorFile description="Don't have animals created yet please do" />
            ) : (
              dataAnimals?.pages
                .flatMap((page: any) => page?.data?.value)
                .map((item, index) => (
                  <>
                    <ListAnimals index={index} item={item} key={index} />
                  </>
                ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export { TabAnimals };
