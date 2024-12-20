import { GetAnimalsAPI } from '@/api-site/animals';
import { GetOneBuildingAPI } from '@/api-site/buildings';
import { GetLocationsAPI } from '@/api-site/locations';
import { CreateOrUpdateOneWeaningAPI } from '@/api-site/weanings';
import { useInputState, useReactHookForm } from '@/components/hooks';
import {
  ButtonInput,
  ButtonLoadMore,
  SearchInput,
} from '@/components/ui-setting';
import { WeaningsModel } from '@/types/weanings';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import * as yup from 'yup';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { TextInput } from '../ui-setting/shadcn';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
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
  animals: yup.array().optional(),
  locationCode: yup.string().required('location code is a required field'),
  weight: yup.number().required('weight is a required field'),
});

const CreateOrUpdateWeanings = ({
  showModal,
  setShowModal,
  weaning,
  location,
}: {
  showModal: boolean;
  setShowModal: any;
  weaning?: any;
  location?: any;
}) => {
  const {
    t,
    watch,
    control,
    errors,
    setValue,
    handleSubmit,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });
  const { query } = useRouter();
  const { ref, inView } = useInView();
  const selectedAnimals = watch('animals', []);
  const countSelectedAnimals = selectedAnimals.length;
  const buildingId = String(query?.buildingId);
  const { search, handleSetSearch } = useInputState();
  const { data: getOneBuilding } = GetOneBuildingAPI({
    buildingId: buildingId,
  });

  useEffect(() => {
    if (weaning) {
      const fields = ['litter', 'weight'];
      fields?.forEach((field: any) => setValue(field, weaning[field]));
    }
  }, [weaning, setValue]);

  // Create or Update data
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOrUpdateOneWeaningAPI();

  const onSubmit: SubmitHandler<WeaningsModel> = async (
    payload: WeaningsModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        weaningId: weaning?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Weaning saved successfully',
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
    isLoading: isLoadingAnimals,
    isError: isErrorAnimals,
    data: dataAnimals,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetAnimalsAPI({
    take: 10,
    sort: 'desc',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    productionPhase: 'GROWTH',
    locationId: location?.id,
    animalTypeId: getOneBuilding?.animalTypeId,
  });

  const { data: dataAnimal } = GetAnimalsAPI({
    take: 2,
    sort: 'desc',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    productionPhase: 'LACTATION',
    locationId: location?.id,
    animalTypeId: getOneBuilding?.animalTypeId,
  });

  const {
    isLoading: isLoadingLocations,
    isError: isErrorLocations,
    data: dataLocations,
  } = GetLocationsAPI({
    search,
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    productionPhase: 'GROWTH',
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

                {!weaning?.id && dataAnimal ? (
                  <div className="mb-2 items-center">
                    <Label>{t.formatMessage({ id: 'VIEW.MOTHER' })}</Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="code"
                      defaultValue={`${dataAnimal?.pages[0]?.data?.value?.[0]?.code}`}
                      errors={errors}
                      disabled
                    />
                  </div>
                ) : null}
                <div className="flex items-center space-x-4 my-2">
                  <div className="w-full">
                    <Label>
                      Sélectionner les petits à sevrer
                      <span className="text-red-600">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="select offsprings for weaning" />
                      </SelectTrigger>
                      <SelectContent className="dark:border-gray-800">
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
                              .map((item: any) => (
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
                  <div className="w-60">
                    <Label>
                      {t.formatMessage({ id: 'VIEW.WEIGHT' })}(g)
                      <span className="text-red-600">*</span>
                    </Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="weight"
                      placeholder="weight"
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="">
                  <Label>
                    {t.formatMessage({ id: 'VIEW.LOCATION' })}
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
                          <SelectValue placeholder="select location code" />
                        </SelectTrigger>
                        <SelectContent className="dark:border-gray-800">
                          <div className="mr-auto items-center gap-2">
                            <SearchInput
                              placeholder="Search by code"
                              onChange={handleSetSearch}
                            />
                          </div>
                          <SelectGroup>
                            <SelectLabel>Location codes</SelectLabel>
                            {isLoadingLocations ? (
                              <LoadingFile />
                            ) : isErrorLocations ? (
                              <ErrorFile
                                title="404"
                                description="Error finding data please try again..."
                              />
                            ) : Number(dataLocations?.pages[0]?.data?.total) <=
                              0 ? (
                              <ErrorFile description="Don't have location codes" />
                            ) : (
                              dataLocations?.pages
                                .flatMap((page: any) => page?.data?.value)
                                .map((item: any, index: any) => (
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

export { CreateOrUpdateWeanings };
