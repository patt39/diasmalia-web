import { GetBlogsAPI } from '@/api-site/blog';
import { LayoutDashboard } from '@/components/layouts/dashboard';

import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { ButtonInput, ButtonLoadMore } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { PrivateComponent } from '@/components/util/private-component';
import { formatDateDDMMYY } from '@/utils';
import { MoveLeftIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useIntl } from 'react-intl';

export function PrivateBlogs() {
  const t = useIntl();
  const { back } = useRouter();
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
    status: 'PRIVATE',
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
      <LayoutDashboard title={'Private Blogs'}>
        <div className="mt-8 ml-8">
          <ButtonInput
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              back();
            }}
            icon={<MoveLeftIcon className="size-4" />}
          >
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {t.formatMessage({ id: 'UTIL.COME_BACK' })}
            </span>
          </ButtonInput>
        </div>
        <div className="flex min-h-screen w-full flex-col">
          <section className="py-10 sm:py-16 lg:py-14">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-6xl">
              <div className="flex flex-col items-center gap-1 text-center">
                <h4 className="sm:text-xl lg:text-3xl font-bold tracking-tight text-center">
                  {t.formatMessage({ id: 'BLOG.TITLE' })}
                </h4>
                <p className="max-w-xl mx-auto text-base i text-gray-600 lg:mx-0">
                  {t.formatMessage({ id: 'BLOG.DESCRIPTION' })}
                </p>
              </div>
              <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full">
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
                        <div
                          className="overflow-hidden bg-white rounded-sm shadow"
                          key={index}
                        >
                          <div className="p-5">
                            <div className="relative">
                              <Link
                                href={`/blog/${item?.slug}`}
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
                              <div className="absolute top-4 left-4">
                                <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
                                  {item?.category === 'CARE'
                                    ? t.formatMessage({ id: 'CARE' })
                                    : item?.category === 'BREEDING'
                                      ? t.formatMessage({ id: 'BREEDING' })
                                      : item?.category === 'NUTRITION'
                                        ? t.formatMessage({ id: 'FEEDING' })
                                        : t.formatMessage({ id: 'MANAGEMENT' })}
                                </span>
                              </div>
                            </div>
                            <div className="flex">
                              <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase">
                                {formatDateDDMMYY(item?.createdAt)}
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
                                href={`/blog/${item?.slug}`}
                                className="text-black"
                              >
                                {item?.title?.length > 50
                                  ? item?.title?.substring(0, 50) + '...'
                                  : item?.title}
                              </Link>
                            </p>
                            <p className="mt-4 text-base text-gray-600">
                              {item?.description?.length > 200
                                ? item?.description?.substring(0, 200) + '...'
                                : item?.description}
                            </p>
                            <Link
                              href={`/blog/${item?.slug}`}
                              className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
                            >
                              {t.formatMessage({ id: 'CONTINUE.READING' })}
                              <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </Link>
                          </div>
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
          <DashboardFooter />
        </div>
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(PrivateBlogs);
