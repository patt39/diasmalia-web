import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { CreateOneAvesAnimalAPI } from '@/api-site/animals';
import { GetLocationsAPI } from '@/api-site/locations';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { SelectInput, TextInput } from '@/components/ui-setting/shadcn';
import { AnimalModel } from '@/types/animal';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { FileQuestion, XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const schema = yup.object({
  code: yup.string().optional(),
  male: yup.number().optional(),
  female: yup.number().optional(),
  addCages: yup.string().optional(),
  strain: yup.string().optional(),
  supplier: yup.string().optional(),
  quantity: yup.number().optional(),
  productionPhase: yup.string().required('productionPhase is required'),
  birthday: yup.string().required('birthday is a required field'),
  weight: yup.number().required('weight is a required field'),
  locationCode: yup.string().required('location code is a required field'),
});

const CreateAvesAnimals = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
  animal?: any;
}) => {
  const { t, watch, control, handleSubmit, errors, hasErrors, setHasErrors } =
    useReactHookForm({ schema });
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);
  const watchCages = watch('addCages', '');
  const watchProductionPhase = watch('productionPhase', '');

  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: animalTypeId,
  });

  // Create
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOneAvesAnimalAPI();

  const onSubmit: SubmitHandler<AnimalModel> = async (payload: AnimalModel) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        animalTypeId: animalTypeId,
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

  const {
    isLoading: isLoadingLocationsCages,
    isError: isErrorLocationsCages,
    data: dataLocationsCages,
  } = GetLocationsAPI({
    take: 10,
    sort: 'desc',
    status: true,
    addCages: 'YES',
    sortBy: 'createdAt',
    animalTypeId: animalTypeId,
  });

  const {
    isLoading: isLoadingLocations,
    isError: isErrorLocations,
    data: dataLocations,
  } = GetLocationsAPI({
    take: 10,
    sort: 'desc',
    status: true,
    addCages: 'NO',
    sortBy: 'createdAt',
    productionPhase: 'LAYING',
    animalTypeId: animalTypeId,
  });

  const {
    isLoading: isLoadingLocationsGrowth,
    isError: isErrorLocationsGrowth,
    data: dataLocationsGrowth,
  } = GetLocationsAPI({
    take: 10,
    sort: 'desc',
    status: true,
    addCages: 'NO',
    sortBy: 'createdAt',
    productionPhase: 'GROWTH',
    animalTypeId: animalTypeId,
  });

  const {
    isLoading: isLoadingLocationsLaying,
    isError: isErrorLocationsLaying,
    data: dataLocationsLaying,
  } = GetLocationsAPI({
    take: 10,
    sort: 'desc',
    status: true,
    addCages: 'NO',
    sortBy: 'createdAt',
    productionPhase: 'LAYING',
    animalTypeId: animalTypeId,
  });

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
                        <p>{t.formatMessage({ id: 'CODE.AVES.TOOLTIP' })}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {['Poulet de chair', 'Pisciculture'].includes(
                  animalType?.name,
                ) ? (
                  <>
                    <div className="my-2">
                      <Label>
                        {t.formatMessage({ id: 'TABFEEDING.PRODUCTIONPHASE' })}
                        <span className="text-red-600">*</span>
                      </Label>
                      <SelectInput
                        firstOptionName="Choose a production type"
                        control={control}
                        errors={errors}
                        placeholder="Select a production phase"
                        valueType="text"
                        name="productionPhase"
                        dataItem={[
                          { id: 1, name: 'GROWTH' },
                          { id: 2, name: 'LAYING' },
                        ]}
                      />
                    </div>
                    <div className="my-2 flex space-x-4">
                      <div className="w-96">
                        <Label>Fournisseur</Label>
                        <TextInput
                          control={control}
                          type="text"
                          name="supplier"
                          placeholder="Supplier"
                          errors={errors}
                        />
                      </div>
                      <div className="w-60">
                        <Label>Souche</Label>
                        <TextInput
                          control={control}
                          type="text"
                          name="strain"
                          placeholder="Strain"
                          errors={errors}
                        />
                      </div>
                    </div>
                    {watchProductionPhase === 'GROWTH' ? (
                      <>
                        <div className="flex items-center space-x-4">
                          <div className="my-2">
                            <Label>
                              {t.formatMessage({ id: 'NUMBER.ANIMALS' })}
                              <span className="text-red-600">*</span>
                            </Label>
                            <TextInput
                              control={control}
                              type="number"
                              name="quantity"
                              placeholder="Number of animals"
                              errors={errors}
                            />
                          </div>
                          <div>
                            <Label>
                              {t.formatMessage({ id: 'TABANIMAL.WEIGHT' })}
                              (g)<span className="text-red-600">*</span>
                            </Label>
                            <TextInput
                              control={control}
                              type="number"
                              name="weight"
                              placeholder="Give weight"
                              errors={errors}
                            />
                          </div>
                          <div className="">
                            <Label>
                              {t.formatMessage({ id: 'LAUNCHING.DATE' })}
                              <span className="text-red-600">*</span>
                            </Label>
                            <DateInput
                              control={control}
                              errors={errors}
                              placeholder="Starting date"
                              name="birthday"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {animalType?.name === 'Poulets de chair' ? (
                          <div className="my-2 flex space-x-4">
                            <div className="w-96">
                              <Label>Fournisseur</Label>
                              <TextInput
                                control={control}
                                type="text"
                                name="quantity"
                                placeholder="Supplier"
                                errors={errors}
                              />
                            </div>
                            <div className="w-60">
                              <Label>Souche</Label>
                              <TextInput
                                control={control}
                                type="text"
                                name="quantity"
                                placeholder="Strain"
                                errors={errors}
                              />
                            </div>
                          </div>
                        ) : (
                          ''
                        )}
                        <div className="my-2 flex items-center space-x-4">
                          <div className="w-60">
                            <Label>
                              {t.formatMessage({ id: 'ANIMAL.MALES' })}
                              <span className="text-red-600">*</span>
                            </Label>
                            <TextInput
                              control={control}
                              type="number"
                              name="male"
                              placeholder="Number of males"
                              errors={errors}
                            />
                          </div>
                          <div className="w-60">
                            <Label>
                              {t.formatMessage({ id: 'ANIMAL.FEMALES' })}
                              <span className="text-red-600">*</span>
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
                              <span className="text-red-600">*</span>
                            </Label>
                            <TextInput
                              control={control}
                              type="number"
                              name="weight"
                              placeholder="Give weight"
                              errors={errors}
                            />
                          </div>
                        </div>
                        <div className="my-2">
                          <Label>
                            {t.formatMessage({ id: 'LAUNCHING.DATE' })}
                            <span className="text-red-600">*</span>
                          </Label>
                          <DateInput
                            control={control}
                            errors={errors}
                            placeholder="Starting date"
                            name="birthday"
                          />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {['Pondeuses', 'Poulets de chair'].includes(
                      animalType?.name,
                    ) ? (
                      <div className="my-2 flex space-x-4">
                        <div className="w-96">
                          <Label>Fournisseur</Label>
                          <TextInput
                            control={control}
                            type="text"
                            name="supplier"
                            placeholder="Supplier"
                            errors={errors}
                          />
                        </div>
                        <div className="w-60">
                          <Label>Souche</Label>
                          <TextInput
                            control={control}
                            type="text"
                            name="strain"
                            placeholder="Strain"
                            errors={errors}
                          />
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className="my-2">
                      <Label>
                        {t.formatMessage({ id: 'TABFEEDING.PRODUCTIONPHASE' })}
                      </Label>
                      <SelectInput
                        firstOptionName="Choose a production type"
                        control={control}
                        errors={errors}
                        placeholder="Select a production phase"
                        valueType="text"
                        name="productionPhase"
                        dataItem={[
                          { id: 1, name: 'GROWTH' },
                          { id: 2, name: 'LAYING' },
                        ]}
                      />
                    </div>
                    {animalType?.name === 'Pondeuses' &&
                    watchProductionPhase === 'LAYING' ? (
                      <div className="my-2">
                        <Label>
                          Mettre en cages?
                          <span className="text-red-600">*</span>
                        </Label>
                        <SelectInput
                          firstOptionName="Choose a production type"
                          control={control}
                          errors={errors}
                          placeholder="Put in cages ?"
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
                    <div className="my-2 flex items-center space-x-10">
                      {animalType?.name !== 'Pondeuses' ? (
                        <>
                          <div>
                            <Label>
                              {t.formatMessage({ id: 'ANIMAL.MALES' })}
                              <span className="text-red-600">*</span>
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
                              <span className="text-red-600">*</span>
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
                              <span className="text-red-600">*</span>
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
                        <div className="my-2 flex space-x-4">
                          <div>
                            <Label>
                              {t.formatMessage({ id: 'NUMBER.ANIMALS' })}
                              <span className="text-red-600">*</span>
                            </Label>
                            <TextInput
                              control={control}
                              type="number"
                              name="quantity"
                              placeholder="Number of animals"
                              errors={errors}
                            />
                          </div>
                          <div>
                            <Label>
                              {t.formatMessage({ id: 'TABANIMAL.WEIGHT' })}
                              (g)<span className="text-red-600">*</span>
                            </Label>
                            <TextInput
                              control={control}
                              type="number"
                              name="weight"
                              placeholder="Give weight"
                              errors={errors}
                            />
                          </div>
                          <div className="">
                            <Label>
                              {t.formatMessage({ id: 'LAUNCHING.DATE' })}
                              <span className="text-red-600">*</span>
                            </Label>
                            <DateInput
                              control={control}
                              errors={errors}
                              placeholder="Starting date"
                              name="birthday"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
                {animalType?.name === 'Pondeuses' &&
                watchProductionPhase === 'LAYING' &&
                watchCages === 'YES' ? (
                  <div className="w-full">
                    <Label>
                      {t.formatMessage({ id: 'LOCATION.CODE' })}
                      <span className="text-red-600">*</span>
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
                              {isLoadingLocationsCages ? (
                                <LoadingFile />
                              ) : isErrorLocationsCages ? (
                                <ErrorFile
                                  title="404"
                                  description="Error finding data please try again..."
                                />
                              ) : Number(
                                  dataLocationsCages?.pages[0]?.data?.total,
                                ) <= 0 ? (
                                <ErrorFile description="Don't have location codes" />
                              ) : (
                                dataLocationsCages?.pages
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
                ) : watchProductionPhase === 'LAYING' && watchCages === 'NO' ? (
                  <div className="w-full">
                    <Label>
                      {t.formatMessage({ id: 'LOCATION.CODE' })}
                      <span className="text-red-600">*</span>
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
                ) : watchProductionPhase === 'GROWTH' && watchCages === 'NO' ? (
                  <div className="w-full">
                    <Label>
                      {t.formatMessage({ id: 'LOCATION.CODE' })}
                      <span className="text-red-600">*</span>
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
                              {isLoadingLocationsGrowth ? (
                                <LoadingFile />
                              ) : isErrorLocationsGrowth ? (
                                <ErrorFile
                                  title="404"
                                  description="Error finding data please try again..."
                                />
                              ) : Number(
                                  dataLocationsGrowth?.pages[0]?.data?.total,
                                ) <= 0 ? (
                                <ErrorFile description="Don't have location codes" />
                              ) : (
                                dataLocationsGrowth?.pages
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
                {!['Poulet de chair', 'Pisciculture', 'Pondeuses'].includes(
                  animalType?.name,
                ) ? (
                  <div className="my-2">
                    <Label>
                      {t.formatMessage({ id: 'LAUNCHING.DATE' })}
                      <span className="text-red-600">*</span>
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
                {watchProductionPhase === 'GROWTH' &&
                animalType?.name !== 'Pondeuses' ? (
                  <div className="w-full">
                    <Label>
                      {t.formatMessage({ id: 'LOCATION.CODE' })}
                      <span className="text-red-600">*</span>
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
                              {isLoadingLocationsGrowth ? (
                                <LoadingFile />
                              ) : isErrorLocationsGrowth ? (
                                <ErrorFile
                                  title="404"
                                  description="Error finding data please try again..."
                                />
                              ) : Number(
                                  dataLocationsGrowth?.pages[0]?.data?.total <=
                                    0,
                                ) ? (
                                <ErrorFile description="Don't have location codes" />
                              ) : (
                                dataLocationsGrowth?.pages
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
                ) : watchProductionPhase === 'LAYING' &&
                  animalType?.name !== 'Pondeuses' ? (
                  <div className="w-full">
                    <Label>
                      {t.formatMessage({ id: 'LOCATION.CODE' })}
                      <span className="text-red-600">*</span>
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
                              {isLoadingLocationsLaying ? (
                                <LoadingFile />
                              ) : isErrorLocationsLaying ? (
                                <ErrorFile
                                  title="404"
                                  description="Error finding data please try again..."
                                />
                              ) : Number(
                                  dataLocationsLaying?.pages[0]?.data?.total,
                                ) <= 0 ? (
                                <ErrorFile description="Don't have location codes" />
                              ) : (
                                dataLocationsLaying?.pages
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

export { CreateAvesAnimals };
