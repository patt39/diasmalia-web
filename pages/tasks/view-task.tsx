import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatDateDDMMYY } from '@/utils';
import { XIcon } from 'lucide-react';
import { useIntl } from 'react-intl';

const ViewTask = ({
  showModal,
  setShowModal,
  task,
}: {
  showModal: boolean;
  setShowModal: any;
  task?: any;
}) => {
  const t = useIntl();

  return (
    <>
      {showModal ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative m-auto max-h-screen w-full max-w-2xl overflow-y-scroll rounded-xl bg-white  p-5 shadow-lg dark:bg-[#121212]">
            <button
              className="float-right border-0 bg-transparent text-black"
              onClick={() => setShowModal(false)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                <XIcon />
              </span>
            </button>
            <form className="mt-2">
              <div className="flex-auto justify-center p-2">
                <div className="w-full my-2">
                  <Label>Type</Label>
                  <Input type="text" defaultValue={task?.type} disabled />
                </div>
                {task?.type === 'SPECIFIC' ? (
                  <div className="flex items-center mb-2 space-x-4">
                    <div className="w-80">
                      <Label>{t.formatMessage({ id: 'ASSIGNE.TO' })}</Label>
                      <Input
                        defaultValue={`${task?.contributor?.user?.profile?.firstName} ${task?.contributor?.user?.profile?.lastName}`}
                        disabled
                      />
                    </div>
                    <div className="w-80">
                      <Label>{t.formatMessage({ id: 'DUEDATE' })}</Label>
                      <Input
                        value={formatDateDDMMYY(task?.dueDate) || 'N/A'}
                        disabled
                      />
                    </div>
                  </div>
                ) : null}
                {task?.type === 'GENERIC' ? (
                  <div className="my-2">
                    <Label>{t.formatMessage({ id: 'ASSIGNE.TO' })}</Label>
                    <Input
                      defaultValue={`${task?.contributor?.user?.profile?.firstName} ${task?.contributor?.user?.profile?.lastName}`}
                      disabled
                    />
                  </div>
                ) : null}
                <div className="mb-2">
                  <Label> {t.formatMessage({ id: 'TITLE' })}</Label>
                  <Input defaultValue={task?.title} disabled />
                </div>
                <div className="mb-4">
                  <Label>Description</Label>
                  <Textarea defaultValue={task?.description} disabled />
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewTask };
