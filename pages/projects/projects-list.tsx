/* eslint-disable @next/next/no-img-element */
import { DeleteOneAnimalAPI } from '@/api-site/animals';
import {
  ChangeOrganizationAPI,
  GetOneUserMeAPI,
  GetUserByOrganizationAPI,
} from '@/api-site/user';
import { useInputState } from '@/components/hooks';
import { ActionModalDialog } from '@/components/ui-setting/shadcn';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { Eye, MoreHorizontal, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ViewProject } from './view-project';

const ProjectsList = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen } = useInputState();
  const [isView, setIsView] = useState(false);
  const { data: user } = GetOneUserMeAPI();
  const { query, push } = useRouter();
  const { redirect } = query;

  const { data: getUser } = GetUserByOrganizationAPI({
    organizationId: item?.organizationId,
  });

  const { isPending: loading, mutateAsync: deleteMutation } =
    DeleteOneAnimalAPI();

  const { mutateAsync: changeMutation } = ChangeOrganizationAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ animalId: item?.id });
      AlertSuccessNotification({
        text: 'Project deleted successfully',
      });
      setIsOpen(false);
    } catch (error: any) {
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const handleChangeOrganization = async () => {
    try {
      await changeMutation({ organizationId: item?.organizationId });
      AlertSuccessNotification({
        text: 'Organization changed successfully',
      });
      push(`/dashboard${redirect ? `?redirect=${redirect}` : ''}`);
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <div
        key={index}
        className="relative overflow-hidden transition-allduration-200 bg-gray-200 rounded-xl hover:bg-gray-400"
      >
        <div className="p-6 lg:px-8 lg:py-8 cursor-pointer">
          {user?.organizationId === item?.organizationId ? (
            <div className="ml-60" onClick={() => handleChangeOrganization()}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="mt-2">
                      <span className="relative flex size-4">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex size-4 rounded-full bg-green-500"></span>
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="dark:border-gray-800">
                    You are here
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ) : (
            <div className="mt-2">
              <span className="relative flex size-4"></span>
            </div>
          )}
          <div
            className="items-center justify-center space-x-6 mt-8"
            onClick={() => handleChangeOrganization()}
          >
            <div className="text-lg font-semibold text-black text-center">
              {item?.organization?.name?.length > 40
                ? item?.organization?.name?.substring(0, 40) + '...'
                : item?.organization?.name}
            </div>
          </div>
          {getUser?.profile?.userId !== item?.userId ? (
            <div className="grid grid-cols-1 mb-2 sm:mt-2 px-20 sm:grid-cols-2 xl:grid-cols-3 sm:gap-8 xl:gap-12">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-haspopup="true"
                    size="icon"
                    variant="ghost"
                    className="ml-40 mt-2"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="dark:border-gray-800"
                >
                  <DropdownMenuItem onClick={() => setIsView(true)}>
                    <Eye className="size-4 text-gray-600 hover:text-indigo-600" />
                    <span className="ml-2 cursor-pointer hover:text-indigo-600">
                      {t.formatMessage({ id: 'TABANIMAL.VIEW' })}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsOpen(true)}>
                    <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                    <span className="ml-2 cursor-pointer hover:text-red-600">
                      {t.formatMessage({ id: 'TABANIMAL.DELETE' })}
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
                <ActionModalDialog
                  loading={loading}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  onClick={() => deleteItem(item)}
                />
                <ViewProject
                  organization={item}
                  showModal={isView}
                  setShowModal={setIsView}
                />
              </DropdownMenu>
            </div>
          ) : (
            <div className="grid grid-cols-1 mb-2 sm:mt-2 px-20 sm:grid-cols-2 xl:grid-cols-3 sm:gap-8 xl:gap-12">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-haspopup="true"
                    size="icon"
                    variant="ghost"
                    className="ml-40 mt-2"
                  ></Button>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export { ProjectsList };
