import { GetUserByOrganizationAPI } from '@/api-site/user';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { XIcon } from 'lucide-react';
import { useIntl } from 'react-intl';

const ViewProject = ({
  showModal,
  setShowModal,
  organization,
}: {
  showModal: boolean;
  setShowModal: any;
  organization?: any;
}) => {
  const t = useIntl();
  const { data: getUser } = GetUserByOrganizationAPI({
    organizationId: organization?.organizationId,
  });

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
                <div className="w-full my-2">
                  <Label>{t.formatMessage({ id: 'FIRST.NAME' })}</Label>
                  <Input
                    type="text"
                    defaultValue={organization?.organization?.name}
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <Label>Description</Label>
                  <Textarea
                    defaultValue={organization?.organization?.description}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewProject };
