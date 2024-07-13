import { ThemeToggle } from '@/components/ui-setting';
import { LangToggle } from '@/components/ui-setting/lang-toggle';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
// import { ThemeToggle } from '../ui-setting';
// import { AvatarComponent } from '../ui-setting/ant';
// import { LangToggle } from '../ui-setting/lang-toggle';
// import { Button } from '../ui/button';
import { AvatarComponent } from '@/components/ui-setting/ant';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { firstLetterToLowerCase } from '@/utils/utils';

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

  return (
    <>
      <header className="sticky top-0 z-20 border-gray-300 bg-white dark:bg-black/15">
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
                <div className="block h-8 w-auto lg:hidden">
                  <div className="flex items-center">
                    <div className="relative shrink-0 cursor-pointer">
                      <img
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                        alt={process.env.NEXT_PUBLIC_NAME_SITE}
                      />
                    </div>
                  </div>
                </div>
                <div className="ml-4 hidden h-8 w-auto lg:block">
                  <div className="flex items-center">
                    <div className="relative shrink-0 cursor-pointer">
                      <img
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                        alt={process.env.NEXT_PUBLIC_NAME_SITE}
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

            <div className="ml-auto flex items-center justify-end">
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
                          className="flex max-w-xs items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                        >
                          <AvatarComponent
                            className="size-9"
                            profile={user?.profile}
                          />
                          <div className="ml-2 hidden min-w-0 flex-1 lg:block">
                            <p className="ml-1 w-auto text-sm font-bold text-gray-900 dark:text-white">
                              {firstLetterToLowerCase(user?.profile?.firstName)}{' '}
                              {firstLetterToLowerCase(user?.profile?.lastName)}
                            </p>
                            <p className="mt-1 text-sm font-medium text-gray-600 sm:table-cell">
                              <span>{user?.profile?.email}</span>
                            </p>
                          </div>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40 dark:border-gray-800 dark:bg-[#1c1b22]">
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => push(`/dashboard`)}>
                            <span className="cursor-pointer">
                              {t.formatMessage({ id: 'MENU.DASHBOARD' })}
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => push(`/contributors`)}
                          >
                            <span className="cursor-pointer">
                              {t.formatMessage({ id: 'MENU.CONTRIBUTOR' })}
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <span className="cursor-pointer">
                            {t.formatMessage({ id: 'MENU.LOGOUT' })}
                          </span>
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
