import { CreateOrUpdateOneEggHarvestingAPI } from '@/api-site/eggharvesting';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { EggHarvestingsModel } from '@/types/egg-harvesting';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { SelectInput, TextInput } from '../ui-setting/shadcn';
import { Label } from '../ui/label';

const schema = yup.object({
  code: yup.string().optional(),
  quantity: yup.number().required('quantity is a required field'),
  size: yup.string().required('size is a required field'),
});

const CreateOrUpdateEggHarvestings = ({
  showModal,
  setShowModal,
  eggHarvesting,
  animal,
}: {
  showModal: boolean;
  setShowModal: any;
  eggHarvesting?: any;
  animal?: any;
}) => {
  const {
    t,
    errors,
    control,
    setValue,
    hasErrors,
    handleSubmit,
    setHasErrors,
  } = useReactHookForm({ schema });

  useEffect(() => {
    if (eggHarvesting) {
      const fields = ['size', 'quantity'];
      fields?.forEach((field: any) => setValue(field, eggHarvesting[field]));
    }
  }, [eggHarvesting, setValue]);

  useEffect(() => {
    if (animal) {
      const fields = ['code'];
      fields?.forEach((field: any) => setValue(field, animal[field]));
    }
  }, [animal, setValue]);

  // Create or Update data
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOrUpdateOneEggHarvestingAPI();

  const onSubmit: SubmitHandler<EggHarvestingsModel> = async (
    payload: EggHarvestingsModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        eggHarvestingId: eggHarvesting?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'EggHarvesting saved successfully',
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

                <div className="items-center my-2">
                  <Label>{t.formatMessage({ id: 'ANIMAL.CODE' })}</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="code"
                    defaultValue={`${eggHarvesting?.animal?.code}`}
                    placeholder="Give a code"
                    errors={errors}
                  />
                </div>
                <div className="mb-2">
                  <Label>
                    {t.formatMessage({ id: 'NUMBER.EGGHARVESTED' })}
                    <span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="number"
                    name="quantity"
                    placeholder="Give a quantity"
                    errors={errors}
                  />
                </div>
                <div className="mb-4">
                  <Label>
                    {t.formatMessage({ id: 'TABEGGHAVESTING.SIZE' })}
                    <span className="text-red-600">*</span>
                  </Label>
                  <SelectInput
                    firstOptionName="Choose a size"
                    control={control}
                    errors={errors}
                    placeholder="Select a size"
                    valueType="text"
                    name="size"
                    dataItem={[
                      { id: 1, name: 'SMALL' },
                      { id: 1, name: 'MEDIUM' },
                      { id: 1, name: 'BIG' },
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

export { CreateOrUpdateEggHarvestings };
