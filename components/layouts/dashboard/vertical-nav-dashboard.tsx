import { cn } from '@/lib/utils';
import {
  Calendar,
  Dice6Icon,
  ExternalLinkIcon,
  Fence,
  Footprints,
  HomeIcon,
  ImageIcon,
  MailQuestion,
  MessageCircleQuestion,
  Wallet,
  Webhook,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';

export type NavbarProps = {
  title: ReactNode;
  href: string;
  status?: boolean;
  description?: string;
  count?: number;
  icon?: any;
};
const classIcon = 'flex-shrink-0 size-5 mr-4';

interface Props {
  user?: any;
}

const VerticalNavDashboard = ({ user }: Props) => {
  const t = useIntl();
  const router = useRouter();
  const pathname = usePathname();
  const [navigationItems] = useState<NavbarProps[]>([
    {
      title: `${t.formatMessage({ id: 'MENU.DASHBOARD' })}`,
      href: '/dashboard',
      icon: <HomeIcon className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.PAGE' })}`,
      href: `/${user?.username}`,
      icon: <ExternalLinkIcon className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.HOME' })}`,
      href: '/home',
      icon: <Dice6Icon className={classIcon} />,
    },
  ]);

  const [activitiesItems] = useState<NavbarProps[]>([
    {
      title: `${t.formatMessage({ id: 'MENU.ANIMALTYPE' })}`,
      href: '/animal-types',
      icon: <Fence className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.TASKS' })}`,
      href: '/tasks',
      icon: <Calendar className={classIcon} />,
    },
  ]);
  const [transactionItems] = useState<NavbarProps[]>([
    {
      title: `${t.formatMessage({ id: 'MENU.FINANCES' })}`,
      href: '/finances',
      icon: <Wallet className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.SUBSCRIPTION' })}`,
      href: '/subscription-plans',
      icon: <ImageIcon className={classIcon} />,
    },
  ]);
  const [supportItems] = useState<NavbarProps[]>([
    {
      title: `${t.formatMessage({ id: 'MENU.FAQ' })}`,
      href: '/faq',
      icon: <MessageCircleQuestion className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.BLOG' })}`,
      href: '/blog',
      icon: <Webhook className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.CONTACT' })}`,
      href: '/contact',
      icon: <MailQuestion className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.HOWTOUSE' })}`,
      href: '/site-plan',
      icon: <Footprints className={classIcon} />,
    },
  ]);

  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-between overflow-x-scroll px-4">
        <div className="space-y-4">
          <nav className="flex-1 space-y-2">
            {navigationItems.map((item: any, index: number) => {
              const isActive = pathname?.startsWith(item.href);
              return (
                <Link
                  key={index}
                  href={`${item.href}`}
                  title={item?.title}
                  className={cn(
                    `group flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? `bg-blue-600 text-white`
                        : 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
                    }`,
                  )}
                >
                  {item?.icon}

                  {item?.title}
                </Link>
              );
            })}
          </nav>

          <>
            <p className="px-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Activities
            </p>

            <nav className="mt-4 flex-1 space-y-1">
              {activitiesItems.map((item: any, index: number) => {
                const isActive = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className={cn(
                      `group flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? `bg-blue-600 text-white`
                          : 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
                      }`,
                    )}
                  >
                    {item?.icon}

                    {item?.title}
                  </Link>
                );
              })}

              {/* <a href="#" title="" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-gray-200 group">
                                        <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                        </svg>
                                        Hotjar
                                        <span className="text-xs uppercase ml-auto font-semibold text-indigo-600 bg-indigo-50 border border-indigo-300 rounded-full inline-flex items-center px-2 py-0.5"> New </span>
                                    </a> */}
            </nav>
          </>

          <>
            <p className="px-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Transactions
            </p>
            <nav className="mt-4 flex-1 space-y-1">
              {transactionItems.map((item: any, index: number) => {
                const isActive = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className={cn(
                      `group flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? `bg-blue-600 text-white`
                          : 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
                      }`,
                    )}
                  >
                    {item?.icon}

                    {item?.title}
                  </Link>
                );
              })}
            </nav>
          </>

          <>
            <p className="px-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Support
            </p>
            <nav className="mt-4 flex-1 space-y-1">
              {supportItems.map((item: any, index: number) => {
                const isActive = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className={cn(
                      `group flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? `bg-blue-600 text-white`
                          : 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
                      }`,
                    )}
                  >
                    {item?.icon}

                    {item?.title}
                  </Link>
                );
              })}

              {/* <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 group rounded-lg ${isActive
                      ? `dark:text-white bg-${user?.profile?.color}-600`
                      : "text-black dark:text-white"
                      } `}
                  >
                    {item?.icon}

                    {item?.title}
                  </Link> */}
            </nav>
          </>
        </div>
      </div>
    </>
  );
};

export { VerticalNavDashboard };
