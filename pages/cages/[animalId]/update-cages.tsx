import { UpdateOneCageAPI } from '@/api-site/cages';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { TextInput } from '@/components/ui-setting/shadcn';
import { Label } from '@/components/ui/label';
import { CagesModel } from '@/types/animal';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  code: yup.string().optional(),
  number: yup.number().optional(),
  dimension: yup.number().optional(),
  numberPerCage: yup.number().optional(),
  eggHarvested: yup.number().optional(),
  dead: yup.number().optional(),
});

const UpdateCages = ({
  showModal,
  setShowModal,
  cage,
}: {
  showModal: boolean;
  setShowModal: any;
  cage?: any;
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
    if (cage) {
      const fields = [
        'code',
        'dimension',
        'numberPerCage',
        'eggHarvested',
        'dead',
      ];
      fields?.forEach((field: any) => setValue(field, cage[field]));
    }
  }, [cage, setValue]);

  // Create
  const { isPending: loading, mutateAsync: saveMutation } = UpdateOneCageAPI();

  const onSubmit: SubmitHandler<CagesModel> = async (payload: CagesModel) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        cageId: cage?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Cages updated successfully',
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
                    name="bande code"
                    errors={errors}
                  />
                </div>
                <div className="flex items-center space-x-4 mb-2">
                  <div className="w-80">
                    <Label>Dimension</Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="dimension"
                      placeholder="dimension"
                      errors={errors}
                    />
                  </div>
                  <div className="w-80">
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
                {cage?.eggHarvested !== 0 ? (
                  <div className="w-full">
                    <Label>Oeufs ramassés</Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="eggHarvested"
                      placeholder="dimension"
                      errors={errors}
                    />
                  </div>
                ) : null}
                {cage?.death !== 0 ? (
                  <div className="w-full">
                    <Label>Nombre de mort</Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="death"
                      placeholder="deads"
                      errors={errors}
                    />
                  </div>
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

export { UpdateCages };
