import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { CreateOneAvesAnimalAPI } from '@/api-site/animals';
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
  male: yup.number().optional(),
  female: yup.number().optional(),
  quantity: yup.number().optional(),
  productionPhase: yup.string().optional(),
  birthday: yup.string().required('birthday is a required field'),
  weight: yup.number().required('weight is a required field'),
  locationCode: yup.string().required('location code is a required field'),
});

const CreateAvesAnimals = ({
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
    control,
    setValue,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });
  const { ref, inView } = useInView();
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);

  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: animalTypeId,
  });

  useEffect(() => {
    if (animal) {
      const fields = [
        'code',
        'male',
        'female',
        'weight',
        'quantity',
        'birthday',
        'locationCode',
        'productionPhase',
      ];
      fields?.forEach((field: any) => setValue(field, animal[field]));
    }
  }, [animal, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOneAvesAnimalAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<AnimalModel> = async (payload: AnimalModel) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        animalTypeId: animalTypeId,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Animal saved successfully',
      });
      setShowModal(false);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
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
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetLocationsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
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
            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
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
                {animalType.name === 'Poulet de chair' ? (
                  <div className="mt-2">
                    <Label>
                      Nombre animaux:
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
                ) : (
                  <div className="my-2 flex items-center space-x-1">
                    <div className="">
                      <Label>Phase de production: </Label>
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
                    <div className="px-4">
                      <Label>
                        Nombre de males:
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
                    <div className="ml-4">
                      <Label>
                        Nombre de femèles:
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
                  </div>
                )}
                <div className="my-2 flex items-center space-x-1">
                  <div className="mr-10">
                    <Label>
                      Poids: <span className="text-red-600">*</span>
                    </Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="weight"
                      placeholder="Give weight"
                      errors={errors}
                    />
                  </div>
                  <div className="pr-10">
                    <Label>
                      Code du batiment: <span className="text-red-600">*</span>{' '}
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
                                      <SelectItem key={index} value={item.code}>
                                        {item.code}
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
                  <div className="ml-4">
                    <Label>
                      Date de lancement: <span className="text-red-600">*</span>
                    </Label>
                    <div className="flex items-center space-x-2">
                      <DateInput
                        control={control}
                        errors={errors}
                        placeholder="Starting date"
                        name="birthday"
                      />
                    </div>
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

export { CreateAvesAnimals };