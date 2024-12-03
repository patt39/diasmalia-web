import { CreateOneCheckAPI } from '@/api-site/breedings';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { SelectInput } from '@/components/ui-setting/shadcn';
import { checkPregnancyMethod, checkResults } from '@/i18n/default-exports';
import { CheckPregnancysModel } from '@/types/breeding';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { Label } from '@radix-ui/react-label';
import { XIcon } from 'lucide-react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { DateInput } from '../ui-setting/ant';

const schema = yup.object({
  farrowingDate: yup.date().optional(),
  method: yup.string().required('method is required'),
  result: yup.string().required('result is required'),
});

const CheckPregnancy = ({
  showModal,
  setShowModal,
  breeding,
}: {
  showModal: boolean;
  setShowModal: any;
  breeding?: any;
}) => {
  const {
    t,
    watch,
    locale,
    control,
    handleSubmit,
    errors,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });
  const watchResult = watch('result');

  // Create data
  const { isPending: loading, mutateAsync: saveMutation } = CreateOneCheckAPI();

  const onSubmit: SubmitHandler<CheckPregnancysModel> = async (
    payload: CheckPregnancysModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        breedingId: breeding?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Breeding checked successfully',
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
                <div className="mb-2">
                  <Label>
                    Methode
                    <span className="text-red-600">*</span>
                  </Label>
                  <SelectInput
                    control={control}
                    errors={errors}
                    valueType="key"
                    name="method"
                    placeholder="select method"
                    dataItem={checkPregnancyMethod.filter(
                      (i) => i?.lang === locale,
                    )}
                  />
                </div>
                <div className="mb-2">
                  <Label>
                    Résultat
                    <span className="text-red-600">*</span>
                  </Label>
                  <SelectInput
                    control={control}
                    errors={errors}
                    placeholder="result"
                    valueType="key"
                    name="result"
                    dataItem={checkResults.filter((i) => i?.lang === locale)}
                  />
                </div>
                {watchResult === 'PREGNANT' ? (
                  <>
                    <div>
                      <Label>
                        Donnez la date de mise bas
                        <span className="text-red-600">*</span>
                      </Label>
                      <DateInput
                        control={control}
                        errors={errors}
                        placeholder="farrowing date"
                        name="farrowingDate"
                      />
                    </div>
                  </>
                ) : null}
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

export { CheckPregnancy };
