import { GetContributorsAPI } from '@/api-site/contributors';
import { GetOneUserMeAPI } from '@/api-site/user';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';

import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { SearchInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PrivateComponent } from '@/components/util/private-component';
import { capitalizeOneFirstLetter } from '@/utils/utils';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Contributors() {
  const { userStorage } = useInputState();
  const { search, isOpen, setIsOpen, handleSetSearch } = useInputState();

  const { data: user } = GetOneUserMeAPI();

  const {
    isLoading: isLoadingCollaborators,
    isError: isErrorCollaborators,
    data: dataCollaborators,
  } = GetContributorsAPI({
    search,
    take: 4,
    sort: 'desc',
    sortBy: 'createdAt',
    organizationId: user?.organizationId,
  });

  return (
    <>
      <LayoutDashboard title={'Contributors'}>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card
              className="sm:col-span-2 dark:border-gray-800"
              x-chunk="dashboard-05-chunk-0"
            >
              <CardHeader className="pb-3">
                <CardTitle>Add a collaborator</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Add a new collaborator in your organization and create his
                  profile
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button>Add New Collaborator</Button>
              </CardFooter>
            </Card>
            <Card
              className="sm:col-span-2 dark:border-gray-800"
              x-chunk="dashboard-05-chunk-0"
            >
              <CardHeader className="pb-3">
                <CardTitle>Invite collaborator</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Invite an existing collaborator in our community into your
                  organization to help you levrage your activities
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <SearchInput
                  placeholder="Search by first name, last name, email"
                  onChange={handleSetSearch}
                />
              </CardFooter>
            </Card>
          </div>
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card
                x-chunk="dashboard-06-chunk-0"
                className="dark:border-gray-800"
              >
                <CardHeader>
                  <CardTitle>Collaborators</CardTitle>
                  <CardDescription>
                    A list of all peoples contributing to the growth and well
                    fonction of your organization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="dark:border-gray-800">
                        <TableHead className="w-[100px] sm:table-cell">
                          <span>Photo</span>
                        </TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead className="md:table-cell">
                          Occupation
                        </TableHead>
                        <TableHead className="md:table-cell">Role</TableHead>
                        <TableHead className="md:table-cell">Address</TableHead>
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
                              <TableRow>
                                <TableCell className="sm:table-cell">
                                  <Image
                                    src={
                                      `/${item.user.profile.photo}` ||
                                      item.user.profile.firstName
                                        .substring(0, 2)
                                        .toUpperCase()
                                    }
                                    width={36}
                                    height={36}
                                    alt={capitalizeOneFirstLetter(
                                      item.user.profile.firstName,
                                    )}
                                    className="overflow-hidden rounded-full"
                                  />
                                </TableCell>
                                <TableCell className="font-medium">
                                  {item.user.profile.firstName}{' '}
                                  {item.user.profile.lastName}
                                </TableCell>
                                <TableCell>
                                  <div className="font-medium">
                                    {item.user.profile.phone}
                                  </div>
                                  <div className="hidden text-sm text-muted-foreground md:inline">
                                    {item.user.email}
                                  </div>{' '}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  {item.user.profile.occupation}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  {item.role}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  {item.user.profile.address}
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">
                                          Toggle menu
                                        </span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      {/* <DropdownMenuLabel>
                                        Actions
                                      </DropdownMenuLabel> */}
                                      <Link
                                        href={`/contributors/${item?.id}/role/edit`}
                                      >
                                        <DropdownMenuItem>
                                          Edit
                                        </DropdownMenuItem>
                                      </Link>
                                      <Link
                                        href={`/contributors/delete/${item?.id}`}
                                      >
                                        <DropdownMenuItem>
                                          Remove
                                        </DropdownMenuItem>
                                      </Link>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            </>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{' '}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <DashboardFooter />
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Contributors);
