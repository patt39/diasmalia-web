import { GetHealthsAPI } from '@/api-site/health';
import { useReactHookForm } from '@/components/hooks';
import { ButtonLoadMore } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import * as yup from 'yup';
import { ListMapcheckBox } from './list-map-checkbox';

const schema = yup.object({
  name: yup.string().optional(),
});
const ViewEquipment = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
}) => {
  const { t } = useReactHookForm({ schema });
  const { ref, inView } = useInView();
  const {
    isLoading: isLoadingHealth,
    isError: isErrorHealth,
    data: dataHealth,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetHealthsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    category: 'EQUIPMENT',
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
      {showModal ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative m-auto max-h-screen w-full max-w-2xl overflow-y-scroll rounded-xl bg-white  p-5 shadow-lg dark:bg-[#121212]">
            <button
              className="float-right border-0 bg-transparent text-black"
              onClick={() => setShowModal(false)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                <XIcon />
              </span>
            </button>
            <form className="my-2">
              <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 xl:grid-cols-3 sm:gap-8 xl:gap-12">
                  {isLoadingHealth ? (
                    <LoadingFile />
                  ) : isErrorHealth ? (
                    <ErrorFile
                      title="404"
                      description="Error finding data please try again..."
                    />
                  ) : Number(dataHealth?.pages[0]?.data?.total) <= 0 ? (
                    <ErrorFile
                      description={t.formatMessage({
                        id: 'EQUIPMENTS.EMPTY',
                      })}
                    />
                  ) : (
                    dataHealth?.pages
                      .flatMap((page: any) => page?.data?.value)
                      .map((item, index) => (
                        <ListMapcheckBox key={index} item={item} />
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
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewEquipment };
