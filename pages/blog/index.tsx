import { GetBlogsAPI } from '@/api-site/blog';
import { Footer } from '@/components/site/footer';
import { Header } from '@/components/site/header';
import { ButtonLoadMore } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { formatDateDDMMYY } from '@/utils';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useIntl } from 'react-intl';

export function Blog() {
  const t = useIntl();
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingBlogs,
    isError: isErrorBlogs,
    data: dataBlogs,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetBlogsAPI({
    take: 10,
    sort: 'desc',
    type: 'BLOG',
    status: 'PUBLIC',
    sortBy: 'createdAt',
  });

  useEffect(() => {
    let fetching = false;
    if (inView) {
      fetchNextPage();
    }
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <>
      <Head>
        <title>Blog | {process.env.NEXT_PUBLIC_NAME_SITE}</title>
      </Head>
      <Header />
      <section className="py-10 bg-white sm:py-16 lg:py-14">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <section className="relative py-12 sm:py-16 lg:py-20 bg-black rounded-sm">
            <div className="absolute inset-0">
              <Image
                width={200}
                height={100}
                className="object-cover w-full h-full opacity-80 "
                src="https://diasmalia-buck.s3.eu-central-1.amazonaws.com/undefined/adobestock_835308344_preview.jpeg20241126-ca31.jpeg"
                alt=""
              />
            </div>
            <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <div className="max-w-md mx-auto text-center">
                <h2 className="mt-3 tracking-tighter text-white">
                  <span className="block font-serif text-5xl italic sm:text-6xl md:text-7xl">
                    Latest from blog
                  </span>
                </h2>
              </div>
            </div>
          </section>
          <p className="max-w-xl mx-auto mt-14 text-base leading-relaxed text-gray-600">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis.
          </p>

          <div className="grid max-w-md grid-cols-1 mx-auto mt-12 lg:max-w-full lg:mt-16 lg:grid-cols-3 gap-x-16 gap-y-12">
            {isLoadingBlogs ? (
              <LoadingFile />
            ) : isErrorBlogs ? (
              <ErrorFile
                title="404"
                description="Error finding data please try again..."
              />
            ) : Number(dataBlogs?.pages[0]?.data?.total) <= 0 ? (
              <ErrorFile description="Sorry no blogs available at the moment" />
            ) : (
              dataBlogs?.pages
                .flatMap((page: any) => page?.data?.value)
                .map((item, index) => (
                  <>
                    <div key={index}>
                      <Link
                        href={`/blog/${item?.slug}/public`}
                        className="block aspect-w-4 aspect-h-3"
                      >
                        <Image
                          className="object-cover w-full h-full rounded-sm"
                          src={item?.image}
                          alt=""
                          width={250}
                          height={250}
                        />
                      </Link>
                      <div className="flex">
                        <span className="inline-flex px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-full text-rose-500 bg-rose-100 mt-4">
                          {item?.category === 'CARE'
                            ? t.formatMessage({ id: 'CARE' })
                            : item?.category === 'BREEDING'
                              ? t.formatMessage({ id: 'BREEDING' })
                              : item?.category === 'NUTRITION'
                                ? t.formatMessage({ id: 'FEEDING' })
                                : t.formatMessage({ id: 'MANAGEMENT' })}
                        </span>
                        <div className="ml-auto">
                          <small className="block mt-6 text-xs font-normal tracking-widest text-gray-500 lowercase">
                            {t.formatMessage({ id: 'READING.TIME' })}:{' '}
                            {item?.readingTime}min
                          </small>
                        </div>
                      </div>
                      <p className="mt-5 text-xl font-semibold">
                        <Link
                          href={`/blog/${item?.slug}/public`}
                          className="text-black"
                        >
                          {item?.title?.length > 50
                            ? item?.title?.substring(0, 50) + '...'
                            : item?.title}
                        </Link>
                      </p>
                      <p className="mt-4 text-gray-600">
                        {item?.description?.length > 200
                          ? item?.description?.substring(0, 200) + '...'
                          : item?.description}
                      </p>
                      <div className="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed"></div>
                      <span className="block text-sm font-bold tracking-widest text-gray-500 uppercase">
                        {formatDateDDMMYY(item?.createdAt)}
                      </span>
                    </div>
                  </>
                ))
            )}
            {hasNextPage && (
              <div className="mx-auto mt-4 justify-center text-center">
                <ButtonLoadMore
                  ref={ref}
                  isFetchingNextPage={isFetchingNextPage}
                  onClick={() => fetchNextPage()}
                />
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default Blog;
