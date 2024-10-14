import { CreateOneAnimalAPI, GetAnimalsAPI } from '@/api-site/animals';
import { GetBreedsAPI } from '@/api-site/breed';
import { GetLocationsAPI } from '@/api-site/locations';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput, ButtonLoadMore } from '@/components/ui-setting';
import { SelectInput, TextInput } from '@/components/ui-setting/shadcn';
import { AnimalModel } from '@/types/animal';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { FileQuestion, XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const schema = yup.object({
  code: yup.string().optional(),
  codeMother: yup.string().optional(),
  codeFather: yup.string().optional(),
  birthday: yup.string().optional(),
  breedName: yup.string().optional(),
  locationCode: yup.string().optional(),
  weight: yup.number().required('weight is a required field'),
  gender: yup.string().required('gender is a required field'),
  productionPhase: yup.string().required('productionPhase is a required field'),
});

const CreateAnimals = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
  animal?: any;
}) => {
  const { t, control, handleSubmit, errors, hasErrors, setHasErrors } =
    useReactHookForm({ schema });
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);
  const { ref, inView } = useInView();

  // Create
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOneAnimalAPI();

  const onSubmit: SubmitHandler<AnimalModel> = async (payload: AnimalModel) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
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
    isLoading: isLoadingLocations,
    isError: isErrorLocations,
    data: dataLocations,
  } = GetLocationsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    animalTypeId: animalTypeId,
  });

  const {
    isLoading: isLoadingBreeds,
    isError: isErrorBreeds,
    data: dataBreeds,
  } = GetBreedsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    animalTypeId: animalTypeId,
  });

  const {
    isLoading: isLoadingFemales,
    isError: isErrorFemales,
    data: dataFemales,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetAnimalsAPI({
    take: 10,
    sort: 'desc',
    gender: 'FEMALE',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    productionPhase: 'REPRODUCTION',
    animalTypeId: animalTypeId,
  });

  const {
    isLoading: isLoadingMales,
    isError: isErrorMales,
    data: dataMales,
  } = GetAnimalsAPI({
    take: 10,
    sort: 'desc',
    gender: 'MALE',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    productionPhase: 'REPRODUCTION',
    animalTypeId: animalTypeId,
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
                  <div className="flex items-center mt-6">
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
                            {t.formatMessage({ id: 'CODE.ANIMALS.TOOLTIP' })}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
                  <div>
                    <Label>{t.formatMessage({ id: 'VIEW.WEIGHT' })}</Label>
                    <span className="text-red-600">*</span>
                    <TextInput
                      control={control}
                      type="number"
                      name="weight"
                      placeholder="Weight"
                      errors={errors}
                    />
                  </div>
                </div>
                <div>
                  <Label>
                    Genre<span className="text-red-600">*</span>
                  </Label>
                  <SelectInput
                    firstOptionName="Choose a production type"
                    control={control}
                    errors={errors}
                    placeholder="Select gender"
                    valueType="text"
                    name="gender"
                    dataItem={[
                      { id: 1, name: 'MALE' },
                      { id: 2, name: 'FEMALE' },
                    ]}
                  />
                </div>
                <div className="my-2">
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
                          <SelectValue placeholder="Select a female code" />
                        </SelectTrigger>
                        <SelectContent className="dark:border-gray-800">
                          <SelectGroup>
                            <SelectLabel>Codes</SelectLabel>
                            {isLoadingFemales ? (
                              <LoadingFile />
                            ) : isErrorFemales ? (
                              <ErrorFile
                                title="404"
                                description="Error finding data please try again..."
                              />
                            ) : Number(dataFemales?.pages[0]?.data?.total) <=
                              0 ? (
                              <ErrorFile description="Don't have active female animals yet" />
                            ) : (
                              dataFemales?.pages
                                .flatMap((page: any) => page?.data?.value)
                                .map((item, index) => (
                                  <>
                                    <SelectItem key={index} value={item?.code}>
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
                  <div className="my-2">
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
                            <SelectValue placeholder="Select a male code" />
                          </SelectTrigger>
                          <SelectContent className="dark:border-gray-800">
                            <SelectGroup>
                              <SelectLabel>Codes</SelectLabel>
                              {isLoadingMales ? (
                                <LoadingFile />
                              ) : isErrorMales ? (
                                <ErrorFile
                                  title="404"
                                  description="Error finding data please try again..."
                                />
                              ) : Number(dataMales?.pages[0]?.data?.total) <=
                                0 ? (
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
                  <div className="mb-2">
                    <Label>Phase de production</Label>
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
                        { id: 3, name: 'REPRODUCTION' },
                        { id: 4, name: 'GESTATION' },
                      ]}
                    />
                  </div>
                </div>
                <div className="my-2">
                  <Label>
                    Sélectionner la race
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
                          <SelectValue placeholder="Select a breed" />
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
                                    <SelectItem key={index} value={item.name}>
                                      {item.name}
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
                  <div className="mt-2">
                    <Label>
                      Sélectionner un emplacement
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

export { CreateAnimals };
