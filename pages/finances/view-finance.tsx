import { GetOneFinanceAPI } from '@/api-site/finances';
import { useReactHookForm } from '@/components/hooks';
import { TextAreaInput, TextInput } from '@/components/ui-setting/shadcn';
import { XIcon } from 'lucide-react';
import * as yup from 'yup';

const schema = yup.object({});

const ViewFinance = ({
  showModal,
  setShowModal,
  finance,
}: {
  showModal: boolean;
  setShowModal: any;
  finance?: any;
}) => {
  const { control, errors } = useReactHookForm({ schema });

  const { data: getOneFinance } = GetOneFinanceAPI({
    financeId: finance.id,
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
                <div className="mb-4">
                  <TextInput
                    disabled
                    control={control}
                    type="number"
                    name="amount"
                    defaultValue={getOneFinance.amount}
                    errors={errors}
                  />
                </div>
                <div className="mb-4">
                  <TextInput
                    control={control}
                    type="text"
                    name="type"
                    defaultValue={getOneFinance.type}
                    errors={errors}
                    disabled
                  />
                </div>
              </div>
              <div className="mb-4">
                <TextAreaInput
                  control={control}
                  label="Detail"
                  name="detail"
                  defaultValue={getOneFinance.detail}
                  errors={errors}
                  disabled
                />
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewFinance };
