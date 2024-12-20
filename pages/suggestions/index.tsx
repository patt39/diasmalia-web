import { DeleteOneSuggestionAPI, GetSuggestionsAPI } from '@/api-site/faq';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';

import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { ButtonInput, ButtonLoadMore } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';
import { PrivateComponent } from '@/components/util/private-component';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { MoveLeftIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export function Suggestions() {
  const { t, userStorage } = useInputState();
  const { ref, inView } = useInView();
  const { back } = useRouter();

  const {
    isLoading: isLoadingSuggestions,
    isError: isErrorSuggestions,
    data: dataSuggestions,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetSuggestionsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    organizationId: userStorage?.organizationId,
  });

  const { mutateAsync: saveMutation } = DeleteOneSuggestionAPI();

  const deleteItem = async (item: any) => {
    try {
      await saveMutation({ suggestionId: item?.id });
      AlertSuccessNotification({
        text: 'Suggestion deleted successfully',
      });
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

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
      <LayoutDashboard
        title={`${userStorage?.profile?.firstName} ${userStorage?.profile?.lastName} - Suggestions`}
      >
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
          <div className="flex flex-col items-center gap-1 text-center">
            <h4 className="mt-8 text-2xl font-bold tracking-tight text-center sm:text-3xl lg:text-4xl">
              Suggestions
            </h4>
            <p className="text-sm text-muted-foreground">
              {t.formatMessage({ id: 'SUGGESTION.DESCRIPTION' })}
            </p>
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {isLoadingSuggestions ? (
              <LoadingFile />
            ) : isErrorSuggestions ? (
              <ErrorFile
                title="404"
                description="Error finding data please try again..."
              />
            ) : Number(dataSuggestions?.pages[0]?.data?.total) <= 0 ? (
              <ErrorFile description="Sorry no suggestions yet" />
            ) : (
              dataSuggestions?.pages
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
                        <AccordionTrigger>
                          {item?.title}{' '}
                          <TooltipProvider>
                            <Tooltip>
                              <Button
                                onClick={() => deleteItem(item)}
                                variant={'link'}
                                size="default"
                                className="cursor-pointer ml-auto"
                              >
                                <TrashIcon className="size-4 text-red-800 hover:text-red-600" />
                              </Button>
                            </Tooltip>
                          </TooltipProvider>
                        </AccordionTrigger>
                        <AccordionContent>{item?.message}</AccordionContent>
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
          </main>
          <DashboardFooter />
        </div>
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Suggestions);
