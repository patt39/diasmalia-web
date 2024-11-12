import { UpdateOneIncubationAPI } from '@/api-site/incubations';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { IncubationsModel } from '@/types/incubation';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
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

const UpdateIncubations = ({
  showModal,
  setShowModal,
  incubation,
}: {
  showModal: boolean;
  setShowModal: any;
  incubation?: any;
}) => {
  const {
    t,
    control,
    errors,
    setValue,
    handleSubmit,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  useEffect(() => {
    if (incubation) {
      const fields = ['quantityEnd', 'quantityStart', 'dueDate'];
      fields?.forEach((field: any) => setValue(field, incubation[field]));
    }
  }, [incubation, setValue]);

  // Update
  const { isPending: loading, mutateAsync: saveMutation } =
    UpdateOneIncubationAPI();

  const onSubmit: SubmitHandler<IncubationsModel> = async () => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        incubationId: incubation?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Incubation updated successfully',
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

                <div className="flex items-center my-2 space-x-2">
                  <div>
                    <Label>
                      {t.formatMessage({ id: 'EGGS.INCUBATED' })}
                      <span className="text-red-600">*</span>
                    </Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="quantityStart"
                      errors={errors}
                    />
                  </div>
                  <div className="mr-2">
                    <Label className="mr-4 space-x-2">
                      {t.formatMessage({ id: 'EGGS.HATCHED' })}
                    </Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="quantityEnd"
                      placeholder="eggs hatched"
                      errors={errors}
                    />
                  </div>
                  <div className="items-center">
                    <Label>
                      {t.formatMessage({ id: 'HATCHING.DATE' })}
                      <span className="text-red-600">*</span>
                    </Label>
                    <DateInput
                      control={control}
                      errors={errors}
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

export { UpdateIncubations };
