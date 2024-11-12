import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';

import { GetTasksAPI } from '@/api-site/task';
import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { ButtonInput } from '@/components/ui-setting';
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
import { MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ListTasks } from '../list-tasks';

export function UserTasks() {
  const { t, userStorage } = useInputState();
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
    organizationId: userStorage?.organizationId,
  });

  return (
    <>
      <LayoutDashboard
        title={`${userStorage?.profile?.firstName} ${userStorage?.profile?.lastName} - Tasks`}
      >
        <CardHeader>
          <div className="flex items-center">
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
        </CardHeader>
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Card
              x-chunk="dashboard-06-chunk-0"
              className="dark:border-gray-800"
            >
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>{t.formatMessage({ id: 'USER.TASKS' })}</CardTitle>
                  <CardDescription>
                    {t.formatMessage({ id: 'USER.TASKS.DESCRIPTION' })}
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
