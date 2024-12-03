/* eslint-disable @next/next/no-img-element */
import { DeleteOneTaskAPI } from '@/api-site/task';
import { useInputState } from '@/components/hooks';
import { ActionModalDialog } from '@/components/ui-setting/shadcn';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { firstLetterToUpperCase } from '@/utils/utils';
import {
  BadgeCheck,
  Eye,
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';
import { useState } from 'react';
import { ChangeStatus } from './change-status';
import { UpdateTask } from './update-task';
import { ViewTask } from './view-task';

const ListTasks = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen, userStorage } = useInputState();
  const [isEdit, isSetEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isChangeStatus, setIsChangeStatus] = useState(false);

  const { isPending: loading, mutateAsync: deleteMutation } =
    DeleteOneTaskAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ taskId: item?.id });
      AlertSuccessNotification({
        text: 'Task deleted successfully',
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
      <TableRow key={index}>
        <TableCell>
          {item?.title?.length > 20
            ? item?.title?.substring(0, 20) + '...'
            : item?.title}
        </TableCell>
        <TableCell className="font-medium">
          {item?.type === 'GENERIC' ? item?.frequency : item?.periode}
        </TableCell>
        <TableCell>
          <div className="font-medium">{item?.animalType?.name}</div>
        </TableCell>
        <TableCell className="md:table-cell">
          {firstLetterToUpperCase(item?.contributor?.user?.profile?.firstName)}{' '}
          {firstLetterToUpperCase(item?.contributor?.user?.profile?.lastName)}
        </TableCell>
        <TableCell className="md:table-cell">
          {item?.status === 'TODO' ? (
            <Badge className="text-xs" variant="destructive">
              {t.formatMessage({ id: 'TODO' })}
            </Badge>
          ) : item?.status === 'INPROGRESS' ? (
            <Badge className="text-xs" variant="secondary">
              {t.formatMessage({ id: 'INPROGRESS' })}
            </Badge>
          ) : (
            <Badge className="text-xs" variant="default">
              {t.formatMessage({ id: 'DONE' })}
            </Badge>
          )}
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
              {userStorage?.id === item?.contributorId &&
              item?.status === 'TODO' ? (
                <DropdownMenuItem onClick={() => setIsChangeStatus(true)}>
                  <BadgeCheck className="size-4 text-gray-600 hover:text-sky-600" />
                  <span className="ml-2 cursor-pointer hover:text-sky-400">
                    {t.formatMessage({ id: 'CHANGE.STATUS' })}
                  </span>
                </DropdownMenuItem>
              ) : null}
              {userStorage?.role === 'SUPERADMIN' ? (
                <>
                  {item?.status === 'TODO' ? (
                    <DropdownMenuItem onClick={() => isSetEdit(true)}>
                      <PencilIcon className="size-4 text-gray-600 hover:text-cyan-600" />
                      <span className="ml-2 cursor-pointer hover:text-cyan-600">
                        {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                      </span>
                    </DropdownMenuItem>
                  ) : null}
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
      </TableRow>
      <ActionModalDialog
        loading={loading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={() => deleteItem(item)}
      />
      {isEdit ? (
        <UpdateTask task={item} showModal={isEdit} setShowModal={isSetEdit} />
      ) : null}
      {isView ? (
        <ViewTask task={item} showModal={isView} setShowModal={setIsView} />
      ) : null}
      {isChangeStatus ? (
        <ChangeStatus
          task={item}
          showModal={isChangeStatus}
          setShowModal={setIsChangeStatus}
        />
      ) : null}
    </>
  );
};
export { ListTasks };
