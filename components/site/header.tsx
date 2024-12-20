import { logoutUsersAPI } from '@/api-site/user';
import {
  capitalizeOneFirstLetter,
  firstLetterToUpperCase,
} from '@/utils/utils';
import {
  ClipboardList,
  FolderArchive,
  FolderDot,
  HomeIcon,
  LogOut,
  Settings,
  Wallet,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useInputState } from '../hooks';
import { ThemeToggle } from '../ui-setting';
import { LangToggle } from '../ui-setting/lang-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const Header = () => {
  const { push } = useRouter();
  const { t, userStorage } = useInputState();
  const logoutUserItem = async () => {
    await logoutUsersAPI();
    push(`/login`);
    location.reload();
  };

  return (
    <>
      <header className="relative py-4 md:py-6 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <div className="flex xl:ml-0">
              <div className="flex shrink-0 items-center">
                <div className="hidden h-8 w-auto lg:block">
                  <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                      <div className="relative shrink-0 cursor-pointer">
                        <Image
                          width={35}
                          height={35}
                          src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                          alt=""
                        />
                      </div>
                      <div className="ml-2 cursor-pointer">
                        <p className="text-lg font-bold text-gray-900">
                          {process.env.NEXT_PUBLIC_NAME_SITE}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {!userStorage?.id ? (
              <>
                <div className="hidden lg:absolute lg:inset-y-0 lg:flex lg:items-center lg:justify-center lg:space-x-12 lg:-translate-x-1/2 lg:left-1/2">
                  <Link
                    href="/members"
                    className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    About
                  </Link>

                  <Link
                    href="/billing"
                    className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    Pricing
                  </Link>

                  <Link
                    href="/blog"
                    className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    Blog
                  </Link>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                  <Link
                    href="/login"
                    className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="px-5 py-2 text-base font-semibold leading-7 text-gray-900 transition-all duration-200 bg-transparent border border-gray-900 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white"
                  >
                    Join community
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="hidden lg:absolute lg:inset-y-0 lg:flex lg:items-center lg:justify-center lg:space-x-12 lg:-translate-x-1/2 lg:left-1/2">
                  <Link
                    href="/members"
                    className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    About
                  </Link>

                  <Link
                    href="/billing"
                    className="text-base font-medium text-gray-900  transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    Pricing
                  </Link>

                  <Link
                    href="/blog"
                    className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    Blog
                  </Link>
                </div>
                <div className="ml-auto flex items-center justify-end mr-4">
                  <ThemeToggle />
                  <LangToggle />
                  <div className="items-end">
                    {/* <ThemeToggle /> */}
                    {userStorage?.profile ? (
                      <>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className=" mx-auto flex max-w-xs items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                            >
                              <Avatar>
                                <AvatarImage
                                  src={userStorage?.profile?.photo}
                                />
                                <AvatarFallback>
                                  {capitalizeOneFirstLetter(
                                    userStorage?.profile?.firstName,
                                  )}{' '}
                                  {capitalizeOneFirstLetter(
                                    userStorage?.profile?.lastName,
                                  )}
                                </AvatarFallback>
                              </Avatar>
                              <div className="ml-2 hidden min-w-0 flex-1 lg:block">
                                <p className="ml-1 w-auto text-sm font-bold text-gray-900">
                                  {firstLetterToUpperCase(
                                    userStorage?.profile?.firstName,
                                  )}{' '}
                                  {firstLetterToUpperCase(
                                    userStorage?.profile?.lastName,
                                  )}
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-600 sm:table-cell">
                                  <span>{userStorage?.email}</span>
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
                              <DropdownMenuItem
                                onClick={() => push(`/dashboard`)}
                              >
                                <span className="cursor-pointer  hover:text-lime-600">
                                  {t.formatMessage({ id: 'MENU.DASHBOARD' })}
                                </span>
                                <DropdownMenuShortcut>
                                  <HomeIcon className="h-3.5 w-3.5  hover:shadow-xxl  hover:text-lime-600" />
                                </DropdownMenuShortcut>
                              </DropdownMenuItem>
                              {userStorage?.role === 'ADMIN' ? (
                                <DropdownMenuItem
                                  onClick={() =>
                                    push(`/tasks/${userStorage?.id}`)
                                  }
                                >
                                  <span className="cursor-pointer  hover:text-yellow-600">
                                    {t.formatMessage({ id: 'USER.TASKS' })}
                                  </span>
                                  <DropdownMenuShortcut>
                                    <ClipboardList className="h-3.5 w-3.5  hover:shadow-xxl  hover:text-yellow-600" />
                                  </DropdownMenuShortcut>
                                </DropdownMenuItem>
                              ) : null}
                              <DropdownMenuItem
                                onClick={() => push(`/projects`)}
                              >
                                <span className="cursor-pointer  hover:text-lime-600">
                                  {t.formatMessage({ id: 'PROJECTS' })}
                                </span>
                                <DropdownMenuShortcut>
                                  <FolderDot className="h-3.5 w-3.5  hover:shadow-xxl  hover:text-lime-600" />
                                </DropdownMenuShortcut>
                              </DropdownMenuItem>
                              {userStorage?.role === 'SUPERADMIN' ? (
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
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export { Header };
