import { LayoutDashboard } from '@/components/layouts/dashboard';

import { GetAssignedTypesAPI } from '@/api-site/assigned-type';
import { GetContributorsAPI } from '@/api-site/contributors';
import { GetAssignedMaterialsAPI } from '@/api-site/material';
import { useInputState } from '@/components/hooks';
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
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PrivateComponent } from '@/components/util/private-component';
import { Frame, MoveLeftIcon, Shield, Users } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { AddMaterials } from './add.materials';
import { ListMaterials } from './list-materials';

export function Biosecurity() {
  const { t, isOpen, setIsOpen, userStorage } = useInputState();
  const { ref, inView } = useInView();
  const { back } = useRouter();

  const { data: dataAssignedTypes } = GetAssignedTypesAPI({
    take: 20,
    sort: 'desc',
    sortBy: 'createdAt',
  });

  const { data: dataCollaborators } = GetContributorsAPI({
    take: 20,
    sort: 'desc',
    sortBy: 'createdAt',
    organizationId: userStorage?.organizationId,
  });

  const {
    isLoading: isLoadingMaterials,
    isError: isErrorMaterials,
    data: dataMaterials,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = GetAssignedMaterialsAPI({
    take: 10,
    sort: 'desc',
    type: 'TOOL',
    sortBy: 'createdAt',
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
        title={`${userStorage?.profile?.firstName} ${userStorage?.profile?.lastName} - Assigned tasks`}
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
                    {t.formatMessage({ id: 'BIOSECURITY.TITLE' })}
                  </CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {t.formatMessage({ id: 'DASHBOARD.BIOSECURITY' })}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="dark:border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t.formatMessage({ id: 'FARM.NUMBER' })}
                  </CardTitle>
                  <Frame className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dataAssignedTypes?.pages[0]?.data?.total}
                  </div>
                </CardContent>
              </Card>
              <Card className="dark:border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t.formatMessage({ id: 'DASHBOARD.USERS' })}
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dataCollaborators?.pages[0]?.data?.total}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card
              x-chunk="dashboard-06-chunk-0"
              className="dark:border-gray-800"
            >
              <CardHeader>
                <div className="flex items-center">
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
                  <div className="ml-auto flex items-center gap-2">
                    <Button
                      size="sm"
                      className="h-8 gap-1"
                      onClick={() => setIsOpen(true)}
                    >
                      <Shield className="h-3.5 w-3.5  hover:shadow-xxl" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        {t.formatMessage({ id: 'ADD.MATERIAL' })}
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
                      <TableHead>Image</TableHead>
                      <TableHead>Tool</TableHead>
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
                      <ErrorFile description="Don't have tasks yet" />
                    ) : (
                      dataMaterials?.pages
                        .flatMap((page: any) => page?.data?.value)
                        .map((item, index) => (
                          <>
                            <ListMaterials
                              item={item}
                              index={index}
                              key={index}
                            />
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
        <AddMaterials showModal={isOpen} setShowModal={setIsOpen} />
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Biosecurity);
