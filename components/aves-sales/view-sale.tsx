import { GetOneSaleAPI } from '@/api-site/sales';
import { useReactHookForm } from '@/components/hooks';
import { TextAreaInput, TextInput } from '@/components/ui-setting/shadcn';
import { XIcon } from 'lucide-react';
import * as yup from 'yup';

const schema = yup.object({});

const ViewAvesSale = ({
  showModal,
  setShowModal,
  sale,
}: {
  showModal: boolean;
  setShowModal: any;
  sale?: any;
}) => {
  const { control, errors } = useReactHookForm({ schema });

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
            <form className="mt-4">
              <div className="flex-auto justify-center p-2">
                <div className="mb-4 flex items-center space-x-2">
                  <TextInput
                    control={control}
                    type="number"
                    name="number"
                    defaultValue={getOneSale.number}
                    errors={errors}
                    disabled
                  />
                  <TextInput
                    control={control}
                    type="number"
                    name="price"
                    defaultValue={getOneSale.price}
                    errors={errors}
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <TextInput
                    control={control}
                    type="text"
                    name="soldTo"
                    defaultValue={getOneSale.soldTo}
                    errors={errors}
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <TextInput
                    control={control}
                    type="text"
                    name="email"
                    defaultValue={getOneSale.email}
                    errors={errors}
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <TextInput
                    control={control}
                    type="number"
                    name="phone"
                    defaultValue={getOneSale.phone}
                    errors={errors}
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <TextInput
                    control={control}
                    type="text"
                    name="address"
                    defaultValue={getOneSale.address}
                    errors={errors}
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <TextAreaInput
                    control={control}
                    label="Details of sale"
                    name="detail"
                    defaultValue={`Sale of ${getOneSale.detail}`}
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

export { ViewAvesSale };
