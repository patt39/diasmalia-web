/* eslint-disable @next/next/no-img-element */
import { DeleteOneAssignedTypeAPI } from '@/api-site/assigned-type';
import { useInputState } from '@/components/hooks';
import { ActionModalDialog } from '@/components/ui-setting/shadcn';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { MoreHorizontal, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ListAnimalType = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen } = useInputState();

  const { isPending: loading, mutateAsync: deleteMutation } =
    DeleteOneAssignedTypeAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ assignTypeId: item.id });
      AlertSuccessNotification({
        text: 'Animal type deleted successfully',
      });
      setIsOpen(false);
    } catch (error: any) {
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <div
        key={index}
        className="transition-all duration-200 bg-gray-200 rounded-xl hover:shadow-xl"
      >
        <Link href={`/${item?.animalTypeId}`}>
          <div className="py-8 px-10">
            <Image
              height={300}
              width={300}
              className="object-cover w-full h-full rounded-sm"
              src={`${item?.animalType?.photo ?? ''}`}
              alt="https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-2.jpg"
            />
          </div>
          <div className="text-lg font-semibold text-black text-center">
            {item?.animalType?.name}
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
            <DropdownMenuContent align="end" className="dark:border-gray-800">
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
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
  );
};
export { ListAnimalType };
