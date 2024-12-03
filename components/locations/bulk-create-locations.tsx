import { CreateBulkLocationsAPI } from '@/api-site/locations';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { productionPhases } from '@/i18n/default-exports';
import { LocationModel } from '@/types/location';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { SelectInput, TextInput } from '../ui-setting/shadcn';
import { Label } from '../ui/label';

const schema = yup.object({
  manger: yup.number().required('manger required'),
  through: yup.number().required('through is required'),
  number: yup.number().required('number is required field'),
  buildingCode: yup.string().required('building code is required'),
  squareMeter: yup.number().required('squareMeter is required field'),
});

const CreateBulkLocations = ({
  showModal,
  setShowModal,
  building,
}: {
  showModal: boolean;
  setShowModal: any;
  building?: any;
}) => {
  const { t, control, errors, handleSubmit, hasErrors, setHasErrors, locale } =
    useReactHookForm({ schema });
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);

  // Create data
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateBulkLocationsAPI();

  const onSubmit: SubmitHandler<LocationModel> = async (
    payload: LocationModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        animalTypeId: animalTypeId,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Locations created successfully',
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
                <div className="flex space-x-4">
                  <div className="w-80">
                    <Label>Batiment</Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="buildingCode"
                      defaultValue={`${building?.code}`}
                      errors={errors}
                      disabled
                    />
                  </div>
                  <div className="w-80">
                    <Label>
                      Nombre
                      <span className="text-red-600">*</span>
                    </Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="number"
                      placeholder="number"
                      errors={errors}
                    />
                  </div>
                </div>
                {['POLYVALENT'].includes(building?.productionPhase) ? (
                  <div>
                    <Label>
                      {t.formatMessage({ id: 'TABFEEDING.PRODUCTIONPHASE' })}
                      <span className="text-red-600">*</span>
                    </Label>
                    <SelectInput
                      control={control}
                      errors={errors}
                      placeholder="select production phase"
                      valueType="key"
                      name="productionPhase"
                      dataItem={productionPhases.filter(
                        (i) => i?.lang === locale,
                      )}
                    />
                  </div>
                ) : null}
                <div className="my-2 items-center space-x-1">
                  <div className="items-center flex space-x-9 my-2">
                    <div>
                      <Label>
                        {t.formatMessage({ id: 'SURFACE.AREA' })}
                        <span className="text-red-600">*</span>
                      </Label>
                      <TextInput
                        control={control}
                        type="number"
                        name="squareMeter"
                        placeholder="square meters"
                        errors={errors}
                      />
                    </div>
                    <div>
                      <Label>
                        {t.formatMessage({ id: 'NUMBER.MANGERS' })}
                        <span className="text-red-600">*</span>
                      </Label>
                      <TextInput
                        control={control}
                        type="number"
                        name="manger"
                        placeholder="number of mangers"
                        errors={errors}
                      />
                    </div>
                    <div>
                      <Label>
                        {t.formatMessage({ id: 'NUMBER.THROUGHS' })}
                        <span className="text-red-600">*</span>
                      </Label>
                      <TextInput
                        control={control}
                        type="number"
                        name="through"
                        placeholder="number of throughs"
                        errors={errors}
                      />
                    </div>
                  </div>
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

export { CreateBulkLocations };
