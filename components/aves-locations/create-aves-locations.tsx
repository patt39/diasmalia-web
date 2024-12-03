import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { CreateOneLocationAPI } from '@/api-site/locations';
import { useInputState, useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { avesProductionPhases, fishLocationType } from '@/i18n/default-exports';
import { LocationModel } from '@/types/location';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { generateNumber } from '@/utils/generate-random';
import { FileQuestion, XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
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
  nest: yup.number().optional(),
  cages: yup.number().optional(),
  addCages: yup.string().optional(),
  manger: yup.number().optional(),
  through: yup.number().optional(),
  productionPhase: yup.string().required('productionPhase is required field'),
  squareMeter: yup.number().required('squareMeter is required field'),
});

const CreateAvesLocations = ({
  showModal,
  setShowModal,
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
    handleSubmit,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);
  const watchProductionPhase = watch('productionPhase');
  const watchCages = watch('addCages');
  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: animalTypeId,
  });
  const { userStorage } = useInputState();

  const orgInitials = userStorage?.organization?.name
    .substring(0, 1)
    .toUpperCase();

  const [codeGenerated, setGenerateCode] = useState<string>('');

  // Create data
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOneLocationAPI();

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
        text: 'Location created successfully',
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
                <Label>
                  Code
                  <span className="text-red-600">*</span>
                </Label>
                <div className="flex space-x-2 items-center">
                  <div className="w-full">
                    {codeGenerated ? (
                      <TextInput
                        control={control}
                        type="text"
                        name="code"
                        defaultValue={codeGenerated}
                        errors={errors}
                      />
                    ) : null}
                    {!codeGenerated ? (
                      <TextInput
                        control={control}
                        type="text"
                        name="code"
                        placeholder="code"
                        errors={errors}
                      />
                    ) : null}
                  </div>
                  <div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <h2
                            className="cursor-pointer"
                            onClick={() =>
                              setGenerateCode(
                                `${orgInitials}${generateNumber(3)}`,
                              )
                            }
                          >
                            <FileQuestion />
                          </h2>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to generate code</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div className="my-2">
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
                    dataItem={avesProductionPhases.filter(
                      (i) => i?.lang === locale,
                    )}
                  />
                </div>
                {!['Canard', 'Pisciculture'].includes(animalType?.name) ? (
                  <div className="my-2">
                    <Label>Ajouter des cages?</Label>
                    <SelectInput
                      control={control}
                      errors={errors}
                      placeholder="Add cages?"
                      valueType="text"
                      name="addCages"
                      dataItem={[
                        { id: 1, name: 'YES' },
                        { id: 2, name: 'NO' },
                      ]}
                    />
                  </div>
                ) : animalType?.name === 'Pisciculture' ? (
                  <div className="my-2">
                    <Label>Type</Label>
                    <span className="text-red-600">*</span>
                    <SelectInput
                      control={control}
                      errors={errors}
                      placeholder="type?"
                      valueType="key"
                      name="addCages"
                      dataItem={fishLocationType.filter(
                        (i) => i?.lang === locale,
                      )}
                    />
                  </div>
                ) : null}
                <div className="my-2 items-center">
                  {animalType?.name === 'Pisciculture' ? (
                    <>
                      <Label>
                        Volume<span className="text-red-600">*</span>
                      </Label>
                      <TextInput
                        control={control}
                        type="number"
                        name="squareMeter"
                        placeholder="meters cube"
                        errors={errors}
                      />
                    </>
                  ) : (
                    <>
                      <div className="items-center flex space-x-4 my-2">
                        <div className="w-60">
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
                      {watchProductionPhase === 'LAYING' &&
                      animalType?.name == 'Canard' ? (
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'NUMBER.NESTS' })}
                            <span className="text-red-600">*</span>
                          </Label>
                          <TextInput
                            control={control}
                            type="number"
                            name="nest"
                            placeholder="number of nests"
                            errors={errors}
                          />
                        </div>
                      ) : null}
                      {watchProductionPhase === 'LAYING' &&
                      animalType?.name !== 'Pisciculture' &&
                      watchCages === 'NO' ? (
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'NUMBER.NESTS' })}
                            <span className="text-red-600">*</span>
                          </Label>
                          <TextInput
                            control={control}
                            type="number"
                            name="nest"
                            placeholder="number of nests"
                            errors={errors}
                          />
                        </div>
                      ) : watchCages === 'YES' ? (
                        <div>
                          <Label>
                            Nombre de cages
                            <span className="text-red-600">*</span>
                          </Label>
                          <TextInput
                            control={control}
                            type="number"
                            name="cages"
                            placeholder="number of cages"
                            errors={errors}
                          />
                        </div>
                      ) : null}
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

export { CreateAvesLocations };
