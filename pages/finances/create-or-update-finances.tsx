import { CreateOrUpdateOneFinanceAPI } from '@/api-site/finances';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import {
  SelectInput,
  TextAreaInput,
  TextInput,
} from '@/components/ui-setting/shadcn';
import { FinancesModel } from '@/types/finance';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  amount: yup.number().required('amount is required'),
  type: yup.string().required('type is a required field'),
  detail: yup.string().required('detail is a required field'),
});

const CreateOrUpdateFinances = ({
  showModal,
  setShowModal,
  finance,
}: {
  showModal: boolean;
  setShowModal: any;
  finance?: any;
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  useEffect(() => {
    if (finance) {
      const fields = ['amount', 'type', 'detail'];
      fields?.forEach((field: any) => setValue(field, finance[field]));
    }
  }, [finance, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneFinanceAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<FinancesModel> = async (
    payload: FinancesModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        financeId: finance?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Transaction saved successfully',
      });
      setShowModal(false);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

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
            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex-auto justify-center p-2">
                {hasErrors && (
                  <div className="bg-white py-6 dark:bg-[#121212]">
                    <div className="rounded-lg bg-red-100">
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <p className="ml-3 text-sm font-medium text-red-500">
                            {hasErrors}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <TextInput
                    control={control}
                    type="number"
                    name="amount"
                    placeholder="Give an amount"
                    errors={errors}
                  />
                </div>

                <div className="mb-4">
                  <SelectInput
                    firstOptionName="Choose a transaction type"
                    control={control}
                    errors={errors}
                    placeholder="Select type"
                    valueType="text"
                    name="type"
                    dataItem={[
                      { id: 1, name: 'INCOME' },
                      { id: 2, name: 'EXPENSE' },
                    ]}
                  />
                </div>

                <div className="mb-4">
                  <TextAreaInput
                    control={control}
                    label="Detail"
                    name="detail"
                    placeholder="Give details about transaction"
                    errors={errors}
                  />
                </div>

                <div className="mt-4 flex items-center space-x-4">
                  <ButtonInput
                    type="button"
                    className="w-full"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </ButtonInput>

                  <ButtonInput
                    type="submit"
                    className="w-full"
                    variant="primary"
                    disabled={loading}
                    loading={loading}
                  >
                    Save
                  </ButtonInput>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { CreateOrUpdateFinances };
