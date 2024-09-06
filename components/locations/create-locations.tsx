import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { CreateOneLocationAPI } from '@/api-site/locations';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { LocationModel } from '@/types/location';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { FileQuestion, XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { SelectInput, TextInput } from '../ui-setting/shadcn';
import { Label } from '../ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const schema = yup.object({
  code: yup.string().optional(),
  manger: yup.number().optional(),
  through: yup.number().optional(),
  productionPhase: yup.string().optional(),
  squareMeter: yup.number().required('squareMeter is required field'),
});

const CreateLocations = ({
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
    control,
    errors,
    setValue,
    handleSubmit,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);
  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: animalTypeId,
  });

  useEffect(() => {
    if (location) {
      const fields = [
        'code',
        'productionPhase',
        'squareMeter',
        'manger',
        'through',
      ];
      fields?.forEach((field: any) => setValue(field, location[field]));
    }
  }, [location, setValue]);

  // Create data
  const { mutateAsync: saveMutation } = CreateOneLocationAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<LocationModel> = async (
    payload: LocationModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        animalTypeId: animalTypeId,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Location created successfully',
      });
      setShowModal(false);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
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

                <div className="flex items-center">
                  <TextInput
                    control={control}
                    type="text"
                    name="code"
                    placeholder="Give a code"
                    errors={errors}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <FileQuestion />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {t.formatMessage({ id: 'CODE.LOCATION.TOOLTIP' })}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {[
                  'Poulet de chair',
                  'Poulets Goliaths',
                  'Pintard',
                  'Canard',
                  'Dinde',
                  'Quails',
                  'Pondeuses',
                  'Pisciculture',
                  'Poulets Brahma',
                ].includes(animalType?.name) ? (
                  ''
                ) : (
                  <div className="my-2">
                    <Label>Phase de production: </Label>
                    <SelectInput
                      firstOptionName="Choose a production type"
                      control={control}
                      errors={errors}
                      placeholder="Select a production phase"
                      valueType="text"
                      name="productionPhase"
                      dataItem={[
                        { id: 1, name: 'GROWTH' },
                        { id: 2, name: 'FATTENING' },
                        { id: 3, name: 'GESTATION' },
                      ]}
                    />
                  </div>
                )}

                <div className="my-2 flex items-center space-x-1">
                  {animalType?.name === 'Pisciculture' ? (
                    <>
                      <Label>
                        Volume:<span className="text-red-600">*</span>
                      </Label>
                      <TextInput
                        control={control}
                        type="number"
                        name="squareMeter"
                        placeholder="Square meters"
                        errors={errors}
                      />
                    </>
                  ) : (
                    <>
                      <div className="mr-10">
                        <Label>
                          Superficie:<span className="text-red-600">*</span>
                        </Label>
                        <TextInput
                          control={control}
                          type="number"
                          name="squareMeter"
                          placeholder="Square meters"
                          errors={errors}
                        />
                      </div>
                      <div className="pr-10">
                        <Label>
                          Nombre de mangeoirs:
                          <span className="text-red-600">*</span>
                        </Label>
                        <TextInput
                          control={control}
                          type="number"
                          name="manger"
                          placeholder="Number of mangers"
                          errors={errors}
                        />
                      </div>
                      <div className="ml-4">
                        <Label>
                          Nombre abreuvoirs:
                          <span className="text-red-600">*</span>
                        </Label>
                        <TextInput
                          control={control}
                          type="number"
                          name="through"
                          placeholder="Number of throughs"
                          errors={errors}
                        />
                      </div>
                    </>
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

export { CreateLocations };
