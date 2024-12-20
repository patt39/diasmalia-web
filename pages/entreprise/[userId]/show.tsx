import { GetImagesAPI } from '@/api-site/upload';
import { GetUserAPI } from '@/api-site/user';
import { Header } from '@/components/site/header';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { HtmlParser } from '@/utils/html-parser';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

export function ViewEnterprise() {
  const { query } = useRouter();
  const userId = String(query?.userId);
  const { data: getUser } = GetUserAPI({
    userId: userId,
  });

  const { data: dataImages } = GetImagesAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    userCreatedId: getUser?.id,
  });

  return (
    <>
      <Head>
        <title>
          {`${getUser?.profile?.firstName} ${getUser?.profile?.lastName} - Entreprise`}{' '}
          | {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
      </Head>
      <Header />
      <section className="py-2 bg-white  sm:py-6 lg:py-10">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <Carousel className="w-full max-w-lg mx-auto rounded-sm lg:w-full">
            <CarouselContent>
              {dataImages?.pages
                .flatMap((page: any) => page?.data?.value)
                .map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <div className="mt-8 sm:mt-12 lg:mt-16 aspect-w-16 aspect-h-9 lg:aspect-h-6">
                        <Image
                          className="mt-4 mx-auto lg:h-[500px] lg:w-[1000px]"
                          src={item?.link}
                          alt=""
                          width={850}
                          height={850}
                          style={{
                            height: `100%`,
                            width: `100%`,
                          }}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="grid grid-cols-1 mt-8 sm:mt-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-12 gap-y-8">
            <div className="hidden lg:block lg:col-span-2"></div>
            <article className=" prose lg:col-span-8 max-w-none prose-gray prose-blockquote:px-8 prose-blockquote:py-3 prose-blockquote:lg:text-xl prose-blockquote:font-medium prose-blockquote:text-gray-900 prose-blockquote:border-gray-900 prose-blockquote:border-l-2 prose-blockquote:lg:leading-9 prose-blockquote:not-italic prose-blockquote:bg-gray-100 prose-blockquote:text-lg prose-blockquote:leading-8 text-black">
              <p className="text-cente">
                {getUser?.organization?.description ? (
                  <HtmlParser html={getUser?.organization?.description} />
                ) : null}
              </p>
            </article>
          </div>
        </div>
      </section>
      <footer className="py-12 bg-white sm:py-16 text-2xl lg:py-20">
        <h2 className="w-auto font-bold text-center h-8 mx-auto">
          {getUser?.organization?.name}
        </h2>
        <div className="px-4 mx-auto text-white max-w-7xl sm:px-6 lg:px-8">
          <ul className="flex flex-wrap items-center justify-center space-x-12 md:space-x-16 mt-14">
            <h2 className="inline-flex mt-8 -ml-12 text-lg font-medium text-gray-900 transition-all duration-200 transform font-pj hover:-translate-y-1 hover:text-gray-600 sm:ml-0 sm:mt-0">
              City: {getUser?.profile?.city}
            </h2>
            <h2 className="inline-flex mt-8 -ml-12 text-lg font-medium text-gray-900 transition-all duration-200 transform font-pj hover:-translate-y-1 hover:text-gray-600 sm:ml-0 sm:mt-0">
              Adresse: {getUser?.profile?.address}
            </h2>
            <h2 className="inline-flex mt-8 -ml-12 text-lg font-medium text-gray-900 transition-all duration-200 transform font-pj hover:-translate-y-1 hover:text-gray-600 sm:ml-0 sm:mt-0">
              Email: {getUser?.email}
            </h2>
            <h2 className="inline-flex mt-8 -ml-12 text-lg font-medium text-gray-900 transition-all duration-200 transform font-pj hover:-translate-y-1 hover:text-gray-600 sm:ml-0 sm:mt-0">
              Phone: {getUser?.profile?.phone}
            </h2>
          </ul>

          <ul className="flex items-center justify-center mt-12 space-x-3">
            <li>
              <a
                href="#"
                target="_blank"
                className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                rel="noopener"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                </svg>
              </a>
            </li>

            <li>
              <a
                href="#"
                target="_blank"
                className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                rel="noopener"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                  <circle cx="16.806" cy="7.207" r="1.078"></circle>
                  <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                </svg>
              </a>
            </li>
          </ul>

          <p className="text-base font-normal text-center text-gray-600 mt-7 font-pj">
            &copy; {new Date().getFullYear()}.{' '}
            {process.env.NEXT_PUBLIC_NAME_SITE}. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
export default ViewEnterprise;
