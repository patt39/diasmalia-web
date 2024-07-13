import Head from 'next/head';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const LayoutAuth: React.FC<IProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>
          {title} | {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
      </Head>

      <div className="py-10 bg-gray-50 dark:bg-[#1c1b22] sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-6xl mx-auto mt-6 md:mt-12">{children}</div>
        </div>
      </div>
    </>
  );
};

export { LayoutAuth };
