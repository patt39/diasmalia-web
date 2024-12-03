import { useInputState } from '@/components/hooks';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Head from 'next/head';
import { HorizontalNavDashboard } from './horizontal-nav-dashboard';
import { VerticalNavDashboard } from './vertical-nav-dashboard';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const LayoutDashboard = ({ children, title }: IProps) => {
  const { isOpen, setIsOpen, userStorage: user } = useInputState();
  const showDrawer = () => {
    setIsOpen((i) => !i);
  };

  return (
    <>
      <Head>
        <title>
          {title} | {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
        <meta
          property="og:title"
          content={process.env.NEXT_PUBLIC_NAME_SITE}
          key="title"
        />
        <meta
          name="description"
          content="Un Pot is the best way for creators and artists to accept support and membership from their fans."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex flex-col">
        <HorizontalNavDashboard showDrawer={showDrawer} user={user} />

        {user?.id ? (
          <>
            {/* Fix Drawer */}
            <Sheet onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
              <SheetTrigger asChild>
                {/* <Button variant="outline">Open</Button> */}
              </SheetTrigger>
              <SheetContent className="dark:border-gray-800 dark:bg-black/15">
                <div className="flex flex-col overflow-y-auto pt-5">
                  <VerticalNavDashboard user={user} />
                </div>
              </SheetContent>
            </Sheet>
            {/*End Fix Drawer */}
          </>
        ) : null}

        <div className="flex flex-1 dark:bg-black/15">
          {user?.id ? (
            <div className="hidden md:w-56 md:block">
              <div className="fixed flex max-h-screen flex-col pt-5">
                <VerticalNavDashboard user={user} />
              </div>
            </div>
          ) : null}

          <div
            className={`flex min-h-screen flex-1 flex-col bg-gray-100 dark:bg-[#1c1b22]`}
          >
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
};

export { LayoutDashboard };
