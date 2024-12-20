import { CreateOrUpdateOneFinanceAPI } from '@/api-site/finances';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import {
  SelectInput,
  TextAreaInput,
  TextInput,
} from '@/components/ui-setting/shadcn';
import { Label } from '@/components/ui/label';
import { financeType } from '@/i18n/default-exports';
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
  animal,
}: {
  showModal: boolean;
  setShowModal: any;
  finance?: any;
  animal?: any;
}) => {
  const {
    t,
    locale,
    control,
    setValue,
    handleSubmit,
    errors,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  useEffect(() => {
    if (finance) {
      const fields = ['amount', 'type', 'detail'];
      fields?.forEach((field: any) => setValue(field, finance[field]));
    }
  }, [finance, setValue]);

  useEffect(() => {
    if (animal) {
      const fields = ['code'];
      fields?.forEach((field: any) => setValue(field, animal[field]));
    }
  }, [animal, setValue]);

  // Create or Update data
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOrUpdateOneFinanceAPI();

  const onSubmit: SubmitHandler<FinancesModel> = async (
    payload: FinancesModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        financeId: finance?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Transaction saved successfully',
      });
      setShowModal(false);
    } catch (error: any) {
      setHasErrors(true);
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

                {animal?.id ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-60">
                      <Label>Bande</Label>
                      <TextInput
                        control={control}
                        type="text"
                        name="code"
                        errors={errors}
                        disabled
                      />
                    </div>
                    <div className="w-60">
                      <Label>Type</Label>
                      <TextInput
                        control={control}
                        type="text"
                        name="type"
                        defaultValue="EXPENSE"
                        errors={errors}
                        disabled
                      />
                    </div>
                    <div className="my-2">
                      <Label>Montant</Label>
                      <TextInput
                        control={control}
                        type="number"
                        name="amount"
                        placeholder="amount"
                        errors={errors}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-2">
                      <Label>Type de transaction</Label>
                      <SelectInput
                        control={control}
                        errors={errors}
                        placeholder="transaction type"
                        valueType="key"
                        name="type"
                        dataItem={financeType.filter((i) => i?.lang === locale)}
                      />
                    </div>
                    <div className="my-2">
                      <Label>Montant</Label>
                      <TextInput
                        control={control}
                        type="number"
                        name="amount"
                        placeholder="amount"
                        errors={errors}
                      />
                    </div>
                  </>
                )}
                <div className="mb-4">
                  <TextAreaInput
                    control={control}
                    label="Détail"
                    name="detail"
                    placeholder="transaction details"
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
                    {t.formatMessage({ id: 'ALERT.CANCEL' })}
                  </ButtonInput>
                  <ButtonInput
                    type="submit"
                    className="w-full"
                    variant="primary"
                    disabled={loading}
                    loading={loading}
                  >
                    {t.formatMessage({ id: 'ALERT.CONTINUE' })}
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
