import { UpdateOneGestationAPI } from '@/api-site/gestation';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { checkPregnancyMethod } from '@/i18n/default-exports';
import { GestationsModel } from '@/types/gestation';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { DateInput } from '../ui-setting/ant';
import { SelectInput, TextAreaInput } from '../ui-setting/shadcn';
import { Label } from '../ui/label';

const schema = yup.object({
  note: yup.string().optional(),
  method: yup.string().optional(),
  farrowingDate: yup.date().optional(),
});

const UpdateGestations = ({
  showModal,
  setShowModal,
  gestation,
}: {
  showModal: boolean;
  setShowModal: any;
  gestation?: any;
}) => {
  const {
    t,
    locale,
    control,
    errors,
    setValue,
    handleSubmit,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  useEffect(() => {
    if (gestation) {
      const fields = ['note', 'method', 'farrowingDate'];
      fields?.forEach((field: any) => setValue(field, gestation[field]));
    }
  }, [gestation, setValue]);

  //Update data
  const { isPending: loading, mutateAsync: saveMutation } =
    UpdateOneGestationAPI();

  const onSubmit: SubmitHandler<GestationsModel> = async (
    payload: GestationsModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        gestationId: gestation?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Gestation updated successfully',
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

                <div className="mb-4 flex items-center space-x-4">
                  <div className="w-80">
                    <Label>
                      Methode
                      <span className="text-red-600">*</span>
                    </Label>
                    <SelectInput
                      control={control}
                      errors={errors}
                      valueType="key"
                      name="method"
                      defaultValue={`${gestation?.method}`}
                      dataItem={checkPregnancyMethod.filter(
                        (i) => i?.lang === locale,
                      )}
                    />
                  </div>
                  <div className="w-80">
                    <Label>Date de mise bas</Label>
                    <DateInput
                      control={control}
                      errors={errors}
                      name="farrowingDate"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label>Observation</Label>
                  <TextAreaInput
                    control={control}
                    name="note"
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

export { UpdateGestations };
