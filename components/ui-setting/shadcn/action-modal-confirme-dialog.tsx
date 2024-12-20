import { VariantButton } from '@/components/ui/button';
import { ButtonInput } from '..';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useIntl } from 'react-intl';

interface Props {
  loading?: boolean;
  isConfirmOpen?: boolean;
  setIsConfirmOpen?: any;
  variant?: VariantButton;
  buttonDialog?: React.ReactNode;
  onClick?: (node?: Element | null) => void;
}

const ActionModalConfirmeDialog = ({
  loading,
  isConfirmOpen,
  onClick,
  setIsConfirmOpen,
  buttonDialog,
  variant = 'primary',
}: Props) => {
  const t = useIntl();

  return (
    <>
      <AlertDialog
        onOpenChange={setIsConfirmOpen}
        open={isConfirmOpen}
        defaultOpen={isConfirmOpen}
      >
        <AlertDialogTrigger asChild>{buttonDialog}</AlertDialogTrigger>
        <AlertDialogContent className="dark:border-gray-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              {t.formatMessage({ id: 'ALERT.TITLE' })}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex items-center space-x-4 mt-2">
            <ButtonInput
              type="button"
              className="w-full"
              size="lg"
              variant="outline"
              onClick={() => setIsConfirmOpen((lk: boolean) => !lk)}
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

export { ActionModalConfirmeDialog };
