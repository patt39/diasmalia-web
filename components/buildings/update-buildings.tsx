import { UpdateOneBuildingAPI } from '@/api-site/buildings';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { buildingProductionPhases } from '@/i18n/default-exports';
import { BuildingModel } from '@/types/location';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { SelectInput, TextInput } from '../ui-setting/shadcn';
import { Label } from '../ui/label';

const schema = yup.object({
  code: yup.string().required('code is required'),
  productionPhase: yup.string().required('productionPhase is required field'),
  squareMeter: yup.number().required('squareMeter is required field'),
});

const UpdateBuilding = ({
  showModal,
  setShowModal,
  building,
}: {
  showModal: boolean;
  setShowModal: any;
  building?: any;
}) => {
  const {
    t,
    locale,
    control,
    errors,
    handleSubmit,
    hasErrors,
    setHasErrors,
    setValue,
  } = useReactHookForm({ schema });
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);

  useEffect(() => {
    if (building) {
      const fields = ['code', 'productionPhase', 'squareMeter'];
      fields?.forEach((field: any) => setValue(field, building[field]));
    }
  }, [building, setValue]);

  // Create
  const { isPending: loading, mutateAsync: saveMutation } =
    UpdateOneBuildingAPI();

  const onSubmit: SubmitHandler<BuildingModel> = async (
    payload: BuildingModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        buildingId: building?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Building updated successfully',
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
                <div className="items-center">
                  <Label>
                    Code<span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="code"
                    errors={errors}
                  />
                </div>
                <div className="mt-2 items-center">
                  <Label>
                    {t.formatMessage({ id: 'SURFACE.AREA' })}
                    <span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="number"
                    name="squareMeter"
                    errors={errors}
                  />
                </div>
                <div className="my-2">
                  <Label>
                    {t.formatMessage({ id: 'TABFEEDING.PRODUCTIONPHASE' })}
                    <span className="text-red-600">*</span>
                  </Label>
                  <SelectInput
                    control={control}
                    errors={errors}
                    valueType="key"
                    name="productionPhase"
                    dataItem={buildingProductionPhases.filter(
                      (i) => i?.lang === locale,
                    )}
                  />
                </div>
                <div className="mt-4 flex items-center space-x-3">
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

export { UpdateBuilding };
