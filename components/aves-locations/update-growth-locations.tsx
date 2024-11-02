import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { UpdateOneLoctionAPI } from '@/api-site/locations';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { avesProductionPhases } from '@/i18n/default-exports';
import { LocationModel } from '@/types/location';
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
  code: yup.string().optional(),
  productionPhase: yup.string().optional(),
  squareMeter: yup.number().optional(),
  manger: yup.number().optional(),
  through: yup.number().optional(),
  nest: yup.number().optional(),
});

const UpdateGrowthLocations = ({
  showModal,
  setShowModal,
  location,
}: {
  showModal: boolean;
  setShowModal: any;
  location?: any;
}) => {
  const {
    t,
    locale,
    watch,
    control,
    errors,
    setValue,
    handleSubmit,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);
  const watchProductionPhase = watch('productionPhase');
  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: animalTypeId,
  });

  useEffect(() => {
    if (location) {
      const fields = [
        'code',
        'nest',
        'type',
        'productionPhase',
        'squareMeter',
        'manger',
        'through',
      ];
      fields?.forEach((field: any) => setValue(field, location[field]));
    }
  }, [location, setValue]);

  // Update data
  const { isPending: loading, mutateAsync: saveMutation } =
    UpdateOneLoctionAPI();

  const onSubmit: SubmitHandler<LocationModel> = async (
    payload: LocationModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        locationId: location.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Location updated successfully',
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

                <Label>Code</Label>
                <div className="flex items-center">
                  <TextInput
                    control={control}
                    type="text"
                    name="code"
                    placeholder="Give a code"
                    errors={errors}
                  />
                </div>
                <div className="my-2">
                  <Label>
                    {t.formatMessage({ id: 'TABFEEDING.PRODUCTIONPHASE' })}
                  </Label>
                  <SelectInput
                    firstOptionName="Choose a production type"
                    control={control}
                    errors={errors}
                    placeholder="Select a production phase"
                    valueType="key"
                    name="productionPhase"
                    dataItem={avesProductionPhases.filter(
                      (i) => i?.lang === locale,
                    )}
                  />
                </div>
                <div className="my-2 items-center space-x-1">
                  <div className="items-center flex space-x-9 my-2">
                    <div className="w-60">
                      <Label>{t.formatMessage({ id: 'SURFACE.AREA' })}</Label>
                      <TextInput
                        control={control}
                        type="number"
                        name="squareMeter"
                        placeholder="Square meters"
                        errors={errors}
                      />
                    </div>
                    <div>
                      <Label>{t.formatMessage({ id: 'NUMBER.MANGERS' })}</Label>
                      <TextInput
                        control={control}
                        type="number"
                        name="manger"
                        placeholder="Number of mangers"
                        errors={errors}
                      />
                    </div>
                    <div>
                      <Label>
                        {t.formatMessage({ id: 'NUMBER.THROUGHS' })}
                      </Label>
                      <TextInput
                        control={control}
                        type="number"
                        name="through"
                        placeholder="Number of throughs"
                        errors={errors}
                      />
                    </div>
                  </div>
                  {watchProductionPhase === 'LAYING' &&
                  animalType?.name !== 'Pisciculture' ? (
                    <div>
                      <Label>{t.formatMessage({ id: 'NUMBER.NESTS' })}</Label>
                      <TextInput
                        control={control}
                        type="number"
                        name="nest"
                        placeholder="Number of nests"
                        errors={errors}
                      />
                    </div>
                  ) : (
                    ''
                  )}
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

export { UpdateGrowthLocations };
