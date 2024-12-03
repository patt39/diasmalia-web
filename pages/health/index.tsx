import { LayoutDashboard } from '@/components/layouts/dashboard';

import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import { GetAssignedTypesAPI } from '@/api-site/assigned-type';
import { GetHealthsAPI } from '@/api-site/health';
import { useInputState, useReactHookForm } from '@/components/hooks';
import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { ButtonInput, ButtonLoadMore } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BriefcaseMedical, Cross, MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import * as yup from 'yup';
import { CreateHealth } from './create-or-update-health';
import { ListHealth } from './list-health';

const schema = yup.object();
export function TabHealth() {
  const { back } = useRouter();
  const { t, isOpen, setIsOpen, userStorage } = useInputState();
  const { ref, inView } = useInView();
  const { control, watch, setValue } = useReactHookForm({
    schema,
  });
  const watchAnimalTypeId = watch('animalTypeId', '');
  const {
    isLoading: isLoadingAssignedTypes,
    isError: isErrorAssignedTypes,
    data: dataAssignedTypes,
  } = GetAssignedTypesAPI({
    take: 20,
    sort: 'desc',
    sortBy: 'createdAt',
  });

  const [animalTypeName, setAnimalTypeName] = useState(
    dataAssignedTypes?.pages[0]?.data?.value[0].animalType?.name,
  );

  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    animalTypeId: dataAssignedTypes?.pages[0]?.data?.value[0].animalTypeId,
    organizationId: userStorage?.organizationId,
  });

  const {
    isLoading: isLoadingMaterials,
    isError: isErrorMaterials,
    data: dataMaterials,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetHealthsAPI({
    take: 20,
    sort: 'desc',
    sortBy: 'createdAt',
    animalTypeId: watchAnimalTypeId,
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
      <LayoutDashboard
        title={`${userStorage?.user?.profile?.firstName} ${userStorage?.user?.profile?.lastName} - Health box`}
      >
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-4 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card
                className="sm:col-span-2 dark:border-gray-800"
                x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>
                    {t.formatMessage({ id: 'HEALTH.TITLE' })}
                  </CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {t.formatMessage({ id: 'HEALTH.DESCRIPTION' })}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card
                x-chunk="dashboard-05-chunk-2"
                className=" dark:border-gray-800"
              >
                <CardHeader className="pb-2">
                  <CardDescription>
                    {t.formatMessage({ id: 'MEDECINES.AVAILABLE' })}
                  </CardDescription>
                  <CardTitle className="text-4xl">
                    {animalStatistics?.sumMedications ?? 0}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card
                x-chunk="dashboard-05-chunk-2"
                className=" dark:border-gray-800"
              >
                <CardHeader className="justify-items-center items-center">
                  <Cross className="h-10 w-10 mt-2 hover:shadow-xxl relative inline-flex animate-ping text-green-400" />
                </CardHeader>
              </Card>
            </div>
            <h2>
              <ButtonInput
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  back();
                }}
                icon={<MoveLeftIcon className="size-4" />}
              >
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {t.formatMessage({ id: 'UTIL.COME_BACK' })}
                </span>
              </ButtonInput>
            </h2>
            <Card
              x-chunk="dashboard-06-chunk-0"
              className="dark:border-gray-800"
            >
              <CardHeader>
                <div className="flex items-center">
                  <div className="grid gap-2">
                    <Controller
                      control={control}
                      name="animalTypeId"
                      render={({ field: { value, onChange } }) => (
                        <Select
                          onValueChange={onChange}
                          name={'animalTypeId'}
                          value={value}
                        >
                          <SelectTrigger className="w-full space-x-2">
                            <SelectValue
                              placeholder={t.formatMessage({
                                id: 'ANIMALTYPE',
                              })}
                            />
                          </SelectTrigger>
                          <SelectContent className="dark:border-gray-800">
                            <SelectGroup>
                              {isLoadingAssignedTypes ? (
                                <LoadingFile />
                              ) : isErrorAssignedTypes ? (
                                <ErrorFile
                                  title="404"
                                  description="Error finding data please try again..."
                                />
                              ) : Number(
                                  dataAssignedTypes?.pages[0]?.data?.total,
                                ) <= 0 ? (
                                <ErrorFile description="Don't have location codes" />
                              ) : (
                                dataAssignedTypes?.pages
                                  .flatMap((page: any) => page?.data?.value)
                                  .map((item, index) => (
                                    <>
                                      <SelectItem
                                        key={index}
                                        value={item?.animalTypeId}
                                        onClick={() =>
                                          setAnimalTypeName(item?.animalTypeId)
                                        }
                                      >
                                        {item?.animalType?.name}
                                      </SelectItem>
                                    </>
                                  ))
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  {watchAnimalTypeId ? (
                    <div className="ml-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setValue('animalTypeId', '');
                        }}
                      >
                        {t.formatMessage({ id: 'ACTIVITY.FILTERALL' })}
                      </Button>
                    </div>
                  ) : null}
                  <div className="ml-auto flex items-center gap-2">
                    <Button
                      size="sm"
                      className="h-8 gap-1"
                      onClick={() => setIsOpen(true)}
                    >
                      <BriefcaseMedical className="h-3.5 w-3.5  hover:shadow-xxl" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        {t.formatMessage({ id: 'ADD.MEDECINE' })}
                      </span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="dark:border-gray-800">
                      <TableHead></TableHead>
                      <TableHead>Produit</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingMaterials ? (
                      <LoadingFile />
                    ) : isErrorMaterials ? (
                      <ErrorFile
                        title="404"
                        description="Error finding data please try again..."
                      />
                    ) : Number(dataMaterials?.pages[0]?.data?.total) <= 0 ? (
                      <ErrorFile description="Your box is empty" />
                    ) : (
                      dataMaterials?.pages
                        .flatMap((page: any) => page?.data?.value)
                        .map((item, index) => (
                          <>
                            <ListHealth item={item} index={index} key={index} />
                          </>
                        ))
                    )}
                    {hasNextPage && (
                      <div className="mx-auto mt-4 justify-center text-center">
                        <ButtonLoadMore
                          ref={ref}
                          isFetchingNextPage={isFetchingNextPage}
                          onClick={() => fetchNextPage()}
                        />
                      </div>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
          <DashboardFooter />
        </div>
        <CreateHealth showModal={isOpen} setShowModal={setIsOpen} />
      </LayoutDashboard>
    </>
  );
}
export default TabHealth;
