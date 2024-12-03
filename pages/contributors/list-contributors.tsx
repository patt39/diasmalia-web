/* eslint-disable @next/next/no-img-element */
import {
  ContributorResendEmailAPI,
  DeleteOneContributorAPI,
  InvitationResendEmailAPI,
} from '@/api-site/contributors';
import { useInputState } from '@/components/hooks';
import { ActionModalDialog } from '@/components/ui-setting/shadcn';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import {
  capitalizeOneFirstLetter,
  firstLetterToUpperCase,
} from '@/utils/utils';
import {
  Eye,
  MailCheck,
  MoreHorizontal,
  ScanFace,
  TicketX,
  TrashIcon,
} from 'lucide-react';
import { useState } from 'react';
import { UpdateContributorStatus } from './update-contributor-status';
import { ViewContributor } from './view-contributor';

const ListContributors = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen, userStorage } = useInputState();
  const [isEdit, isSetEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  const { isPending: loading, mutateAsync: deleteMutation } =
    DeleteOneContributorAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ contributorId: item?.id });
      AlertSuccessNotification({
        text: 'Contributor deleted successfully',
      });
      setIsOpen(false);
    } catch (error: any) {
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const { mutateAsync: saveMutation } = ContributorResendEmailAPI();

  const resendEmail = async (item: any) => {
    try {
      await saveMutation({
        userId: item?.userId,
      });
      AlertSuccessNotification({
        text: 'Email resend successfully',
      });
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const { mutateAsync: invitationMutation } = InvitationResendEmailAPI();

  const resendInvitationEmail = async (item: any) => {
    try {
      await invitationMutation({
        userId: item?.userId,
      });
      AlertSuccessNotification({
        text: 'Email resend successfully',
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
        <TableCell className="sm:table-cell">
          <Avatar>
            <AvatarImage src={item?.user?.profile?.photo} />
            <AvatarFallback>
              {capitalizeOneFirstLetter(item?.user?.profile?.firstName)}{' '}
              {capitalizeOneFirstLetter(item?.user?.profile?.lastName)}
            </AvatarFallback>
          </Avatar>
        </TableCell>
        <TableCell className="font-medium">
          {firstLetterToUpperCase(item?.user?.profile?.firstName)}{' '}
          {firstLetterToUpperCase(item?.user?.profile?.lastName)}
        </TableCell>
        <TableCell>
          <div className="font-medium">{item?.user?.profile?.phone}</div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {item?.user?.email}
          </div>{' '}
        </TableCell>
        {item?.user?.organizationId == item?.organizationId ? (
          <TableCell className="md:table-cell">
            {item?.user?.profile?.occupation?.length > 20
              ? item?.user?.profile?.occupation?.substring(0, 20) + '...'
              : item?.user?.profile?.occupation}
          </TableCell>
        ) : (
          <TableCell className="md:table-cell">Consultant</TableCell>
        )}
        <TableCell className="md:table-cell">
          {item?.role === 'ADMIN' ? (
            <Badge variant="default">{item?.role}</Badge>
          ) : (
            <Badge variant="secondary">{item?.role}</Badge>
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
              {item?.confirmedAt == null &&
              userStorage?.confirmedAt === null ? (
                <DropdownMenuItem onClick={() => resendEmail(item)}>
                  <MailCheck className="size-4 text-gray-600 hover:text-indigo-600" />
                  <span className="ml-2 cursor-pointer hover:text-indigo-600">
                    {t.formatMessage({ id: 'RESEND.EMAIL' })}
                  </span>
                </DropdownMenuItem>
              ) : item?.confirmedAt == null &&
                userStorage?.confirmedAt !== null &&
                item?.confirmation === 'CHOOSE' ? (
                <DropdownMenuItem onClick={() => resendInvitationEmail(item)}>
                  <MailCheck className="size-4 text-gray-600 hover:text-indigo-600" />
                  <span className="ml-2 cursor-pointer hover:text-indigo-600">
                    {t.formatMessage({ id: 'RESEND.EMAIL' })}
                  </span>
                </DropdownMenuItem>
              ) : item?.confirmedAt == null && item?.confirmation === 'NO' ? (
                <>
                  <DropdownMenuItem onClick={() => resendInvitationEmail(item)}>
                    <TicketX className="size-4 text-gray-600 hover:text-indigo-600" />
                    <span className="ml-2 cursor-pointer hover:text-indigo-600">
                      {t.formatMessage({ id: 'INVITATION.REJECTED' })}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => resendInvitationEmail(item)}>
                    <MailCheck className="size-4 text-gray-600 hover:text-indigo-600" />
                    <span className="ml-2 cursor-pointer hover:text-indigo-600">
                      {t.formatMessage({ id: 'RESEND.EMAIL' })}
                    </span>
                  </DropdownMenuItem>
                </>
              ) : null}
              {userStorage?.role === 'SUPERADMIN' ? (
                <>
                  {userStorage?.userCreatedId !== item?.user?.id ? (
                    <>
                      <DropdownMenuItem onClick={() => isSetEdit(true)}>
                        <ScanFace className="size-4 text-gray-600 hover:text-cyan-600" />
                        <span className="ml-2 cursor-pointer hover:text-cyan-600">
                          {t.formatMessage({ id: 'CHANGE.STATUS' })}
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
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      {isOpen ? (
        <ActionModalDialog
          loading={loading}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClick={() => deleteItem(item)}
        />
      ) : null}
      {isView ? (
        <ViewContributor
          contributor={item}
          showModal={isView}
          setShowModal={setIsView}
        />
      ) : null}
      {isEdit ? (
        <UpdateContributorStatus
          contributor={item}
          showModal={isEdit}
          setShowModal={isSetEdit}
        />
      ) : null}
    </>
  );
};
export { ListContributors };
