import { VariantButton } from '@/components/ui/button';
import { ButtonInput } from '..';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useIntl } from 'react-intl';

interface Props {
  loading?: boolean;
  isOpen?: boolean;
  setIsOpen?: any;
  variant?: VariantButton;
  buttonDialog?: React.ReactNode;
  onClick?: (node?: Element | null) => void;
}

const ActionModalDialog = ({
  loading,
  isOpen,
  onClick,
  setIsOpen,
  buttonDialog,
  variant = 'destructive',
}: Props) => {
  const t = useIntl();

  return (
    <>
      <AlertDialog onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
        <AlertDialogTrigger asChild>{buttonDialog}</AlertDialogTrigger>
        <AlertDialogContent className="dark:border-gray-900">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t.formatMessage({ id: 'ALERT.TITLE' })}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t.formatMessage({ id: 'ALERT.DESCRIPTION' })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center space-x-4">
            <ButtonInput
              type="button"
              className="w-full"
              size="lg"
              variant="outline"
              onClick={() => setIsOpen((lk: boolean) => !lk)}
            >
              {t.formatMessage({ id: 'ALERT.CANCEL' })}
            </ButtonInput>
            <ButtonInput
              type="button"
              className="w-full"
              size="lg"
              variant={variant}
              onClick={onClick}
              loading={loading}
            >
              {t.formatMessage({ id: 'ALERT.CONTINUE' })}
            </ButtonInput>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export { ActionModalDialog };
