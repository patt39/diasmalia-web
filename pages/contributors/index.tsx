import {
  GetContributorsAPI,
  InviteCollaboratorAPI,
} from '@/api-site/contributors';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';

import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { ButtonInput, SearchInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { TextInput } from '@/components/ui-setting/shadcn';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { ContributorModel } from '@/types/user';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { ListFilter } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AddContributor } from './add.contributor';
import { ListContributors } from './list-contributors';

export function Contributors() {
  const schema = yup.object({
    email: yup.string().required('email is required'),
  });
  const { t, search, handleSetSearch, userStorage } = useInputState();
  const [role, setRole] = useState('');
  const [isAddContributor, setIsAddContributor] = useState(false);
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const {
    isLoading: isLoadingCollaborators,
    isError: isErrorCollaborators,
    data: dataCollaborators,
  } = GetContributorsAPI({
    role,
    search,
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    organizationId: userStorage?.organizationId,
  });

  const { isPending: loading, mutateAsync: saveMutation } =
    InviteCollaboratorAPI();

  const onSubmit: SubmitHandler<ContributorModel> = async (
    payload: ContributorModel,
  ) => {
    try {
      await saveMutation({
        ...payload,
      });
      AlertSuccessNotification({
        text: 'Collaborator invited successfully',
      });
      reset({
        email: '',
      });
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <LayoutDashboard
        title={`${userStorage?.user?.profile?.firstName} ${userStorage?.user?.profile?.lastName} - Collaborators`}
      >
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {userStorage?.role === 'SUPERADMIN' ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>
                      {t.formatMessage({ id: 'COLLABORATOR.TITLE' })}
                    </CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'COLLABORATOR.DESCRIPTION' })}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button onClick={() => setIsAddContributor(true)}>
                      {t.formatMessage({ id: 'ADD.COLLABORATOR' })}
                    </Button>
                  </CardFooter>
                </Card>
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>
                      {t.formatMessage({ id: 'INVITE.COLLABORATOR' })}
                    </CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({
                        id: 'COLLABORATOR.INVITATION.DESCRIPTION',
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <form
                      className="mt-2 w-full"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="max-w-auto relative flex w-full">
                        <TextInput
                          control={control}
                          name="email"
                          placeholder="Insert user email"
                          errors={errors}
                          type="text"
                        />
                        <ButtonInput
                          type="submit"
                          variant="primary"
                          size="sm"
                          className="!absolute right-1 top-1 rounded"
                          disabled={loading}
                          loading={loading}
                        >
                          {t.formatMessage({ id: 'CONTACT.BUTTON' })}
                        </ButtonInput>
                      </div>
                    </form>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              ''
            )}
            <Card
              x-chunk="dashboard-06-chunk-0"
              className="dark:border-gray-800"
            >
              <CardHeader>
                <div className="flex items-center">
                  <div className="mr-auto items-center gap-2">
                    <SearchInput
                      className="w-80"
                      placeholder="Search by first name, last name or email"
                      onChange={handleSetSearch}
                    />
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">
                            {dataCollaborators?.pages[0]?.data?.total - 1}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                            {dataCollaborators?.pages[0]?.data?.total - 1}{' '}
                            {t.formatMessage({ id: 'MENU.CONTRIBUTOR' })}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1"
                        >
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            {role === ''
                              ? t.formatMessage({ id: 'ACTIVITY.FILTERALL' })
                              : role}
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="dark:border-gray-800"
                      >
                        <DropdownMenuCheckboxItem
                          className="cursor-pointer"
                          checked
                          onClick={() => setRole('')}
                        >
                          {t.formatMessage({ id: 'ACTIVITY.FILTERALL' })}
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          className="cursor-pointer"
                          onClick={() => setRole('ADMIN')}
                        >
                          ADMIN
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          className="cursor-pointer"
                          onClick={() => setRole('SUPERADMIN')}
                        >
                          SUPERADMIN
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
                      <TableHead className="w-[100px] sm:table-cell">
                        <span>Photo</span>
                      </TableHead>
                      <TableHead>
                        {t.formatMessage({ id: 'AUTH.INPUT.FULLNAME' })}
                      </TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead className="md:table-cell">Role</TableHead>
                      <TableHead className="md:table-cell">
                        {t.formatMessage({ id: 'TABWEANING.STATUS' })}
                      </TableHead>
                      <TableHead>
                        <span>Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingCollaborators ? (
                      <LoadingFile />
                    ) : isErrorCollaborators ? (
                      <ErrorFile
                        title="404"
                        description="Error finding data please try again..."
                      />
                    ) : Number(dataCollaborators?.pages[0]?.data?.total) <=
                      0 ? (
                      <ErrorFile description="Don't have collaborators yet please add" />
                    ) : (
                      dataCollaborators?.pages
                        .flatMap((page: any) => page?.data?.value)
                        .map((item, index) => (
                          <>
                            <ListContributors
                              item={item}
                              index={index}
                              key={index}
                            />
                          </>
                        ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
          <DashboardFooter />
        </div>
        <AddContributor
          showModal={isAddContributor}
          setShowModal={setIsAddContributor}
        />
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Contributors);
