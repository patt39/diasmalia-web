import { GetOneUserMeAPI } from '@/api-site/user';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';

import { GetTasksAPI } from '@/api-site/task';
import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
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
import { PaginationPage } from '@/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ListTasks } from '../list-tasks';

export function UserTasks() {
  const { t } = useInputState();
  const { data: user } = GetOneUserMeAPI();
  const [pageItem, setPageItem] = useState(1);
  const { query, back } = useRouter();
  const userId = String(query?.userId);

  const {
    isLoading: isLoadingTasks,
    isError: isErrorTasks,
    data: dataTasks,
    isPlaceholderData,
  } = GetTasksAPI({
    take: 10,
    pageItem,
    sort: 'desc',
    sortBy: 'createdAt',
    contributorId: userId,
    organizationId: user?.organizationId,
  });

  return (
    <>
      <LayoutDashboard title={'Contributors'}>
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Card
              x-chunk="dashboard-06-chunk-0"
              className="dark:border-gray-800"
            >
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>
                    {t.formatMessage({ id: 'ACTIVITY.TITLE' })}
                  </CardTitle>
                  <CardDescription>
                    {t.formatMessage({ id: 'ACTIVITY.DESCRIPTION' })}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="dark:border-gray-800">
                      <TableHead>{t.formatMessage({ id: 'TITLE' })}</TableHead>
                      <TableHead>{t.formatMessage({ id: 'TODO' })}</TableHead>
                      <TableHead>
                        {t.formatMessage({ id: 'ANIMALTYPE' })}
                      </TableHead>
                      <TableHead className="md:table-cell">
                        {t.formatMessage({ id: 'ASSIGNE.TO' })}
                      </TableHead>
                      <TableHead>
                        <span>Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingTasks ? (
                      <LoadingFile />
                    ) : isErrorTasks ? (
                      <ErrorFile
                        title="404"
                        description="Error finding data please try again..."
                      />
                    ) : Number(dataTasks?.data?.total) <= 0 ? (
                      <ErrorFile description="Don't have tasks yet" />
                    ) : (
                      dataTasks?.data?.value.map((item: any, index: number) => (
                        <>
                          <ListTasks item={item} index={index} key={index} />
                        </>
                      ))
                    )}
                  </TableBody>
                </Table>
                <PaginationPage
                  setPageItem={setPageItem}
                  data={dataTasks?.data}
                  pageItem={Number(pageItem)}
                  isPlaceholderData={isPlaceholderData}
                />
              </CardContent>
            </Card>
          </main>
          <DashboardFooter />
        </div>
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(UserTasks);
