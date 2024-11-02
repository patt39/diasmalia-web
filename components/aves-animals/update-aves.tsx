import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { UpdateOneAvesAnimalAPI } from '@/api-site/animals';
import { GetLocationsAPI } from '@/api-site/locations';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { SelectInput, TextInput } from '@/components/ui-setting/shadcn';
import { avesProductionPhases } from '@/i18n/default-exports';
import { AnimalModel } from '@/types/animal';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { DateInput, LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const schema = yup.object({
  code: yup.string().optional(),
  male: yup.number().optional(),
  weight: yup.number().optional(),
  female: yup.number().optional(),
  strain: yup.string().optional(),
  supplier: yup.string().optional(),
  birthday: yup.string().optional(),
  quantity: yup.number().optional(),
  locationCode: yup.string().optional(),
  productionPhase: yup.string().optional(),
});

const UpdateAvesAnimals = ({
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
    locale,
    watch,
    control,
    setValue,
    handleSubmit,
    errors,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);
  const watchCages = watch('addCages', '');
  const watchProductionPhase = watch('productionPhase', '');
  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: animalTypeId,
  });

  const {
    isLoading: isLoadingLocations,
    isError: isErrorLocations,
    data: dataLocations,
  } = GetLocationsAPI({
    take: 10,
    status: true,
    sort: 'desc',
    sortBy: 'createdAt',
    addCages: 'YES',
    animalTypeId: animalTypeId,
  });

  useEffect(() => {
    if (animal) {
      const fields = [
        'code',
        'male',
        'female',
        'weight',
        'strain',
        'quantity',
        'birthday',
        'supplier',
        'locationCode',
        'productionPhase',
      ];
      fields?.forEach((field: any) => setValue(field, animal[field]));
    }
  }, [animal, setValue]);

  // Update data
  const { isPending: loading, mutateAsync: saveMutation } =
    UpdateOneAvesAnimalAPI();

  const onSubmit: SubmitHandler<AnimalModel> = async (payload: AnimalModel) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        animalId: animal?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Animal saved successfully',
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
            <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
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
                  <Label>{t.formatMessage({ id: 'ANIMAL.CODE' })}</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="code"
                    placeholder="Give a code"
                    errors={errors}
                  />
                </div>
                {['Poulet de chair', 'Pisciculture', 'Pondeuses'].includes(
                  animalType?.name,
                ) ? (
                  <>
                    <div className="my-2 flex space-x-4">
                      <div className="w-96">
                        <Label>Fournisseur</Label>
                        <TextInput
                          control={control}
                          type="text"
                          name="supplier"
                          errors={errors}
                        />
                      </div>
                      <div className="w-60">
                        <Label>Souche</Label>
                        <TextInput
                          control={control}
                          type="text"
                          name="strain"
                          errors={errors}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {animal?._count?.feedings !== 0 ? (
                        <div className="my-2">
                          <Label>
                            {t.formatMessage({ id: 'NUMBER.ANIMALS' })}
                            <span className="text-red-600">*</span>
                          </Label>
                          <TextInput
                            control={control}
                            type="number"
                            name="quantity"
                            defaultValue="0"
                            placeholder="Number of animals"
                            errors={errors}
                            disabled
                          />
                        </div>
                      ) : (
                        <div className="my-2">
                          <Label>
                            {t.formatMessage({ id: 'NUMBER.ANIMALS' })}
                            <span className="text-red-600">*</span>
                          </Label>
                          <TextInput
                            control={control}
                            type="number"
                            name="quantity"
                            defaultValue="0"
                            placeholder="Number of animals"
                            errors={errors}
                          />
                        </div>
                      )}
                      <div>
                        <Label>
                          {t.formatMessage({ id: 'TABANIMAL.WEIGHT' })}(g)
                        </Label>
                        <TextInput
                          control={control}
                          type="number"
                          name="weight"
                          placeholder="Give weight"
                          errors={errors}
                        />
                      </div>
                      <div>
                        <Label>
                          {t.formatMessage({ id: 'LAUNCHING.DATE' })}
                        </Label>
                        <DateInput
                          control={control}
                          errors={errors}
                          placeholder="Starting date"
                          name="birthday"
                        />
                      </div>
                    </div>
                    {animalType?.name === 'Pondeuses' ? (
                      <div className="mb-4">
                        <Label>
                          {t.formatMessage({
                            id: 'TABFEEDING.PRODUCTIONPHASE',
                          })}
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
                    ) : (
                      ''
                    )}
                    {animalType?.name === 'Pondeuses' &&
                    watchProductionPhase === 'LAYING' ? (
                      <div className="my-2">
                        <Label>Mettre en cages?</Label>
                        <SelectInput
                          firstOptionName="Choose a production type"
                          control={control}
                          errors={errors}
                          placeholder="Add in cages?"
                          valueType="text"
                          name="addCages"
                          dataItem={[
                            { id: 1, name: 'YES' },
                            { id: 2, name: 'NO' },
                          ]}
                        />
                      </div>
                    ) : (
                      ''
                    )}
                    {animalType?.name === 'Pondeuses' &&
                    watchProductionPhase === 'LAYING' &&
                    watchCages === 'YES' ? (
                      <div className="w-full">
                        <Label>
                          {t.formatMessage({ id: 'LOCATION.CODE' })}
                        </Label>
                        <Controller
                          control={control}
                          name="locationCode"
                          render={({ field: { value, onChange } }) => (
                            <Select
                              onValueChange={onChange}
                              name={'locationCode'}
                              value={value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a location code" />
                              </SelectTrigger>
                              <SelectContent className="dark:border-gray-800">
                                <SelectGroup>
                                  <SelectLabel>Location codes</SelectLabel>
                                  {isLoadingLocations ? (
                                    <LoadingFile />
                                  ) : isErrorLocations ? (
                                    <ErrorFile
                                      title="404"
                                      description="Error finding data please try again..."
                                    />
                                  ) : Number(
                                      dataLocations?.pages[0]?.data?.total,
                                    ) <= 0 ? (
                                    <ErrorFile description="Don't have location codes" />
                                  ) : (
                                    dataLocations?.pages
                                      .flatMap((page: any) => page?.data?.value)
                                      .map((item, index) => (
                                        <>
                                          <SelectItem
                                            key={index}
                                            value={item?.code}
                                          >
                                            {item?.code}
                                          </SelectItem>
                                        </>
                                      ))
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    ) : (
                      ''
                    )}
                  </>
                ) : (
                  <>
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
                    <div className="my-2 flex items-center space-x-16">
                      {animal?._count?.feedings !== 0 ? (
                        <>
                          <div>
                            <Label>
                              {t.formatMessage({ id: 'ANIMAL.MALES' })}
                            </Label>
                            <TextInput
                              control={control}
                              type="number"
                              name="male"
                              placeholder="Number of males"
                              errors={errors}
                              disabled
                            />
                          </div>
                          <div>
                            <Label>
                              {t.formatMessage({ id: 'ANIMAL.FEMALES' })}
                            </Label>
                            <TextInput
                              control={control}
                              type="number"
                              name="female"
                              placeholder="Number of females"
                              errors={errors}
                              disabled
                            />
                          </div>
                          <div>
                            <Label>
                              {t.formatMessage({ id: 'TABANIMAL.WEIGHT' })}(g)
                            </Label>
                            <TextInput
                              control={control}
                              type="number"
                              name="weight"
                              placeholder="Give weight"
                              errors={errors}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <Label>
                              {t.formatMessage({ id: 'ANIMAL.MALES' })}
                            </Label>
                            <TextInput
                              control={control}
                              type="number"
                              name="male"
                              placeholder="Number of males"
                              errors={errors}
                            />
                          </div>
                          <div>
                            <Label>
                              {t.formatMessage({ id: 'ANIMAL.FEMALES' })}
                            </Label>
                            <TextInput
                              control={control}
                              type="number"
                              name="female"
                              placeholder="Number of females"
                              errors={errors}
                            />
                          </div>
                          <div>
                            <Label>
                              {t.formatMessage({ id: 'TABANIMAL.WEIGHT' })}(g)
                            </Label>
                            <TextInput
                              control={control}
                              type="number"
                              name="weight"
                              placeholder="Give weight"
                              errors={errors}
                            />
                          </div>
                        </>
                      )}
                    </div>
                    {!['Poulet de chair', 'Pisciculture', 'Pondeuses'].includes(
                      animalType?.name,
                    ) ? (
                      <div className="my-2">
                        <Label>
                          {t.formatMessage({ id: 'LAUNCHING.DATE' })}
                        </Label>
                        <DateInput
                          control={control}
                          errors={errors}
                          placeholder="Starting date"
                          name="birthday"
                        />
                      </div>
                    ) : (
                      ''
                    )}
                  </>
                )}
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

export { UpdateAvesAnimals };
