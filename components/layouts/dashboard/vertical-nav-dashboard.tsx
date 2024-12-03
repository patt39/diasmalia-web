import { cn } from '@/lib/utils';
import {
  BriefcaseMedical,
  ClipboardList,
  Dice6Icon,
  Fence,
  HandHelping,
  HeartHandshakeIcon,
  HomeIcon,
  MailQuestion,
  MessageCircleQuestion,
  ShieldCheck,
  Users,
  Warehouse,
  Webhook,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const [navigationItems] = useState<NavbarProps[]>([
    {
      title: `${t.formatMessage({ id: 'MENU.DASHBOARD' })}`,
      href: '/dashboard',
      icon: <HomeIcon className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.HOME' })}`,
      href: '/',
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
      title: `${t.formatMessage({ id: 'MENU.HEALTH' })}`,
      href: '/health',
      icon: <BriefcaseMedical className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.FEEDSTOCK' })}`,
      href: '/feed-stock',
      icon: <Warehouse className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.CONTRIBUTOR' })}`,
      href: '/contributors',
      icon: <Users className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.BIOSECURITY' })}`,
      href: '/biosecurity',
      icon: <ShieldCheck className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.TASKS' })}`,
      href: '/tasks',
      icon: <ClipboardList className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.SALES' })}`,
      href: '/sales',
      icon: <HeartHandshakeIcon className={classIcon} />,
    },
  ]);
  // const [transactionItems] = useState<NavbarProps[]>([
  //   {
  //     title: `${t.formatMessage({ id: 'MENU.SUBSCRIPTION' })}`,
  //     href: '/billing',
  //     icon: <Fuel className={classIcon} />,
  //   },
  // ]);
  const [supportItems] = useState<NavbarProps[]>([
    {
      title: `${t.formatMessage({ id: 'MENU.FAQ' })}`,
      href: '/faq',
      icon: <MessageCircleQuestion className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.BLOG' })}`,
      href: '/blog/users',
      icon: <Webhook className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.CONTACT' })}`,
      href: '/contact',
      icon: <MailQuestion className={classIcon} />,
    },
    {
      title: `Suggestions`,
      href: '/suggestions',
      icon: <HandHelping className={classIcon} />,
    },
  ]);

  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-between overflow-x-scroll px-4">
        <div className="space-y-4">
          <nav className="mt-4 flex-1 space-y-1">
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
                    {item?.title ===
                    t.formatMessage({ id: 'MENU.BIOSECURITY' }) ? (
                      <div className="ml-4">
                        <span className="relative flex size-3">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
                        </span>
                      </div>
                    ) : null}
                  </Link>
                );
              })}
            </nav>
          </>
          <>
            {/* <p className="px-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Transactions
            </p> */}
            <nav className="mt-4 flex-1 space-y-1">
              {/* {transactionItems.map((item: any, index: number) => {
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
              })} */}
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
                    {item?.title === 'Suggestions' ? (
                      <div className="ml-2">
                        <span className="relative flex size-3">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
                        </span>
                      </div>
                    ) : null}
                  </Link>
                );
              })}
            </nav>
          </>
        </div>
      </div>
    </>
  );
};

export { VerticalNavDashboard };
