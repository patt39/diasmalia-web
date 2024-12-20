import { XIcon } from 'lucide-react';
import { useIntl } from 'react-intl';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const ViewAvesSale = ({
  showModal,
  setShowModal,
  sale,
}: {
  showModal: boolean;
  setShowModal: any;
  sale?: any;
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
            <form className="mt-6">
              <div className="flex-auto justify-center p-2">
                <div className="mb-2 items-center space-x-1">
                  <Label htmlFor="text">Code de la bande</Label>
                  <Input defaultValue={sale?.animal?.code} disabled />
                </div>
                <div className="mb-2 items-center space-x-1">
                  <Label htmlFor="text">Client</Label>
                  <Input defaultValue={sale?.soldTo || 'N/A'} disabled />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="mb-2 w-80">
                    <Label htmlFor="text">Email</Label>
                    <Input defaultValue={sale?.email || 'N/A'} disabled />
                  </div>
                  <div className="mb-2 w-80">
                    <Label htmlFor="text">Phone</Label>
                    <Input defaultValue={sale?.phone || 'N/A'} disabled />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="mb-2 w-80">
                    <Label htmlFor="text">Address</Label>
                    <Input defaultValue={sale?.address || 'N/A'} disabled />
                  </div>
                  <div className="mb-2 w-80">
                    <Label>{t.formatMessage({ id: 'SALE.CHANNEL' })}</Label>
                    <Input disabled type="text" value={sale?.method} />
                  </div>
                </div>
                {sale?.note !== null ? (
                  <>
                    <Label>{t.formatMessage({ id: 'SALE.DETAIL' })}</Label>
                    <div className="mb-2">
                      <Textarea defaultValue={sale?.note} disabled />
                    </div>
                  </>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewAvesSale };
