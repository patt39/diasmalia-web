import { GetOneSaleAPI } from '@/api-site/sales';
import { useReactHookForm } from '@/components/hooks';
import { TextAreaInput, TextInput } from '@/components/ui-setting/shadcn';
import { XIcon } from 'lucide-react';
import * as yup from 'yup';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const schema = yup.object({});

const ViewSale = ({
  showModal,
  setShowModal,
  sale,
}: {
  showModal: boolean;
  setShowModal: any;
  sale?: any;
}) => {
  const { t, control, errors } = useReactHookForm({ schema });

  const { data: getOneSale } = GetOneSaleAPI({
    saleId: sale.id,
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
                <div className="mb-2 items-center space-x-1">
                  <Label htmlFor="text">Client</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="soldTo"
                    defaultValue={getOneSale?.soldTo}
                    errors={errors}
                    disabled
                  />
                </div>
                <div className="mb-2 items-center  space-x-1">
                  <Label htmlFor="text">Email</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="email"
                    defaultValue={getOneSale?.email}
                    errors={errors}
                    disabled
                  />
                </div>
                <div className="mb-2 items-center  space-x-1">
                  <Label htmlFor="text">Phone</Label>
                  <TextInput
                    control={control}
                    type="number"
                    name="phone"
                    defaultValue={getOneSale?.phone}
                    errors={errors}
                    disabled
                  />
                </div>
                <div className="mb-2 items-center  space-x-1">
                  <Label htmlFor="text">Address</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="address"
                    defaultValue={getOneSale?.address}
                    errors={errors}
                    disabled
                  />
                </div>
                <Label>{t.formatMessage({ id: 'SALE.CHANNEL' })}</Label>
                <div className="mb-4 flex items-center space-x-4">
                  <Input disabled type="text" value={getOneSale?.method} />
                </div>
                <div className="mb-4">
                  <TextAreaInput
                    control={control}
                    label="Details of sale"
                    name="detail"
                    defaultValue={getOneSale?.note}
                    errors={errors}
                    disabled
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewSale };
