import { AnimalsIdentificationAPI } from '@/api-site/animals';
import { GetBreedsAPI } from '@/api-site/breed';
import { GetOneFemaleBreedingAPI } from '@/api-site/breedings';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput, ButtonLoadMore } from '@/components/ui-setting';
import { TextInput } from '@/components/ui-setting/shadcn';
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
  codeMother: yup.string().optional(),
  codeFather: yup.string().optional(),
  males: yup.number().required('number is a required'),
  females: yup.number().required('number is a required'),
  weight: yup.number().required('weight is a required'),
  birthday: yup.string().required('birthday is a required'),
  breedName: yup.string().required('breed name is a required'),
});

const OffspringsIdentification = ({
  showModal,
  setShowModal,
  location,
}: {
  showModal: boolean;
  setShowModal: any;
  location?: any;
}) => {
  const { t, control, handleSubmit, errors, hasErrors, setHasErrors } =
    useReactHookForm({ schema });
  const { ref, inView } = useInView();

  // Create
  const { isPending: loading, mutateAsync: saveMutation } =
    AnimalsIdentificationAPI();

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

  const { data: femaleBreeding } = GetOneFemaleBreedingAPI({
    animalFemaleId: location?.animals?.[0]?.id,
  });

  const {
    isLoading: isLoadingBreeds,
    isError: isErrorBreeds,
    data: dataBreeds,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetBreedsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
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
            <form className="my-2" onSubmit={handleSubmit(onSubmit)}>
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
                <div className="mt-2 flex items-center space-x-2">
                  <div className="w-40">
                    <Label>
                      <Label>Nombre de males</Label>
                      <span className="text-red-600">*</span>
                    </Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="males"
                      placeholder="number of males"
                      errors={errors}
                    />
                  </div>
                  <div className="w-40">
                    <Label>
                      <Label>Nombre de femelles</Label>
                      <span className="text-red-600">*</span>
                    </Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="females"
                      placeholder="number"
                      errors={errors}
                    />
                  </div>
                  <div className="w-80">
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
                </div>
                <div className="flex space-x-2 items-center">
                  <div className="w-44">
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
                  <div className="w-40">
                    <Label>{t.formatMessage({ id: 'VIEW.MOTHER' })}</Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="codeMother"
                      defaultValue={`${location?.animals?.[0]?.code}`}
                      errors={errors}
                      disabled
                    />
                  </div>
                  <div className="my-2 w-80">
                    <Label>{t.formatMessage({ id: 'VIEW.FATHER' })}</Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="codeFather"
                      defaultValue={`${femaleBreeding?.maleCode}`}
                      errors={errors}
                      disabled
                    />
                  </div>
                </div>
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
                                    <SelectItem key={index} value={item?.name}>
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

export { OffspringsIdentification };
