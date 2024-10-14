import { CreateOrUpdateOneWeaningAPI } from '@/api-site/weanings';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { WeaningsModel } from '@/types/weanings';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { TextInput } from '../ui-setting/shadcn';
import { Label } from '../ui/label';

const schema = yup.object({
  code: yup.string().optional(),
  litter: yup.number().required('litter is a required field'),
  weight: yup.number().required('weight is a required field'),
});

const CreateOrUpdateWeanings = ({
  showModal,
  setShowModal,
  weaning,
  animal,
}: {
  showModal: boolean;
  setShowModal: any;
  weaning?: any;
  animal?: any;
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
    if (weaning) {
      const fields = ['litter', 'weight'];
      fields?.forEach((field: any) => setValue(field, weaning[field]));
    }
  }, [weaning, setValue]);

  useEffect(() => {
    if (animal) {
      const fields = ['code'];
      fields?.forEach((field: any) => setValue(field, animal[field]));
    }
  }, [animal, setValue]);

  // Create or Update data
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOrUpdateOneWeaningAPI();

  const onSubmit: SubmitHandler<WeaningsModel> = async (
    payload: WeaningsModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        weaningId: weaning?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Weaning saved successfully',
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

                {!weaning?.id ? (
                  <div className="mb-2 items-center">
                    <Label>Animal code</Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="code"
                      defaultValue={`${animal?.animal?.code}`}
                      errors={errors}
                    />
                  </div>
                ) : null}
                <div className="mb-2">
                  <Label>
                    {t.formatMessage({ id: 'TABEGGHAVESTING.NUMBER' })}
                    <span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="number"
                    name="litter"
                    placeholder="Litter"
                    errors={errors}
                  />
                </div>
                <div className="mb-4">
                  <Label>
                    {t.formatMessage({ id: 'VIEW.WEIGHT' })}(g)
                    <span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="number"
                    name="weight"
                    placeholder="Unit weight"
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

export { CreateOrUpdateWeanings };
