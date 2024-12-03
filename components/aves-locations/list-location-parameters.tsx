import { GetAssignedMaterialsAPI } from '@/api-site/material';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ButtonLoadMore } from '../ui-setting';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { Card, CardContent, CardHeader } from '../ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { MaterialsLocationParameters } from './materials-location';

const AvesLocationParameters = ({
  showModal,
  setShowModal,
  location,
}: {
  showModal: boolean;
  setShowModal: any;
  location: any;
}) => {
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingMaterials,
    isError: isErrorMaterials,
    data: dataMaterials,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetAssignedMaterialsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    locationId: location?.id,
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
            <Card
              x-chunk="dashboard-06-chunk-0"
              className="dark:border-gray-800"
            >
              <CardHeader></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="dark:border-gray-800">
                      <TableHead></TableHead>
                      <TableHead>Image</TableHead>
                      <TableHead>Tool</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingMaterials ? (
                      <LoadingFile />
                    ) : isErrorMaterials ? (
                      <ErrorFile
                        title="404"
                        description="Error finding data please try again..."
                      />
                    ) : Number(dataMaterials?.pages[0]?.data?.total) <= 0 ? (
                      <ErrorFile description="Don't have selected parameters yet please do" />
                    ) : (
                      dataMaterials?.pages
                        .flatMap((page: any) => page?.data?.value)
                        .map((item, index) => (
                          <>
                            <MaterialsLocationParameters
                              item={item}
                              index={index}
                              key={index}
                            />
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
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { AvesLocationParameters };
