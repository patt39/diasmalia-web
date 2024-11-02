import { useReactHookForm } from '@/components/hooks';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { XIcon } from 'lucide-react';
import * as yup from 'yup';

const schema = yup.object();

const ViewContributor = ({
  showModal,
  setShowModal,
  contributor,
}: {
  showModal: boolean;
  setShowModal: any;
  contributor?: any;
}) => {
  const { t } = useReactHookForm({ schema });

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
            <div className="mt-2">
              <div className="flex-auto justify-center p-2">
                <div className="my-2 flex items-center space-x-4">
                  <div className="w-80">
                    <Label>{t.formatMessage({ id: 'FIRST.NAME' })}</Label>
                    <Input
                      type="text"
                      defaultValue={`${contributor?.user?.profile?.firstName}`}
                      disabled
                    />
                  </div>
                  <div className="w-80">
                    <Label>{t.formatMessage({ id: 'LAST.NAME' })}</Label>
                    <Input
                      type="text"
                      defaultValue={`${contributor?.user?.profile?.lastName}`}
                      disabled
                    />
                  </div>
                </div>
                <div className="my-2 flex items-center space-x-4">
                  <div className="w-80">
                    <Label>Email</Label>
                    <Input
                      type="text"
                      defaultValue={`${contributor?.user?.email}`}
                      disabled
                    />
                  </div>
                  <div className="w-80">
                    <Label>Phone</Label>
                    <Input
                      type="number"
                      defaultValue={`${contributor?.user?.profile?.phone}`}
                      disabled
                    />
                  </div>
                </div>
                <div className="my-2 flex items-center space-x-4">
                  <div className="w-80">
                    <Label>Role</Label>
                    <Input
                      type="text"
                      defaultValue={`${contributor?.user?.profile?.occupation}`}
                      disabled
                    />
                  </div>
                  <div className="w-80">
                    <Label>Status</Label>
                    <Input
                      type="text"
                      defaultValue={`${contributor?.role}`}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewContributor };
