import { GetAnimalsAPI } from '@/api-site/animals';
import { GetHealthsAPI } from '@/api-site/health';
import { UpdateOneTreatmentAPI } from '@/api-site/treatment';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput, ButtonLoadMore } from '@/components/ui-setting';
import {
  SelectInput,
  TextAreaInput,
  TextInput,
} from '@/components/ui-setting/shadcn';
import { TreatmentsPostModel } from '@/types/treatments';
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
  animals: yup.array().optional(),
  dose: yup.number().optional(),
  name: yup.string().required('name is required'),
  note: yup.string().required('note is a required field'),
  healthId: yup.string().required('medication is required'),
  diagnosis: yup.string().required('diagnostic is required'),
  method: yup.string().required('method is required'),
});

const UpdateTreatments = ({
  showModal,
  setShowModal,
  treatment,
  location,
}: {
  showModal: boolean;
  setShowModal: any;
  treatment?: any;
  location?: any;
}) => {
  const {
    t,
    watch,
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
  const { ref, inView } = useInView();
  const animalTypeId = String(query?.animalTypeId);
  const selectedAnimals = watch('animals', '');
  const countSelectedAnimals = selectedAnimals.length;

  useEffect(() => {
    if (treatment) {
      const fields = [
        'animals',
        'note',
        'diagnosis',
        'dose',
        'name',
        'healthId',
        'method',
      ];
      fields?.forEach((field: any) => setValue(field, treatment[field]));
    }
  }, [treatment, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = UpdateOneTreatmentAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<TreatmentsPostModel> = async (
    payload: TreatmentsPostModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        treatmentId: treatment?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Treatment saved successfully',
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
    isLoading: isLoadingTreatments,
    isError: isErrorTreatments,
    data: dataTreatments,
  } = GetHealthsAPI({
    take: 10,
    sort: 'desc',
    status: true,
    sortBy: 'createdAt',
    category: 'MEDICATION',
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
    take: 5,
    sort: 'desc',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    locationId: location?.id,
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
                <div className="flex items-center space-x-4 w-full">
                  <div className="mb-2 w-full mt-2">
                    <Label>
                      Sélectionez les animaux à soigner
                      <span className="text-red-600">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select animals" />
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
                <div className="mb-2 items-center space-x-1">
                  <Label>
                    Treatement<span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="name"
                    placeholder="Give treatment name"
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
                    placeholder="Give a diagnosis"
                    errors={errors}
                  />
                </div>
                <div className="mb-4">
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
                          <SelectValue placeholder="Select medication" />
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
                            ) : Number(dataTreatments?.pages[0]?.data?.total) <=
                              0 ? (
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
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="mb-4 flex items-center space-x-2">
                  <Label>Dose:</Label>
                  <TextInput
                    control={control}
                    type="number"
                    name="dose"
                    placeholder="Give a dose"
                    errors={errors}
                  />
                  <Label>
                    Voie:<span className="text-red-600">*</span>
                  </Label>
                  <SelectInput
                    firstOptionName="Give a method"
                    control={control}
                    errors={errors}
                    placeholder="Select method"
                    valueType="text"
                    name="method"
                    dataItem={[
                      { id: 1, name: 'EYE' },
                      { id: 2, name: 'ORAL' },
                      { id: 1, name: 'NASAL' },
                      { id: 2, name: 'INJECTION' },
                    ]}
                  />
                </div>
                <div className="mb-4">
                  <TextAreaInput
                    control={control}
                    label="Feedback"
                    name="note"
                    placeholder="Give details about animal state"
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

export { UpdateTreatments };
