import { GetOneSaleAPI } from '@/api-site/sales';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { XIcon } from 'lucide-react';
import { useIntl } from 'react-intl';

const ViewSale = ({
  showModal,
  setShowModal,
  sale,
}: {
  showModal: boolean;
  setShowModal: any;
  sale?: any;
}) => {
  const t = useIntl();
  const { data: getOneSale } = GetOneSaleAPI({
    saleId: sale?.id,
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
            <form className="mt-6">
              <div className="flex-auto justify-center p-2">
                {[
                  'Dinde',
                  'Canard',
                  'Poulets Goliaths',
                  'Pondeuses',
                  'Poulets Brahma',
                  'Pintarde',
                  'Quails',
                  'Pisciculture',
                  'Poulet de chair',
                ].includes(getOneSale?.animalType?.name) ? (
                  <div className="mb-2 items-center space-x-1">
                    <Label htmlFor="text">Code de la bande</Label>
                    <Input
                      defaultValue={getOneSale?.animal?.code || 'N/A'}
                      disabled
                    />
                  </div>
                ) : null}
                <div className="mb-2 items-center space-x-1">
                  <Label htmlFor="text">Client</Label>
                  <Input defaultValue={getOneSale?.soldTo || 'N/A'} disabled />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="mb-2 w-80">
                    <Label htmlFor="text">Email</Label>
                    <Input defaultValue={getOneSale?.email || 'N/A'} disabled />
                  </div>
                  <div className="mb-2 w-80">
                    <Label htmlFor="text">Phone</Label>
                    <Input defaultValue={getOneSale?.phone || 'N/A'} disabled />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="mb-2 w-80">
                    <Label htmlFor="text">Address</Label>
                    <Input
                      defaultValue={getOneSale?.address || 'N/A'}
                      disabled
                    />
                  </div>
                  <div className="mb-2 w-80">
                    <Label>{t.formatMessage({ id: 'SALE.CHANNEL' })}</Label>
                    <Input disabled type="text" value={getOneSale?.method} />
                  </div>
                </div>
                {getOneSale?.note !== null ? (
                  <>
                    <Label>{t.formatMessage({ id: 'SALE.DETAIL' })}</Label>
                    <div className="mb-2">
                      <Textarea defaultValue={getOneSale?.note} disabled />
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

export { ViewSale };
