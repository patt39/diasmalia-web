import { logoutUsersAPI } from '@/api-site/user';
import { ThemeToggle } from '@/components/ui-setting';
import { LangToggle } from '@/components/ui-setting/lang-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  capitalizeOneFirstLetter,
  firstLetterToUpperCase,
} from '@/utils/utils';
import {
  ClipboardList,
  FolderArchive,
  FolderDot,
  LogOut,
  Settings,
  UserPen,
  Wallet,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

export type NavbarProps = {
  title: string;
  href: string;
  description?: string;
  icon?: any;
};

interface Props {
  user?: any;
  showDrawer?: () => void;
}

const HorizontalNavDashboard = ({ user, showDrawer }: Props) => {
  const t = useIntl();
  const { push } = useRouter();

  const logoutUserItem = async () => {
    await logoutUsersAPI();
    push(`/login`);
    location.reload();
  };

  return (
    <>
      <header className="sticky top-0 border-gray-300 bg-white dark:bg-black/15">
        <div className="mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="-m-3 flex items-center lg:hidden">
              <Button onClick={showDrawer} type="button" variant="ghost">
                <svg
                  className="size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </Button>
            </div>

            <div className="ml-2 flex xl:ml-0">
              <div className="flex shrink-0 items-center">
                <div className="ml-4 hidden h-8 w-auto lg:block">
                  <div className="flex items-center">
                    <div className="relative shrink-0 cursor-pointer">
                      <Image
                        width={35}
                        height={35}
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                        alt=""
                      />
                    </div>
                    <div className="ml-2 cursor-pointer">
                      <p className="text-lg font-bold">
                        {process.env.NEXT_PUBLIC_NAME_SITE}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ml-auto flex items-center justify-end mr-4">
              <ThemeToggle />
              <LangToggle />
              <div className="items-end">
                {/* <ThemeToggle /> */}
                {user?.profile ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className=" mx-auto flex max-w-xs items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                        >
                          <Avatar>
                            <AvatarImage src={user?.profile?.photo} />
                            <AvatarFallback>
                              {capitalizeOneFirstLetter(
                                user?.profile?.firstName,
                              )}{' '}
                              {capitalizeOneFirstLetter(
                                user?.profile?.lastName,
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-2 hidden min-w-0 flex-1 lg:block">
                            <p className="ml-1 w-auto text-sm font-bold text-gray-900 dark:text-white">
                              {firstLetterToUpperCase(user?.profile?.firstName)}{' '}
                              {firstLetterToUpperCase(user?.profile?.lastName)}
                            </p>
                            <p className="mt-1 text-sm font-medium text-gray-600 sm:table-cell">
                              <span>{user?.email}</span>
                            </p>
                          </div>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40 dark:border-gray-800 dark:bg-[#1c1b22]">
                        <DropdownMenuLabel>
                          {t.formatMessage({ id: 'ACCOUNT' })}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          {user?.organization?._count?.images !== 0 &&
                          user?.organization?.description !== null ? (
                            <DropdownMenuItem
                              onClick={() =>
                                push(`/entreprise/${user?.userId}/show`)
                              }
                            >
                              <span className="cursor-pointer  hover:text-orange-600">
                                Entreprise
                              </span>
                              <DropdownMenuShortcut>
                                <UserPen className="h-3.5 w-3.5  hover:shadow-xxl  hover:text-orange-600" />
                              </DropdownMenuShortcut>
                            </DropdownMenuItem>
                          ) : null}
                          {user?.role === 'ADMIN' ? (
                            <DropdownMenuItem
                              onClick={() => push(`/tasks/${user?.id}`)}
                            >
                              <span className="cursor-pointer  hover:text-yellow-600">
                                {t.formatMessage({ id: 'USER.TASKS' })}
                              </span>
                              <DropdownMenuShortcut>
                                <ClipboardList className="h-3.5 w-3.5  hover:shadow-xxl  hover:text-yellow-600" />
                              </DropdownMenuShortcut>
                            </DropdownMenuItem>
                          ) : null}
                          <DropdownMenuItem onClick={() => push(`/projects`)}>
                            <span className="cursor-pointer  hover:text-lime-600">
                              {t.formatMessage({ id: 'PROJECTS' })}
                            </span>
                            <DropdownMenuShortcut>
                              <FolderDot className="h-3.5 w-3.5  hover:shadow-xxl  hover:text-lime-600" />
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>
                          {user?.role === 'SUPERADMIN' ? (
                            <>
                              <DropdownMenuItem
                                onClick={() => push(`/archives`)}
                              >
                                <span className="cursor-pointer  hover:text-green-600">
                                  Archives
                                </span>
                                <DropdownMenuShortcut>
                                  <FolderArchive className="h-3.5 w-3.5  hover:shadow-xxl  hover:text-green-600" />
                                </DropdownMenuShortcut>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => push(`/finances`)}
                              >
                                <span className="cursor-pointer  hover:text-emerald-600">
                                  Finances
                                </span>
                                <DropdownMenuShortcut>
                                  <Wallet className="h-3.5 w-3.5  hover:shadow-xxl  hover:text-emerald-600" />
                                </DropdownMenuShortcut>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => push(`/settings/`)}
                              >
                                <span className="cursor-pointer  hover:text-emerald-600">
                                  Paramètres
                                </span>
                                <DropdownMenuShortcut>
                                  <Settings className="h-3.5 w-3.5  hover:shadow-xxl  hover:text-emerald-600" />
                                </DropdownMenuShortcut>
                              </DropdownMenuItem>
                            </>
                          ) : null}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logoutUserItem()}>
                          <span className="cursor-pointer  hover:text-cyan-600">
                            {t.formatMessage({ id: 'MENU.LOGOUT' })}
                          </span>
                          <DropdownMenuShortcut>
                            <LogOut className="h-3.5 w-3.5  hover:shadow-xxl  hover:text-cyan-600" />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export { HorizontalNavDashboard };
