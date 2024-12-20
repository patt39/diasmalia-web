/* eslint-disable @next/next/no-img-element */
import { GetActivityLogsAPI } from '@/api-site/activityLogs';
import {
  GetContributorsAPI,
  GetOneContributorAPI,
} from '@/api-site/contributors';
import { IpLocationAPI } from '@/api-site/user';
import { useInputState, useReactHookForm } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PrivateComponent } from '@/components/util/private-component';
import { formatDDMMYYDate } from '@/utils';
import { ListFilter, MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import * as yup from 'yup';

const schema = yup.object();
const ActivityLogs = () => {
  const [periode, setPeriode] = useState('');
  const { t, userStorage } = useInputState();
  const { ref, inView } = useInView();
  const { back } = useRouter();
  const { control, watch, setValue } = useReactHookForm({ schema });
  const watchContributor = watch('contributorId', '');

  const { data: getOneContributor } = GetOneContributorAPI({
    contributorId: watchContributor,
  });

  const {
    isLoading: isLoadingActivityLog,
    isError: isErrorActivitylogs,
    data: dataActivityLogs,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetActivityLogsAPI({
    take: 10,
    periode,
    sort: 'desc',
    sortBy: 'createdAt',
    userId: getOneContributor?.userId,
    organizationId: userStorage?.organizationId,
  });

  const {
    isLoading: isLoadingCollaborators,
    isError: isErrorCollaborators,
    data: dataCollaborators,
  } = GetContributorsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
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

  const { data } = IpLocationAPI();

  return (
    <>
      <LayoutDashboard title={'Activity-logs'}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="mt-8 ml-8 flex items-center">
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
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Card className=" dark:border-gray-800">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>
                    {t.formatMessage({ id: 'ACTIVITY.TITLE' })}
                  </CardTitle>
                  <CardDescription>
                    {t.formatMessage({ id: 'ACTIVITY.DESCRIPTION' })}
                  </CardDescription>
                </div>
                <div className="flex ml-auto space-x-4">
                  <Controller
                    control={control}
                    name="contributorId"
                    render={({ field: { value, onChange } }) => (
                      <Select
                        onValueChange={onChange}
                        name={'contributorId'}
                        value={value}
                      >
                        <SelectTrigger className="w-full space-x-1">
                          <SelectValue placeholder="Select collaborator" />
                        </SelectTrigger>
                        <SelectContent className="dark:border-gray-800">
                          <SelectGroup>
                            {isLoadingCollaborators ? (
                              <LoadingFile />
                            ) : isErrorCollaborators ? (
                              <ErrorFile
                                title="404"
                                description="Error finding data please try again..."
                              />
                            ) : Number(
                                dataCollaborators?.pages[0]?.data?.total,
                              ) <= 0 ? (
                              <ErrorFile description="Don't have collaborators yet please add" />
                            ) : (
                              dataCollaborators?.pages
                                .flatMap((page: any) => page?.data?.value)
                                .map((item, index) => (
                                  <>
                                    <SelectItem key={index} value={item?.id}>
                                      {item?.user?.profile?.firstName}{' '}
                                      {item?.user?.profile?.lastName}
                                    </SelectItem>
                                  </>
                                ))
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {watchContributor ? (
                    <div className="ml-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setValue('contributorId', '');
                        }}
                      >
                        {t.formatMessage({ id: 'ACTIVITY.FILTERALL' })}
                      </Button>
                    </div>
                  ) : null}
                  <div className="items-center my-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1"
                        >
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filter
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          onClick={() => setPeriode('')}
                          checked
                        >
                          {t.formatMessage({ id: 'ACTIVITY.FILTERALL' })}
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          onClick={() => setPeriode('1')}
                        >
                          Hier
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          onClick={() => setPeriode('7')}
                        >
                          {t.formatMessage({ id: 'ACTIVITY.LAST7DAYS' })}
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          onClick={() => setPeriode('15')}
                        >
                          {t.formatMessage({ id: 'ACTIVITY.LAST15DAYS' })}
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          onClick={() => setPeriode('30')}
                        >
                          {t.formatMessage({ id: 'ACTIVITY.LAST30DAYS' })}
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="dark:border-gray-800">
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingActivityLog ? (
                      <LoadingFile />
                    ) : isErrorActivitylogs ? (
                      <ErrorFile
                        title="404"
                        description="Error finding data please try again..."
                      />
                    ) : Number(dataActivityLogs?.pages[0]?.data?.total) <= 0 ? (
                      <ErrorFile description="No activities logged" />
                    ) : (
                      dataActivityLogs?.pages
                        .flatMap((page: any) => page?.data?.value)
                        .map((item, index) => (
                          <>
                            <TableRow
                              key={index}
                              className="dark:border-gray-800"
                            >
                              <TableCell>
                                <div className="font-medium">
                                  {formatDDMMYYDate(item?.createdAt as Date)}
                                </div>
                              </TableCell>
                              <TableCell>{data?.timezone}</TableCell>
                              <TableCell>{item?.message}</TableCell>
                            </TableRow>
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
      </LayoutDashboard>
    </>
  );
};
export default PrivateComponent(ActivityLogs);
