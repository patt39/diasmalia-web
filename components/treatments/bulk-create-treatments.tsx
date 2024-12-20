import { GetAnimalsAPI } from '@/api-site/animals';
import { GetOneBuildingAPI } from '@/api-site/buildings';
import { GetHealthsAPI } from '@/api-site/health';
import { CreateOneTreatmentAPI } from '@/api-site/treatment';
import { useInputState, useReactHookForm } from '@/components/hooks';
import {
  ButtonInput,
  ButtonLoadMore,
  SearchInput,
} from '@/components/ui-setting';
import { SelectInput, TextInput } from '@/components/ui-setting/shadcn';
import { treatmentMethods } from '@/i18n/default-exports';
import { TreatmentsPostModel } from '@/types/treatments';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import * as yup from 'yup';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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
  dose: yup.string().optional(),
  animals: yup.array().optional(),
  name: yup.string().required('name is required'),
  healthId: yup.string().required('medication is required'),
  diagnosis: yup.string().required('diagnostic is required'),
  method: yup.string().required('method is required'),
});

const BulkCreateTreatments = ({
  showModal,
  setShowModal,
  location,
  animal,
}: {
  showModal: boolean;
  setShowModal: any;
  location?: any;
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
  const { ref, inView } = useInView();
  const buildingId = String(query?.buildingId);
  const selectedAnimals = watch('animals', []);
  const countSelectedAnimals = selectedAnimals.length;
  const { search, handleSetSearch } = useInputState();

  const { data: getOneBuilding } = GetOneBuildingAPI({
    buildingId: buildingId,
  });

  // Create
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOneTreatmentAPI();

  useEffect(() => {
    if (animal) {
      const fields = ['code'];
      fields?.forEach((field: any) => setValue(field, animal[field]));
    }
  }, [animal, setValue]);

  const onSubmit: SubmitHandler<TreatmentsPostModel> = async (
    payload: TreatmentsPostModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Treatment saved successfully',
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
    isLoading: isLoadingTreatments,
    isError: isErrorTreatments,
    data: dataTreatments,
  } = GetHealthsAPI({
    take: 10,
    sort: 'desc',
    status: true,
    sortBy: 'createdAt',
    category: 'MEDICATION',
    animalTypeId: getOneBuilding?.animalTypeId,
  });

  const {
    isLoading: isLoadingAnimals,
    isError: isErrorAnimals,
    data: dataAnimals,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetAnimalsAPI({
    search,
    take: 5,
    sort: 'desc',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    locationId: location?.id,
    animalTypeId: getOneBuilding?.animalTypeId,
  });

  const {
    isLoading: isLoadingGrowthAnimals,
    isError: isErrorGrowthAnimals,
    data: dataGrowthAnimals,
  } = GetAnimalsAPI({
    take: 10,
    sort: 'desc',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    productionPhase: 'GROWTH',
    locationId: location?.id,
    animalTypeId: getOneBuilding?.animalTypeId,
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
            <div className="flex mb-0">
              <div className="mr-auto">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        {countSelectedAnimals || 0}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="dark:border-gray-800">
                      <p>
                        {countSelectedAnimals}
                        {t.formatMessage({ id: 'ANIMAL.SELECTED.COUNT' })}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="justify-end">
                <button
                  className="float-right border-0 bg-transparent text-black"
                  onClick={() => setShowModal(false)}
                >
                  <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                    <XIcon />
                  </span>
                </button>
              </div>
            </div>
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
                {location?.id && location?.productionPhase === 'LACTATION' ? (
                  <div className="flex items-center space-x-4 w-full">
                    <div className="mb-2 w-full mt-2">
                      <Label>
                        Sélectionner les animaux à soigner
                        <span className="text-red-600">*</span>
                      </Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="select animals" />
                        </SelectTrigger>
                        <SelectContent className="dark:border-gray-800">
                          <SelectGroup>
                            {isLoadingGrowthAnimals ? (
                              <LoadingFile />
                            ) : isErrorGrowthAnimals ? (
                              <ErrorFile
                                title="404"
                                description="Error finding data please try again..."
                              />
                            ) : Number(
                                dataGrowthAnimals?.pages[0]?.data?.total,
                              ) <= 0 ? (
                              <ErrorFile description="Don't have active animals created yet please do" />
                            ) : (
                              dataGrowthAnimals?.pages
                                .flatMap((page: any) => page?.data?.value)
                                .map((item) => (
                                  <>
                                    <Controller
                                      key={item?.code}
                                      control={control}
                                      name="animals"
                                      render={({ field: { ...field } }) => (
                                        <>
                                          <div
                                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow"
                                            key={item?.code}
                                          >
                                            <Checkbox
                                              checked={field?.value?.includes(
                                                item?.code,
                                              )}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([
                                                      ...(field.value || []),
                                                      item?.code,
                                                    ])
                                                  : field?.onChange(
                                                      field?.value?.filter(
                                                        (value: any) =>
                                                          value !== item?.code,
                                                      ),
                                                    );
                                              }}
                                            />
                                            <div className="space-y-1 leading-none">
                                              <Label>{item?.code}</Label>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    />
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
                    </div>
                  </div>
                ) : location?.id ? (
                  <div className="flex items-center space-x-4 w-full">
                    <div className="mb-2 w-full mt-2">
                      <Label>
                        Sélectionner les animaux à soigner
                        <span className="text-red-600">*</span>
                      </Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="select animals" />
                        </SelectTrigger>
                        <SelectContent className="dark:border-gray-800">
                          <div className="mr-auto items-center gap-2">
                            <SearchInput
                              placeholder="Search by code"
                              onChange={handleSetSearch}
                            />
                          </div>
                          <SelectGroup>
                            {isLoadingAnimals ? (
                              <LoadingFile />
                            ) : isErrorAnimals ? (
                              <ErrorFile
                                title="404"
                                description="Error finding data please try again..."
                              />
                            ) : Number(dataAnimals?.pages[0]?.data?.total) <=
                              0 ? (
                              <ErrorFile description="Don't have active animals created yet please do" />
                            ) : (
                              dataAnimals?.pages
                                .flatMap((page: any) => page?.data?.value)
                                .map((item) => (
                                  <>
                                    <Controller
                                      key={item?.code}
                                      control={control}
                                      name="animals"
                                      render={({ field: { ...field } }) => (
                                        <>
                                          <div
                                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow"
                                            key={item?.code}
                                          >
                                            <Checkbox
                                              checked={field?.value?.includes(
                                                item?.code,
                                              )}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([
                                                      ...(field.value || []),
                                                      item?.code,
                                                    ])
                                                  : field?.onChange(
                                                      field?.value?.filter(
                                                        (value: any) =>
                                                          value !== item?.code,
                                                      ),
                                                    );
                                              }}
                                            />
                                            <div className="space-y-1 leading-none">
                                              <Label>{item?.code}</Label>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    />
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
                    </div>
                  </div>
                ) : (
                  <div className="my-2 items-center">
                    <Label>{t.formatMessage({ id: 'VIEW.MOTHER' })}</Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="code"
                      errors={errors}
                    />
                  </div>
                )}
                <div className="mb-2 items-center space-x-1">
                  <Label>
                    Treatement<span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="name"
                    placeholder="treatment name"
                    errors={errors}
                  />
                </div>
                <div className="mb-2 items-center space-x-1">
                  <Label>
                    Diagnostic<span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="diagnosis"
                    placeholder="diagnosis"
                    errors={errors}
                  />
                </div>
                <div className="mb-4 flex items-center space-x-4">
                  <div className="w-80">
                    <Label>
                      Medication<span className="text-red-600">*</span>
                    </Label>
                    <Controller
                      control={control}
                      name="healthId"
                      render={({ field: { value, onChange } }) => (
                        <Select
                          onValueChange={onChange}
                          name={'healthId'}
                          value={value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="select medication" />
                          </SelectTrigger>
                          <SelectContent className="dark:border-gray-800">
                            <SelectGroup>
                              {isLoadingTreatments ? (
                                <LoadingFile />
                              ) : isErrorTreatments ? (
                                <ErrorFile
                                  title="404"
                                  description="Error finding data please try again..."
                                />
                              ) : Number(
                                  dataTreatments?.pages[0]?.data?.total,
                                ) <= 0 ? (
                                <ErrorFile description="Don't have active animals yet" />
                              ) : (
                                dataTreatments?.pages
                                  .flatMap((page: any) => page?.data?.value)
                                  .map((item: any, index: any) => (
                                    <>
                                      <SelectItem key={index} value={item?.id}>
                                        {item?.name}
                                      </SelectItem>
                                    </>
                                  ))
                              )}
                              <Button variant="link">
                                <Link href="/health">
                                  {t.formatMessage({ id: 'ADD.MEDICATION' })}
                                </Link>
                              </Button>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="w-60">
                    <Label>
                      Voie<span className="text-red-600">*</span>
                    </Label>
                    <SelectInput
                      control={control}
                      errors={errors}
                      placeholder="select method"
                      valueType="text"
                      name="method"
                      dataItem={treatmentMethods.filter(
                        (i) => i?.lang === locale,
                      )}
                    />
                  </div>
                  <div className="w-40">
                    <Label>
                      Dose<span className="text-red-600">*</span>
                    </Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="dose"
                      placeholder="ex 0,2ml"
                      errors={errors}
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

export { BulkCreateTreatments };
