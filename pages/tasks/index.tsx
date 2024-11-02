import { GetContributorsAPI } from '@/api-site/contributors';
import { GetOneUserMeAPI } from '@/api-site/user';
import { useReactHookForm } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';

import { GetAssignedTypesAPI } from '@/api-site/assigned-type';
import { GetTasksAPI } from '@/api-site/task';
import { DashboardFooter } from '@/components/layouts/dashboard/footer';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PrivateComponent } from '@/components/util/private-component';
import { PaginationPage } from '@/utils';
import { Frame, ListTodo, Users } from 'lucide-react';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import * as yup from 'yup';
import { AssigneTask } from './add.task';
import { ListTasks } from './list-tasks';

export function Contributors() {
  const schema = yup.object({
    collaboratorId: yup.string().optional(),
  });
  const [pageItem, setPageItem] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { t, control, watch, setValue } = useReactHookForm({
    schema,
  });
  const watchAnimalTypeId = watch('animalTypeId', '');
  const watchContributorId = watch('collaboratorId', '');
  const { data: user } = GetOneUserMeAPI();
  const {
    isLoading: isLoadingAssignedTypes,
    isError: isErrorAssignedTypes,
    data: dataAssignedTypes,
  } = GetAssignedTypesAPI({
    take: 20,
    sort: 'desc',
    sortBy: 'createdAt',
  });

  const {
    isLoading: isLoadingCollaborators,
    isError: isErrorCollaborators,
    data: dataCollaborators,
  } = GetContributorsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    organizationId: user?.organizationId,
  });

  const [animalTypeName, setAnimalTypeName] = useState(
    dataAssignedTypes?.pages[0]?.data?.value[0].animalType?.name,
  );

  const [contributor, setContributor] = useState(
    `${dataCollaborators?.pages[0]?.data?.value[0]?.user?.profile?.firstName} ${dataCollaborators?.pages[0]?.data?.value[0].user?.profile?.lastName}`,
  );

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
    animalTypeId: watchAnimalTypeId,
    contributorId: watchContributorId,
    organizationId: user?.organizationId,
  });

  return (
    <>
      <LayoutDashboard title={'Contributors'}>
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card
                className="sm:col-span-2 dark:border-gray-800"
                x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>
                    {t.formatMessage({ id: 'TASKS.TITLE' })}
                  </CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {t.formatMessage({ id: 'TASKS.DESCRIPTION' })}
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
                  <div className="text-2xl font-bold">12</div>
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
                {user?.role === 'SUPERADMIN' ? (
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
                                            setAnimalTypeName(
                                              item?.animalTypeId,
                                            )
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
                      <div className="ml-4 grid gap-2">
                        <Controller
                          control={control}
                          name="collaboratorId"
                          render={({ field: { value, onChange } }) => (
                            <Select
                              onValueChange={onChange}
                              name={'collaboratorId'}
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
                                          <SelectItem
                                            key={index}
                                            value={item?.id}
                                            onClick={() =>
                                              setContributor(item?.id)
                                            }
                                          >
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
                      </div>
                    ) : (
                      ''
                    )}
                    {watchAnimalTypeId ? (
                      <div className="ml-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setValue('animalTypeId', '');
                            setValue('collaboratorId', '');
                          }}
                        >
                          {t.formatMessage({ id: 'ACTIVITY.FILTERALL' })}
                        </Button>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className="ml-auto flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">
                              {dataTasks?.data?.total}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="dark:border-gray-800">
                            <p>
                              {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                              {dataTasks?.data?.total}{' '}
                              {t.formatMessage({ id: 'ASSIGNED.TASKS' })}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Button
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() => setIsOpen(true)}
                      >
                        <ListTodo className="h-3.5 w-3.5  hover:shadow-xxl" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          {t.formatMessage({ id: 'ASSIGNE.TASK' })}
                        </span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  ''
                )}
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
        <AssigneTask showModal={isOpen} setShowModal={setIsOpen} />
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Contributors);
