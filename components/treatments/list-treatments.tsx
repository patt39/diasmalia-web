/* eslint-disable @next/next/no-img-element */
import { DeleteOneTreatmentAPI } from '@/api-site/treatment';
import { useInputState } from '@/components/hooks';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formatDateDDMMYY,
} from '@/utils';
import { Eye, MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { UpdateTreatments } from './update-treatments';
import { ViewTreatment } from './view-treatment';

const ListTreatments = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  const { isPending: loading, mutateAsync: saveMutation } =
    DeleteOneTreatmentAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await saveMutation({ treatmentId: item?.id });
      AlertSuccessNotification({
        text: 'Treatment deleted successfully',
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
      <TableRow key={index} className="dark:border-gray-800">
        <TableCell className="font-medium">{item?.animal?.code}</TableCell>
        <TableCell className="font-medium">
          <div className="font-medium">
            {item?.name?.length > 20
              ? item?.name?.substring(0, 20) + '...'
              : item?.name || 'N/A'}
          </div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {item?.diagnosis?.length > 20
              ? item?.diagnosis?.substring(0, 20) + '...'
              : item?.diagnosis || 'N/A'}
          </div>
        </TableCell>
        <TableCell className="font-medium">
          {item?.health?.name.length > 20
            ? item?.health?.name?.substring(0, 20) + '...'
            : item?.health?.name || 'N/A'}
        </TableCell>
        <TableCell className="font-medium">{item.dose || 'N/A'}</TableCell>
        <TableCell className="hidden md:table-cell">{item?.method}</TableCell>
        <TableCell className="hidden md:table-cell">
          {formatDateDDMMYY(item?.createdAt as Date)}
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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setIsView(true)}>
                <Eye className="size-4 text-gray-600 hover:text-indigo-600" />
                <span className="ml-2 cursor-pointer hover:text-indigo-600">
                  {t.formatMessage({ id: 'TABANIMAL.VIEW' })}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsEdit(true)}>
                <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                <span className="ml-2 cursor-pointer hover:text-indigo-600">
                  {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                </span>
              </DropdownMenuItem>
              {item?.animal.status !== 'ACTIVE' ? (
                <DropdownMenuItem onClick={() => setIsOpen(true)}>
                  <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                  <span className="ml-2 cursor-pointer hover:text-red-600">
                    {t.formatMessage({ id: 'TABANIMAL.DELETE' })}
                  </span>
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
            <ActionModalDialog
              loading={loading}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onClick={() => deleteItem(item)}
            />
          </DropdownMenu>
        </TableCell>
      </TableRow>
      {isEdit ? (
        <UpdateTreatments
          treatment={item}
          showModal={isEdit}
          setShowModal={setIsEdit}
        />
      ) : null}
      {isView ? (
        <ViewTreatment
          treatment={item}
          showModal={isView}
          setShowModal={setIsView}
        />
      ) : null}
    </>
  );
};
export { ListTreatments };
