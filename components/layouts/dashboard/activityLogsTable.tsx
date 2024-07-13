/* eslint-disable @next/next/no-img-element */
import { GetActivityLogsAPI } from '@/api-site/activityLogs';
import { useInputState } from '@/components/hooks';
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PrivateComponent } from '@/components/util/private-component';
import { formatDDMMYYDate } from '@/utils';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const ActivityLogs = () => {
  const { userStorage } = useInputState();

  const {
    isLoading: isLoadingAnimalTypes,
    isError: isErrorAnimalTypes,
    data: dataActivityTypes,
  } = GetActivityLogsAPI({
    take: 6,
    sort: 'desc',
    sortBy: 'createdAt',
    organizationId: userStorage.organizationId,
  });

  return (
    <>
      <Card
        className="xl:col-span-2 dark:border-gray-800"
        x-chunk="dashboard-01-chunk-4"
      >
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Activity logs</CardTitle>
            <CardDescription>
              All activities done in your organization
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href={`/activity-logs`}>
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingAnimalTypes ? (
                <LoadingFile />
              ) : isErrorAnimalTypes ? (
                <ErrorFile
                  title="404"
                  description="Error finding data please try again..."
                />
              ) : Number(dataActivityTypes?.pages[0]?.data?.total) <= 0 ? (
                ''
              ) : (
                dataActivityTypes?.pages
                  .flatMap((page: any) => page?.data?.value)
                  .map((item, index) => (
                    <>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">
                            {formatDDMMYYDate(item?.createdAt as Date)}
                          </div>
                        </TableCell>
                        <TableCell>{item?.message}</TableCell>
                      </TableRow>
                    </>
                  ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};
export default PrivateComponent(ActivityLogs);
