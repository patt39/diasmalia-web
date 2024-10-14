import { CreateOneIncubationAPI } from '@/api-site/incubations';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { IncubationsModel } from '@/types/incubation';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { DateInput } from '../ui-setting/ant';
import { TextInput } from '../ui-setting/shadcn';
import { Label } from '../ui/label';

const schema = yup.object({
  code: yup.string().optional(),
  quantityEnd: yup.number().optional(),
  quantityStart: yup.number().required('quantity is required'),
  dueDate: yup.date().required('dueDate is required field'),
});

const CreateIncubations = ({
  showModal,
  setShowModal,
  incubation,
}: {
  showModal: boolean;
  setShowModal: any;
  incubation?: any;
}) => {
  const { t, control, errors, handleSubmit, hasErrors, setHasErrors } =
    useReactHookForm({ schema });

  // Create
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOneIncubationAPI();

  const onSubmit: SubmitHandler<IncubationsModel> = async (
    payload: IncubationsModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Incubation saved successfully',
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

                <div className="items-center">
                  <Label>{t.formatMessage({ id: 'ANIMAL.CODE' })}</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="code"
                    defaultValue={`${incubation?.animal?.code}`}
                    errors={errors}
                  />
                </div>
                <div className="flex items-center my-2 space-x-10">
                  <div className="w-80">
                    <Label>
                      {t.formatMessage({ id: 'EGGS.INCUBATED' })}
                      <span className="text-red-600">*</span>
                    </Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="quantityStart"
                      defaultValue={`${incubation?.quantity}`}
                      placeholder="Number eggs incubated"
                      errors={errors}
                    />
                  </div>
                  <div>
                    <Label>
                      {t.formatMessage({ id: 'HATCHING.DATE' })}
                      <span className="text-red-600">*</span>
                    </Label>
                    <DateInput
                      control={control}
                      errors={errors}
                      placeholder="Hatching date"
                      name="dueDate"
                    />
                  </div>
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

export { CreateIncubations };
