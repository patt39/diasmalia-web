import { CreateBulkAnimalsAPI, GetAnimalsAPI } from '@/api-site/animals';
import { GetBreedsAPI } from '@/api-site/breed';
import { useInputState, useReactHookForm } from '@/components/hooks';
import {
  ButtonInput,
  ButtonLoadMore,
  SearchInput,
} from '@/components/ui-setting';
import { SelectInput, TextInput } from '@/components/ui-setting/shadcn';
import {
  productionPhases,
  reproductionProductionPhases,
} from '@/i18n/default-exports';
import { AnimalModel } from '@/types/animal';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
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
  birthday: yup.string().optional(),
  codeMother: yup.string().optional(),
  codeFather: yup.string().optional(),
  number: yup.number().required('number is a required field'),
  weight: yup.number().required('weight is a required field'),
  gender: yup.string().required('gender is a required field'),
  breedName: yup.string().required('breed name is a required field'),
  locationCode: yup.string().required('location code is a required field'),
  productionPhase: yup.string().required('productionPhase is a required field'),
});

const CreateBulkAnimals = ({
  showModal,
  setShowModal,
  weaning,
  location,
  farrowing,
}: {
  showModal: boolean;
  setShowModal: any;
  location?: any;
  weaning?: any;
  farrowing?: any;
}) => {
  const { t, locale, control, handleSubmit, errors, hasErrors, setHasErrors } =
    useReactHookForm({ schema });
  const { ref, inView } = useInView();
  const { search, handleSetSearch } = useInputState();

  // Create
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateBulkAnimalsAPI();

  const onSubmit: SubmitHandler<AnimalModel> = async (payload: AnimalModel) => {
    try {
      await saveMutation({
        ...payload,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Animals created successfully',
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
    isLoading: isLoadingBreeds,
    isError: isErrorBreeds,
    data: dataBreeds,
  } = GetBreedsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    animalTypeId: location?.animalTypeId,
  });

  const {
    isLoading: isLoadingFemales,
    isError: isErrorFemales,
    data: dataFemales,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetAnimalsAPI({
    search,
    take: 10,
    sort: 'desc',
    gender: 'FEMALE',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    productionPhase: 'REPRODUCTION',
    animalTypeId: location?.animalTypeId,
  });

  const {
    isLoading: isLoadingMales,
    isError: isErrorMales,
    data: dataMales,
  } = GetAnimalsAPI({
    search,
    take: 10,
    sort: 'desc',
    gender: 'MALE',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    productionPhase: 'REPRODUCTION',
    animalTypeId: location?.animalTypeId,
  });

  useEffect(() => {
    let fetching = false;
    if (inView) {
      fetchNextPage();
    }
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

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
                <div className="my-2 flex items-center">
                  <div className="items-center">
                    <Label>
                      <Label>Nombre</Label>
                      <span className="text-red-600">*</span>
                    </Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="number"
                      placeholder="number"
                      errors={errors}
                    />
                  </div>
                  <div className="px-4">
                    <Label>
                      <Label>{t.formatMessage({ id: 'VIEW.BIRTHDATE' })}</Label>
                      <span className="text-red-600">*</span>
                    </Label>
                    <DateInput
                      control={control}
                      errors={errors}
                      placeholder="Birth date"
                      name="birthday"
                    />
                  </div>
                  {farrowing?.id ? (
                    <div>
                      <Label>
                        <Label>{t.formatMessage({ id: 'VIEW.WEIGHT' })}</Label>
                        <span className="text-red-600">*</span> (g)
                      </Label>
                      <TextInput
                        control={control}
                        type="number"
                        name="weight"
                        placeholder="weight"
                        defaultValue={`${farrowing?.weight}`}
                        errors={errors}
                      />
                    </div>
                  ) : (
                    <div>
                      <Label>
                        <Label>{t.formatMessage({ id: 'VIEW.WEIGHT' })}</Label>
                        <span className="text-red-600">*</span> (g)
                      </Label>
                      <TextInput
                        control={control}
                        type="number"
                        name="weight"
                        placeholder="weight"
                        errors={errors}
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-56">
                    <Label>
                      {t.formatMessage({ id: 'ANIMALTYPE.GENDER' })}
                      <span className="text-red-600">*</span>
                    </Label>
                    <SelectInput
                      control={control}
                      errors={errors}
                      valueType="text"
                      name="gender"
                      placeholder="select gender"
                      dataItem={[
                        { id: 1, name: 'MALE' },
                        { id: 2, name: 'FEMALE' },
                      ]}
                    />
                  </div>
                  {farrowing?.id ? (
                    <div className="w-80">
                      <Label>
                        {t.formatMessage({ id: 'TABFEEDING.PRODUCTIONPHASE' })}
                        <span className="text-red-600">*</span>
                      </Label>
                      <TextInput
                        control={control}
                        type="text"
                        name="productionPhase"
                        defaultValue="GROWTH"
                        errors={errors}
                        disabled
                      />
                    </div>
                  ) : weaning?.id ? (
                    <div className="w-80">
                      <Label>
                        {t.formatMessage({ id: 'TABFEEDING.PRODUCTIONPHASE' })}
                        <span className="text-red-600">*</span>
                      </Label>
                      <TextInput
                        control={control}
                        type="text"
                        name="productionPhase"
                        defaultValue="GROWTH"
                        errors={errors}
                        disabled
                      />
                    </div>
                  ) : ['GROWTH'].includes(location?.productionPhase) ? (
                    <div className="w-80">
                      <Label>
                        {t.formatMessage({ id: 'TABFEEDING.PRODUCTIONPHASE' })}
                        <span className="text-red-600">*</span>
                      </Label>
                      <TextInput
                        control={control}
                        type="text"
                        name="productionPhase"
                        defaultValue="GROWTH"
                        errors={errors}
                        disabled
                      />
                    </div>
                  ) : ['FATTENING'].includes(location?.productionPhase) ? (
                    <div className="w-96">
                      <Label>
                        {t.formatMessage({ id: 'TABFEEDING.PRODUCTIONPHASE' })}
                        <span className="text-red-600">*</span>
                      </Label>
                      <TextInput
                        control={control}
                        type="text"
                        name="productionPhase"
                        defaultValue="FATTENING"
                        errors={errors}
                        disabled
                      />
                    </div>
                  ) : ['REPRODUCTION'].includes(location?.productionPhase) ? (
                    <div className="w-80">
                      <Label>
                        {t.formatMessage({ id: 'TABFEEDING.PRODUCTIONPHASE' })}
                        <span className="text-red-600">*</span>
                      </Label>
                      <SelectInput
                        control={control}
                        errors={errors}
                        valueType="key"
                        name="productionPhase"
                        placeholder="select production phase"
                        dataItem={reproductionProductionPhases.filter(
                          (i) => i?.lang === locale,
                        )}
                      />
                    </div>
                  ) : ['GESTATION'].includes(location?.productionPhase) ? (
                    <div className="w-80">
                      <Label>
                        {t.formatMessage({ id: 'TABFEEDING.PRODUCTIONPHASE' })}
                        <span className="text-red-600">*</span>
                      </Label>
                      <TextInput
                        control={control}
                        type="text"
                        name="productionPhase"
                        defaultValue="GESTATION"
                        errors={errors}
                        disabled
                      />
                    </div>
                  ) : (
                    <div className="w-80">
                      <Label>
                        {t.formatMessage({ id: 'TABFEEDING.PRODUCTIONPHASE' })}
                        <span className="text-red-600">*</span>
                      </Label>
                      <SelectInput
                        control={control}
                        errors={errors}
                        valueType="key"
                        name="productionPhase"
                        placeholder="select production phase"
                        dataItem={productionPhases.filter(
                          (i) => i?.lang === locale,
                        )}
                      />
                    </div>
                  )}
                  {farrowing?.id ? (
                    <div className="w-60">
                      <Label>{t.formatMessage({ id: 'VIEW.LOCATION' })}</Label>
                      <TextInput
                        control={control}
                        type="text"
                        name="locationCode"
                        defaultValue={`${farrowing?.animal?.location?.code}`}
                        errors={errors}
                        disabled
                      />
                    </div>
                  ) : (
                    <div className="w-60">
                      <Label>{t.formatMessage({ id: 'VIEW.LOCATION' })}</Label>
                      <TextInput
                        control={control}
                        type="text"
                        name="locationCode"
                        defaultValue={`${location?.code}`}
                        errors={errors}
                        disabled
                      />
                    </div>
                  )}
                </div>
                <div className="flex space-x-4">
                  {!farrowing?.id ? (
                    <>
                      <div className="my-2 w-80">
                        <Label>{t.formatMessage({ id: 'VIEW.MOTHER' })}</Label>
                        <Controller
                          control={control}
                          name="codeMother"
                          render={({ field: { value, onChange } }) => (
                            <Select
                              onValueChange={onChange}
                              name={'codeMother'}
                              value={value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="select female code" />
                              </SelectTrigger>
                              <SelectContent className="dark:border-gray-800">
                                <div className="mr-auto items-center gap-2">
                                  <SearchInput
                                    placeholder="Search by code"
                                    onChange={handleSetSearch}
                                  />
                                </div>
                                <SelectGroup>
                                  <SelectLabel>Codes</SelectLabel>
                                  {isLoadingFemales ? (
                                    <LoadingFile />
                                  ) : isErrorFemales ? (
                                    <ErrorFile
                                      title="404"
                                      description="Error finding data please try again..."
                                    />
                                  ) : Number(
                                      dataFemales?.pages[0]?.data?.total,
                                    ) <= 0 ? (
                                    <ErrorFile description="Don't have active female animals yet" />
                                  ) : (
                                    dataFemales?.pages
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
                                  {hasNextPage && (
                                    <div className="mx-auto mt-4 justify-center text-center">
                                      <ButtonLoadMore
                                        ref={ref}
                                        isFetchingNextPage={isFetchingNextPage}
                                        onClick={() => fetchNextPage()}
                                      />
                                    </div>
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                      <div className="my-2 w-80">
                        <Label>{t.formatMessage({ id: 'VIEW.FATHER' })}</Label>
                        <Controller
                          control={control}
                          name="codeFather"
                          render={({ field: { value, onChange } }) => (
                            <Select
                              onValueChange={onChange}
                              name={'codeFather'}
                              value={value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="select male code" />
                              </SelectTrigger>
                              <SelectContent className="dark:border-gray-800">
                                <div className="mr-auto items-center gap-2">
                                  <SearchInput
                                    placeholder="Search by code"
                                    onChange={handleSetSearch}
                                  />
                                </div>
                                <SelectGroup>
                                  <SelectLabel>Codes</SelectLabel>
                                  {isLoadingMales ? (
                                    <LoadingFile />
                                  ) : isErrorMales ? (
                                    <ErrorFile
                                      title="404"
                                      description="Error finding data please try again..."
                                    />
                                  ) : Number(
                                      dataMales?.pages[0]?.data?.total,
                                    ) <= 0 ? (
                                    <ErrorFile description="Don't have active male animals yet" />
                                  ) : (
                                    dataMales?.pages
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
                    </>
                  ) : (
                    <>
                      <div className="my-2 items-center w-40">
                        <Label>{t.formatMessage({ id: 'VIEW.MOTHER' })}</Label>
                        <TextInput
                          control={control}
                          type="text"
                          name="codeMother"
                          defaultValue={`${farrowing?.animal?.code}`}
                          errors={errors}
                          disabled
                        />
                      </div>
                      <div className="my-2 w-80">
                        <Label>{t.formatMessage({ id: 'VIEW.FATHER' })}</Label>
                        <Controller
                          control={control}
                          name="codeFather"
                          render={({ field: { value, onChange } }) => (
                            <Select
                              onValueChange={onChange}
                              name={'codeFather'}
                              value={value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="select male code" />
                              </SelectTrigger>
                              <SelectContent className="dark:border-gray-800">
                                <div className="mr-auto items-center gap-2">
                                  <SearchInput
                                    placeholder="Search by code"
                                    onChange={handleSetSearch}
                                  />
                                </div>
                                <SelectGroup>
                                  <SelectLabel>Codes</SelectLabel>
                                  {isLoadingMales ? (
                                    <LoadingFile />
                                  ) : isErrorMales ? (
                                    <ErrorFile
                                      title="404"
                                      description="Error finding data please try again..."
                                    />
                                  ) : Number(
                                      dataMales?.pages[0]?.data?.total,
                                    ) <= 0 ? (
                                    <ErrorFile description="Don't have active male animals yet" />
                                  ) : (
                                    dataMales?.pages
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
                      <div className="my-2 w-60">
                        <Label>
                          {t.formatMessage({ id: 'SELECT.BREED' })}
                          <span className="text-red-600">*</span>
                        </Label>
                        <Controller
                          control={control}
                          name="breedName"
                          render={({ field: { value, onChange } }) => (
                            <Select
                              onValueChange={onChange}
                              name="breedName"
                              value={value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="select breed" />
                              </SelectTrigger>
                              <SelectContent className="dark:border-gray-800">
                                <SelectGroup>
                                  <SelectLabel>Breeds</SelectLabel>
                                  {isLoadingBreeds ? (
                                    <LoadingFile />
                                  ) : isErrorBreeds ? (
                                    <ErrorFile
                                      title="404"
                                      description="Error finding data please try again..."
                                    />
                                  ) : Number(
                                      dataBreeds?.pages[0]?.data?.total,
                                    ) <= 0 ? (
                                    <ErrorFile description="Don't have breeds" />
                                  ) : (
                                    dataBreeds?.pages
                                      .flatMap((page: any) => page?.data?.value)
                                      .map((item, index) => (
                                        <>
                                          <SelectItem
                                            key={index}
                                            value={item?.name}
                                          >
                                            {item?.name}
                                          </SelectItem>
                                        </>
                                      ))
                                  )}
                                  {hasNextPage && (
                                    <div className="mx-auto mt-4 justify-center text-center">
                                      <ButtonLoadMore
                                        ref={ref}
                                        isFetchingNextPage={isFetchingNextPage}
                                        onClick={() => fetchNextPage()}
                                      />
                                    </div>
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </>
                  )}
                </div>
                {!farrowing?.id ? (
                  <div className="mb-2">
                    <Label>
                      {t.formatMessage({ id: 'SELECT.BREED' })}
                      <span className="text-red-600">*</span>
                    </Label>
                    <Controller
                      control={control}
                      name="breedName"
                      render={({ field: { value, onChange } }) => (
                        <Select
                          onValueChange={onChange}
                          name="breedName"
                          value={value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="select breed" />
                          </SelectTrigger>
                          <SelectContent className="dark:border-gray-800">
                            <SelectGroup>
                              <SelectLabel>Breeds</SelectLabel>
                              {isLoadingBreeds ? (
                                <LoadingFile />
                              ) : isErrorBreeds ? (
                                <ErrorFile
                                  title="404"
                                  description="Error finding data please try again..."
                                />
                              ) : Number(dataBreeds?.pages[0]?.data?.total) <=
                                0 ? (
                                <ErrorFile description="Don't have breeds" />
                              ) : (
                                dataBreeds?.pages
                                  .flatMap((page: any) => page?.data?.value)
                                  .map((item, index) => (
                                    <>
                                      <SelectItem
                                        key={index}
                                        value={item?.name}
                                      >
                                        {item?.name}
                                      </SelectItem>
                                    </>
                                  ))
                              )}
                              {hasNextPage && (
                                <div className="mx-auto mt-4 justify-center text-center">
                                  <ButtonLoadMore
                                    ref={ref}
                                    isFetchingNextPage={isFetchingNextPage}
                                    onClick={() => fetchNextPage()}
                                  />
                                </div>
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {/* {farrowing?.id ? (
                    <div className="my-2 items-center">
                      {t.formatMessage({ id: 'VIEW.LOCATION' })}
                      <TextInput
                        control={control}
                        type="text"
                        name="locationCode"
                        defaultValue={`${farrowing?.animal?.location?.code}`}
                        errors={errors}
                      />
                    </div>
                  ) : weaning?.id ? (
                    <div className="my-2 items-center">
                      {t.formatMessage({ id: 'VIEW.LOCATION' })}
                      <TextInput
                        control={control}
                        type="text"
                        name="locationCode"
                        defaultValue={`${weaning?.animal?.location?.code}`}
                        errors={errors}
                      />
                    </div>
                  ) : null} */}
                  </div>
                ) : null}
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

export { CreateBulkAnimals };
