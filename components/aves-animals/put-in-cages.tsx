import { PutInCagesAPI } from '@/api-site/cages';
import { useReactHookForm } from '@/components/hooks';
import { TextInput } from '@/components/ui-setting/shadcn';
import { CagesModel } from '@/types/animal';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { ButtonInput } from '../ui-setting';
import { Label } from '../ui/label';

const schema = yup.object({
  code: yup.string().required(),
  number: yup.number().required('number is required'),
  dimension: yup.number().required('dimension is required'),
  numberPerCage: yup.number().required('animals per cage is required'),
});

const PutInCages = ({
  showModal,
  setShowModal,
  animal,
}: {
  showModal: boolean;
  setShowModal: any;
  animal?: any;
}) => {
  const {
    t,
    control,
    handleSubmit,
    errors,
    hasErrors,
    setHasErrors,
    setValue,
  } = useReactHookForm({ schema });

  useEffect(() => {
    if (animal) {
      const fields = ['code'];
      fields?.forEach((field: any) => setValue(field, animal[field]));
    }
  }, [animal, setValue]);

  // Create
  const { isPending: loading, mutateAsync: saveMutation } = PutInCagesAPI();

  const onSubmit: SubmitHandler<CagesModel> = async (payload: CagesModel) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Cages created successfully',
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
            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
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

                <div className="mb-2 items-center">
                  <Label>Code de la bande</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="code"
                    errors={errors}
                    disabled
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-60">
                    <Label>Dimension</Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="dimension"
                      placeholder="dimension"
                      errors={errors}
                    />
                  </div>
                  <div className="w-60">
                    <Label>Nombre de cages</Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="number"
                      placeholder="number of cages"
                      errors={errors}
                    />
                  </div>
                  <div className="w-60">
                    <Label>Nombre animaux par cage</Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="numberPerCage"
                      placeholder="animals per cage"
                      errors={errors}
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

export { PutInCages };
