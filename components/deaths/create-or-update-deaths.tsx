import { GetAnimalsAPI } from '@/api-site/animals';
import { GetOneBuildingAPI } from '@/api-site/buildings';
import { CreateOrUpdateOneDeathAPI } from '@/api-site/deaths';
import { useInputState, useReactHookForm } from '@/components/hooks';
import {
  ButtonInput,
  ButtonLoadMore,
  SearchInput,
} from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { TextAreaInput } from '@/components/ui-setting/shadcn';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DeathsModel } from '@/types/deaths';
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
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const schema = yup.object({
  animals: yup.array().optional(),
  note: yup.string().required('note is a required field'),
});

const CreateOrUpdateDeaths = ({
  showModal,
  setShowModal,
  death,
  location,
}: {
  showModal: boolean;
  setShowModal: any;
  location?: any;
  death?: any;
}) => {
  const {
    t,
    watch,
    errors,
    control,
    setValue,
    hasErrors,
    handleSubmit,
    setHasErrors,
  } = useReactHookForm({ schema });
  const { query } = useRouter();
  const { ref, inView } = useInView();
  const { search, handleSetSearch } = useInputState();
  const selectedAnimals = watch('animals', '');
  const countSelectedAnimals = selectedAnimals.length;
  const buildingId = String(query?.buildingId);
  const { data: getOneBuilding } = GetOneBuildingAPI({
    buildingId: buildingId,
  });

  useEffect(() => {
    if (death) {
      const fields = ['note'];
      fields?.forEach((field: any) => setValue(field, death[field]));
    }
  }, [death, setValue]);

  // Create or Update data
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOrUpdateOneDeathAPI();

  const onSubmit: SubmitHandler<DeathsModel> = async (payload: DeathsModel) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        deathId: death?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Death saved successfully',
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
    search,
    take: 10,
    sort: 'desc',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    animalTypeId: getOneBuilding?.animalTypeId,
  });

  const {
    isLoading: isLoadingLocationAnimals,
    isError: isErrorLocationAnimals,
    data: dataLocationAnimals,
  } = GetAnimalsAPI({
    search,
    take: 10,
    sort: 'desc',
    status: 'ACTIVE',
    sortBy: 'createdAt',
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
                {!death?.id ? (
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
                ) : null}
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
                <div className="flex items-center space-x-4 w-full">
                  {!death?.id && !location?.id ? (
                    <div className="mb-4 w-full">
                      <Label>
                        Sélectionner les animaux morts
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
                                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4"
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
                  ) : location?.id ? (
                    <div className="mb-4 w-full">
                      <Label>
                        Sélectionner les animaux morts
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
                            {isLoadingLocationAnimals ? (
                              <LoadingFile />
                            ) : isErrorLocationAnimals ? (
                              <ErrorFile
                                title="404"
                                description="Error finding data please try again..."
                              />
                            ) : Number(
                                dataLocationAnimals?.pages[0]?.data?.total,
                              ) <= 0 ? (
                              <ErrorFile description="Don't have active animals created yet please do" />
                            ) : (
                              dataLocationAnimals?.pages
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
                                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4"
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
                  ) : (
                    ''
                  )}
                </div>
                <div className="mb-4">
                  <TextAreaInput
                    control={control}
                    label="Cause et moyen de disposition des carcasses"
                    name="note"
                    placeholder="cause and disposal method"
                    errors={errors}
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

export { CreateOrUpdateDeaths };
