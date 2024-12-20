import { CreateOrUpdateOneFarrowingAPI } from '@/api-site/farrowings';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { FarrowingsModel } from '@/types/farrowing';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { TextAreaInput, TextInput } from '../ui-setting/shadcn';
import { Label } from '../ui/label';

const schema = yup.object({
  dead: yup.number().optional(),
  code: yup.string().optional(),
  codeFemale: yup.string().optional(),
  litter: yup.number().optional(),
  weight: yup.number().optional(),
  note: yup.string().optional(),
});

const UpdateFarrowings = ({
  showModal,
  setShowModal,
  farrowing,
}: {
  showModal: boolean;
  setShowModal: any;
  farrowing?: any;
}) => {
  const {
    t,
    control,
    setValue,
    handleSubmit,
    errors,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  useEffect(() => {
    if (farrowing) {
      const fields = ['dead', 'litter', 'note', 'weight'];
      fields?.forEach((field: any) => setValue(field, farrowing[field]));
    }
  }, [farrowing, setValue]);

  // Update data
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOrUpdateOneFarrowingAPI();

  const onSubmit: SubmitHandler<FarrowingsModel> = async (
    payload: FarrowingsModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        farrowingId: farrowing?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Farrowing updated successfully',
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

                <div className="my-2 flex items-center space-x-10">
                  <div>
                    <Label>
                      {t.formatMessage({ id: 'TABFARROWING.LITTER' })}
                      <span className="text-red-600">*</span>
                    </Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="litter"
                      placeholder="litter"
                      errors={errors}
                    />
                  </div>
                  <div>
                    <Label>
                      {t.formatMessage({ id: 'ANIMALTYPE.DEATHS' })}
                    </Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="dead"
                      defaultValue="0"
                      placeholder="number of deads"
                      errors={errors}
                    />
                  </div>
                  <div>
                    <Label>
                      {t.formatMessage({ id: 'VIEW.WEIGHT' })}(g)
                      <span className="text-red-600">*</span>
                    </Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="weight"
                      placeholder="unit weight"
                      errors={errors}
                    />
                  </div>
                </div>
                <Label>Observation </Label>
                <div className="mb-4">
                  <TextAreaInput
                    control={control}
                    name="note"
                    placeholder="details about farrowing"
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

export { UpdateFarrowings };
