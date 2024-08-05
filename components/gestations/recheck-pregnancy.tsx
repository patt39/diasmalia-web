import { UpdateOneCheckAPI } from '@/api-site/breedings';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { SelectInput } from '@/components/ui-setting/shadcn';
import { CheckPregnancysModel } from '@/types/breeding';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  method: yup.string().required('method is required'),
  result: yup.string().required('result is required'),
});

const ReCheckPregnancy = ({
  showModal,
  setShowModal,
  gestation,
}: {
  showModal: boolean;
  setShowModal: any;
  gestation?: any;
}) => {
  const {
    control,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  //Update data
  const { mutateAsync: saveMutation } = UpdateOneCheckAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<CheckPregnancysModel> = async (
    payload: CheckPregnancysModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        checkPregnancyId: gestation?.checkPregnancyId,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Breeding rechecked successfully',
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
                <div className="mb-4 flex items-center space-x-4 cursor-pointer">
                  <SelectInput
                    firstOptionName="Choose a size"
                    control={control}
                    errors={errors}
                    placeholder="Select method"
                    valueType="text"
                    name="method"
                    dataItem={[
                      { id: 1, name: 'BLOOD_TEST' },
                      { id: 1, name: 'RECTAL_PALPATION' },
                      { id: 1, name: 'OBSERVATION' },
                      { id: 1, name: 'ULTRASOUND' },
                      { id: 1, name: 'ECHOGRAPHY' },
                      { id: 1, name: 'PALPATION' },
                    ]}
                  />
                  <SelectInput
                    firstOptionName="Choose a size"
                    control={control}
                    errors={errors}
                    placeholder="Select result"
                    valueType="text"
                    name="result"
                    dataItem={[
                      { id: 1, name: 'OPEN' },
                      { id: 2, name: 'PREGNANT' },
                    ]}
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

export { ReCheckPregnancy };
