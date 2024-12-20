import { GetAnimalsAPI } from '@/api-site/animals';
import { CreateOrUpdateOneBreedingAPI } from '@/api-site/breedings';
import { useInputState, useReactHookForm } from '@/components/hooks';
import {
  ButtonInput,
  ButtonLoadMore,
  SearchInput,
} from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import {
  SelectInput,
  TextAreaInput,
  TextInput,
} from '@/components/ui-setting/shadcn';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BreedingsModel } from '@/types/breeding';
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
import { Label } from '../ui/label';

const schema = yup.object({
  codeMale: yup.string().optional(),
  codeFemale: yup.string().optional(),
  method: yup.string().required('method is required'),
  note: yup.string().required('note is a required field'),
});

const CreateBreedings = ({
  showModal,
  setShowModal,
  location,
}: {
  showModal: boolean;
  setShowModal: any;
  location?: any;
}) => {
  const { control, handleSubmit, errors, hasErrors, setHasErrors } =
    useReactHookForm({ schema });
  const { query } = useRouter();
  const { t, search, handleSetSearch } = useInputState();
  const animalTypeId = String(query?.animalTypeId);

  const { ref, inView } = useInView();

  // Create
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOrUpdateOneBreedingAPI();

  const onSubmit: SubmitHandler<BreedingsModel> = async (
    payload: BreedingsModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Breeding saved successfully',
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
    data: dataFemaleAnimals,
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
    animalTypeId: animalTypeId,
  });

  const {
    isLoading: isLoadingMaleAnimals,
    isError: isErrorMaleAnimals,
    data: dataMaleAnimals,
  } = GetAnimalsAPI({
    search,
    take: 10,
    sort: 'desc',
    gender: 'MALE',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    productionPhase: 'REPRODUCTION',
    animalTypeId: animalTypeId,
  });

  const {
    isLoading: isLoadingLocationMales,
    isError: isErrorLocationMales,
    data: dataMalesLocation,
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

                <div className="flex items-center my-2 space-x-10">
                  {location?.id ? (
                    <div className="w-80">
                      <Label>
                        Sélectionner un male
                        <span className="text-red-600">*</span>
                      </Label>
                      <Controller
                        control={control}
                        name="codeMale"
                        render={({ field: { value, onChange } }) => (
                          <Select
                            onValueChange={onChange}
                            name={'codeMale'}
                            value={value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="select male" />
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
                                {isLoadingLocationMales ? (
                                  <LoadingFile />
                                ) : isErrorLocationMales ? (
                                  <ErrorFile
                                    title="404"
                                    description="Error finding data please try again..."
                                  />
                                ) : Number(
                                    dataMalesLocation?.pages[0]?.data?.total,
                                  ) <= 0 ? (
                                  <ErrorFile description="Don't have male animals created yet please do" />
                                ) : (
                                  dataMalesLocation?.pages
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
                    <div className="w-80">
                      <Label>
                        Sélectionner un male
                        <span className="text-red-600">*</span>
                      </Label>
                      <Controller
                        control={control}
                        name="codeMale"
                        render={({ field: { value, onChange } }) => (
                          <Select
                            onValueChange={onChange}
                            name={'codeMale'}
                            value={value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="select male" />
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
                                {isLoadingAnimals ? (
                                  <LoadingFile />
                                ) : isErrorAnimals ? (
                                  <ErrorFile
                                    title="404"
                                    description="Error finding data please try again..."
                                  />
                                ) : Number(
                                    dataMaleAnimals?.pages[0]?.data?.total,
                                  ) <= 0 ? (
                                  <ErrorFile description="Don't have male animals created yet please do" />
                                ) : (
                                  dataMaleAnimals?.pages
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
                  )}
                  {location?.id ? (
                    <div className="w-80">
                      <Label>Female code</Label>
                      <TextInput
                        control={control}
                        type="text"
                        name="codeFemale"
                        defaultValue={`${location?.animals?.[0]?.code}`}
                        errors={errors}
                        disabled
                      />
                    </div>
                  ) : (
                    <div className="w-80">
                      <Label>
                        Sélectionner une female
                        <span className="text-red-600">*</span>
                      </Label>
                      <Controller
                        control={control}
                        name="codeFemale"
                        render={({ field: { value, onChange } }) => (
                          <Select
                            onValueChange={onChange}
                            name={'codeFemale'}
                            value={value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="select female" />
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
                                {isLoadingMaleAnimals ? (
                                  <LoadingFile />
                                ) : isErrorMaleAnimals ? (
                                  <ErrorFile
                                    title="404"
                                    description="Error finding data please try again..."
                                  />
                                ) : Number(
                                    dataFemaleAnimals?.pages[0]?.data?.total,
                                  ) <= 0 ? (
                                  <ErrorFile description="Don't have female animals created yet please do" />
                                ) : (
                                  dataFemaleAnimals?.pages
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
                  )}
                </div>
                <div className="my-2">
                  <Label>
                    Sélectionnez la methode de croisement
                    <span className="text-red-600">*</span>
                  </Label>
                  <SelectInput
                    control={control}
                    errors={errors}
                    placeholder="select breeding method"
                    valueType="text"
                    name="method"
                    dataItem={[
                      { id: 1, name: 'NATURAL' },
                      { id: 1, name: 'INVITRO' },
                    ]}
                  />
                </div>
                <div className="mb-4">
                  <Label>
                    Observation
                    <span className="text-red-600">*</span>
                  </Label>
                  <TextAreaInput
                    control={control}
                    name="note"
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

export { CreateBreedings };
