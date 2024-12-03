/* eslint-disable @next/next/no-img-element */
import {
  ChangeTreatmentNameStatusAPI,
  DeleteOneHealthAPI,
} from '@/api-site/health';
import { useInputState } from '@/components/hooks';
import { ActionModalDialog } from '@/components/ui-setting/shadcn';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { Eye, MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { UpdateHealth } from './update-health';
import { ViewHealth } from './view-health';

const ListHealth = ({ item, index }: { item: any; index: number }) => {
  const [isChangeStatus, setIsChangeStatus] = useState<boolean>(item?.status);
  const { t, isOpen, setIsOpen, userStorage } = useInputState();
  const [isEdit, isSetEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  const { isPending: loading, mutateAsync: deleteMutation } =
    DeleteOneHealthAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ healthId: item?.id });
      AlertSuccessNotification({
        text: 'Medication deleted successfully',
      });
      setIsOpen(false);
    } catch (error: any) {
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const { mutateAsync: saveMutation } = ChangeTreatmentNameStatusAPI();

  const changeItem = async (item: any) => {
    try {
      setIsChangeStatus((i) => !i);
      await saveMutation({ healthId: item?.id });
      AlertSuccessNotification({
        text: 'Status changed successfully',
      });
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <TableRow key={index}>
        <TableCell>
          <Checkbox
            checked={isChangeStatus}
            onCheckedChange={() => {
              changeItem(item);
            }}
          />
        </TableCell>
        <TableCell>
          <Image
            className="lg:w-[200px] lg:h-[150px] lg:my-auto my-auto rounded-sm"
            src={item?.image}
            alt="https://diasmalia-buck.s3.eu-central-1.amazonaws.com/photos/desinfection.jpeg20241114-cNrK.jpeg"
            width={200}
            height={200}
          />
        </TableCell>
        <TableCell className="font-medium">
          {item?.name?.length > 20
            ? item?.name?.substring(0, 20) + '...'
            : item?.name}
        </TableCell>
        <TableCell className="font-medium">
          {item?.description?.length > 40
            ? item?.description?.substring(0, 40) + '...'
            : item?.description}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:border-gray-800">
              <DropdownMenuItem onClick={() => setIsView(true)}>
                <Eye className="size-4 text-gray-600 hover:text-indigo-600" />
                <span className="ml-2 cursor-pointer hover:text-indigo-600">
                  {t.formatMessage({ id: 'TABANIMAL.VIEW' })}
                </span>
              </DropdownMenuItem>
              {userStorage?.role === 'SUPERADMIN' ? (
                <>
                  <DropdownMenuItem onClick={() => isSetEdit(true)}>
                    <PencilIcon className="size-4 text-gray-600 hover:text-cyan-600" />
                    <span className="ml-2 cursor-pointer hover:text-cyan-600">
                      {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsOpen(true)}>
                    <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                    <span className="ml-2 cursor-pointer hover:text-red-600">
                      {t.formatMessage({ id: 'TABANIMAL.DELETE' })}
                    </span>
                  </DropdownMenuItem>
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
        <ActionModalDialog
          loading={loading}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClick={() => deleteItem(item)}
        />
        {isEdit ? (
          <UpdateHealth
            health={item}
            showModal={isEdit}
            setShowModal={isSetEdit}
          />
        ) : null}
        {isView ? (
          <ViewHealth
            health={item}
            showModal={isView}
            setShowModal={setIsView}
          />
        ) : null}
      </TableRow>
    </>
  );
};
export { ListHealth };
