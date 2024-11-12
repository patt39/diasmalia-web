import { CageEggHarvestingAPI } from '@/api-site/cages';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { SelectInput, TextInput } from '@/components/ui-setting/shadcn';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { eggSize } from '@/i18n/default-exports';
import { CagesModel } from '@/types/animal';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  code: yup.string().optional(),
  number: yup.number().required('number is a required field'),
  size: yup.string().required('size is a required field'),
});

const CageEggHarvestings = ({
  showModal,
  setShowModal,
  cage,
}: {
  showModal: boolean;
  setShowModal: any;
  cage?: any;
}) => {
  const { t, errors, control, hasErrors, handleSubmit, setHasErrors, locale } =
    useReactHookForm({ schema });

  // Create
  const { isPending: loading, mutateAsync: saveMutation } =
    CageEggHarvestingAPI();

  const onSubmit: SubmitHandler<CagesModel> = async (payload: CagesModel) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        cageId: cage?.id,
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
                  <Input type="text" defaultValue={`${cage?.code}`} disabled />
                </div>
                <div className="mb-2">
                  <Label>
                    {t.formatMessage({ id: 'NUMBER.EGGHARVESTED' })}
                    <span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="number"
                    name="number"
                    placeholder="number of eggs"
                    errors={errors}
                  />
                </div>
                <div className="mb-4">
                  <Label>
                    {t.formatMessage({ id: 'TABEGGHAVESTING.SIZE' })}
                    <span className="text-red-600">*</span>
                  </Label>
                  <SelectInput
                    control={control}
                    errors={errors}
                    placeholder="select size"
                    valueType="key"
                    name="size"
                    dataItem={eggSize.filter((i) => i?.lang === locale)}
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

export { CageEggHarvestings };
