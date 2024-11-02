import { GetFaqsAPI } from '@/api-site/faq';
import { LayoutDashboard } from '@/components/layouts/dashboard';

import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { ButtonLoadMore } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PrivateComponent } from '@/components/util/private-component';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useIntl } from 'react-intl';

export function Faq() {
  const t = useIntl();
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingFaqs,
    isError: isErrorFaqs,
    data: dataFaqs,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetFaqsAPI({
    take: 10,
    sort: 'desc',
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
      <LayoutDashboard title={'Faq'}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-col items-center gap-1 text-center">
            <h4 className="mt-8 text-2xl font-bold tracking-tight text-center">
              FAQ ({t.formatMessage({ id: 'FAQ' })})
            </h4>
            <p className="text-sm text-muted-foreground">
              {t.formatMessage({ id: 'FAQ.DESCRIPTION' })}
            </p>
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {isLoadingFaqs ? (
              <LoadingFile />
            ) : isErrorFaqs ? (
              <ErrorFile
                title="404"
                description="Error finding data please try again..."
              />
            ) : Number(dataFaqs?.pages[0]?.data?.total) <= 0 ? (
              <ErrorFile description="Sorry no faqs yet" />
            ) : (
              dataFaqs?.pages
                .flatMap((page: any) => page?.data?.value)
                .map((item, index) => (
                  <>
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      key={index}
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger>{item?.title}</AccordionTrigger>
                        <AccordionContent>{item?.description}</AccordionContent>
                      </AccordionItem>
                    </Accordion>
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
            <div className=" mx-auto mt-8 text-center">
              <div className="px-6 py-12 sm:p-12">
                <div className="max-w-sm mx-auto">
                  <h3 className="mt-6 text-2xl font-semibold">
                    {t.formatMessage({ id: 'CONTACT.QUESTION' })}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.formatMessage({ id: 'CONTACT' })}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={`/contact`}
                      className="inline-flex items-center justify-center px-6 py-3 text-base font-light text-white bg-slate-400 rounded-full"
                      role="button"
                    >
                      {t.formatMessage({ id: 'WRITE.US' })}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <DashboardFooter />
        </div>
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Faq);
