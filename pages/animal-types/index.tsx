import {
  DeleteOneAssignedTypeAPI,
  GetAssignedTypesAPI,
} from '@/api-site/assigned-type';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';

import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { PrivateComponent } from '@/components/util/private-component';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { ListAnimalType } from './list-animal-type';

export function AnimalType() {
  const { t, setIsOpen, setLoading } = useInputState();

  const {
    isLoading: isLoadingAssignedTypes,
    isError: isErrorAssignedTypes,
    data: dataAssignedTypes,
  } = GetAssignedTypesAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
  });

  const { mutateAsync: deleteMutation } = DeleteOneAssignedTypeAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      console.log(item);
      await deleteMutation({ assignTypeId: item.id });
      AlertSuccessNotification({
        text: 'Animal type deleted successfully',
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <LayoutDashboard title={'Animal types'}>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <section className="py-10 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="max-w-xl mx-auto text-center">
                <h6 className="font-bold tracking-tight text-center sm:text-4xl lg:text-4xl">
                  {t.formatMessage({ id: 'ANIMALTYPE.TITLE' })}
                </h6>
              </div>

              <div className="grid grid-cols-1 gap-5 mt-12 sm:grid-cols-3 lg:mt-20 lg:gap-x-12">
                {isLoadingAssignedTypes ? (
                  <LoadingFile />
                ) : isErrorAssignedTypes ? (
                  <ErrorFile description="Error finding data please try again..." />
                ) : Number(dataAssignedTypes?.pages[0]?.data?.total) <= 0 ? (
                  ''
                ) : (
                  dataAssignedTypes?.pages
                    .flatMap((page: any) => page?.data?.value)
                    .map((item, index) => (
                      <>
                        <ListAnimalType
                          item={item}
                          index={index}
                          key={item?.id}
                        />
                      </>
                    ))
                )}
              </div>
            </div>
          </section>
        </main>
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(AnimalType);
