import { CreateOrUpdateOneAnimalAPI, GetAnimalsAPI } from '@/api-site/animals';
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

// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
// const getBase64 = (img: FileType, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };
// const beforeUpload = (file: FileType) => {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     AlertDangerNotification({
//       text: 'You can only upload JPG/PNG file!',
//     });
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     AlertDangerNotification({
//       text: 'Image must smaller than 2MB!',
//     });
//   }
//   return isJpgOrPng && isLt2M;
// };

const schema = yup.object({
  code: yup.string().optional(),
  codeMother: yup.string().optional(),
  codeFather: yup.string().optional(),
  birthday: yup.string().optional(),
  breedName: yup.string().optional(),
  locationCode: yup.string().optional(),
  isCastrated: yup.string().optional(),
  weight: yup.number().required('weight is a required field'),
  gender: yup.string().required('gender is a required field'),
  productionPhase: yup.string().required('productionPhase is a required field'),
});

const CreateOrUpdateAnimals = ({
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
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);
  const { ref, inView } = useInView();
  // const [imageUrl, setImageUrl] = useState<string>(
  //   oneImageToURL(animal?.image),
  // );

  useEffect(() => {
    if (animal) {
      const fields = [
        'code',
        'codeMother',
        'codeFather',
        'weight',
        'birthday',
        'gender',
        'isCastrated',
        'breedName',
        'locationCode',
        'productionPhase',
      ];
      fields?.forEach((field: any) => setValue(field, animal[field]));
    }
  }, [animal, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneAnimalAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
      console.log(animal);
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
        animalId: animal.id,
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

  // const handleChange: UploadProps['onChange'] = (info) => {
  //   const { file } = info;
  //   if (['done', 'error'].includes(String(file?.status))) {
  //     getBase64(file?.originFileObj as FileType, (url) => {
  //       setImageUrl(url as any);
  //       setAttachment(file?.originFileObj);
  //     });
  //   }
  // };

  const {
    isLoading: isLoadingLocations,
    isError: isErrorLocations,
    data: dataLocations,
  } = GetLocationsAPI({
    take: 10,
    sort: 'desc',
    status: true,
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
    isLoading: isLoadingAnimals,
    isError: isErrorAnimals,
    data: dataAnimals,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetAnimalsAPI({
    take: 10,
    sort: 'desc',
    gender: `${animal?.gender === 'MALE' ? 'MALE' : 'FEMALE'}`,
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
                        <p>{t.formatMessage({ id: 'CODE.ANIMALS.TOOLTIP' })}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="my-2 flex items-center space-x-1">
                  <div>
                    <Label>
                      Genre:<span className="text-red-600">*</span>
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
                  <div className="px-4">
                    <Label>
                      Date de naissance:
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
                    <Label>
                      Poids:<span className="text-red-600">*</span>
                    </Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="weight"
                      placeholder="Weight"
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="my-2 items-center space-x-3">
                  <Label className="pl-4">Code de la mère:</Label>
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
                            {isLoadingAnimals ? (
                              <LoadingFile />
                            ) : isErrorAnimals ? (
                              <ErrorFile
                                title="404"
                                description="Error finding data please try again..."
                              />
                            ) : Number(dataAnimals?.pages[0]?.data?.total) <=
                              0 ? (
                              <ErrorFile description="Don't have active female animals yet" />
                            ) : (
                              dataAnimals?.pages
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
                  <div className="my-2">
                    <Label>Code du père:</Label>
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
                              {isLoadingAnimals ? (
                                <LoadingFile />
                              ) : isErrorAnimals ? (
                                <ErrorFile
                                  title="404"
                                  description="Error finding data please try again..."
                                />
                              ) : Number(dataAnimals?.pages[0]?.data?.total) <=
                                0 ? (
                                <ErrorFile description="Don't have active male animals yet" />
                              ) : (
                                dataAnimals?.pages
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
                  <div className="mb-2">
                    <Label>
                      Phase de production:
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
                        { id: 2, name: 'FATTENING' },
                        { id: 3, name: 'REPRODUCTION' },
                        { id: 4, name: 'GESTATION' },
                      ]}
                    />
                  </div>
                </div>
                <div className="my-2 items-center space-x-3">
                  <Label className="pl-3">
                    Sélectionnez la race
                    <span className="text-red-600">*</span>
                  </Label>
                  <Controller
                    control={control}
                    name="breedName"
                    render={({ field: { value, onChange } }) => (
                      <Select
                        onValueChange={onChange}
                        name={'breedName'}
                        value={value}
                      >
                        <SelectTrigger className="w-full">
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
                      Sélectionnez un emplacement
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
                    {animal.gender === 'MALE' && animal.id ? (
                      <div className="my-2">
                        <Label>Castré</Label>
                        <SelectInput
                          firstOptionName="Choose a castration"
                          control={control}
                          errors={errors}
                          placeholder="Choose if animal is castrated"
                          valueType="text"
                          name="isCastrated"
                          dataItem={[
                            { id: 1, name: 'YES' },
                            { id: 2, name: 'NO' },
                          ]}
                        />
                      </div>
                    ) : (
                      ''
                    )}
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

export { CreateOrUpdateAnimals };
