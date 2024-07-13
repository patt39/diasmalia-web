import {
  DeleteOneAssignedTypeAPI,
  GetAssignedTypesAPI,
} from '@/api-site/assigned-type';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';

import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { ActionModalDialog } from '@/components/ui-setting/shadcn';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PrivateComponent } from '@/components/util/private-component';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { firstLetterToLowerCase } from '@/utils/utils';
import { MoreHorizontal, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function AnimalType() {
  const { t, isOpen, loading, setIsOpen, setLoading } = useInputState();

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
                {/* <p className="mt-4 text-base leading-relaxed text-gray-600">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                </p> */}
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
                        <div
                          key={index}
                          className="transition-all duration-200 bg-gray-200 rounded-xl hover:shadow-xl"
                        >
                          <Link
                            href={firstLetterToLowerCase(
                              `/${item?.animalTypeId}`,
                            )}
                          >
                            <div className="py-8 px-10">
                              <Image
                                height={260}
                                width={280}
                                className="object-cover w-full h-full rounded-sm"
                                src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-2.jpg"
                                alt=""
                              />
                              <h3 className="mt-8 text-lg font-semibold text-black">
                                {item?.animalType?.name}
                              </h3>
                              <p className="mt-4 text-base text-gray-600">
                                {item?.animalType?.description}
                              </p>
                            </div>
                          </Link>
                          <div className="grid grid-cols-1 mb-2 sm:mt-2 px-20 sm:grid-cols-2 xl:grid-cols-3 sm:gap-8 xl:gap-12">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                  className="ml-40"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">
                                    {t.formatMessage({
                                      id: 'TABANIMAL.MENU',
                                    })}
                                  </span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => setIsOpen(true)}
                                >
                                  <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                                  <span className="ml-2 cursor-pointer hover:text-red-600">
                                    {t.formatMessage({
                                      id: 'TABANIMAL.DELETE',
                                    })}
                                  </span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                              <ActionModalDialog
                                loading={loading}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                onClick={() => deleteItem(item)}
                              />
                            </DropdownMenu>
                          </div>
                        </div>
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
