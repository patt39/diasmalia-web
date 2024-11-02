import { CreateBulkAvesAnimalsAPI } from '@/api-site/animals';
import { GetLocationsAPI } from '@/api-site/locations';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput, ButtonLoadMore } from '@/components/ui-setting';
import { AnimalModel } from '@/types/animal';
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
import { DateInput, LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { TextInput } from '../ui-setting/shadcn';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const schema = yup.object({
  locations: yup.array().optional(),
  birthday: yup.string().required(),
  quantity: yup.number().required('quantity is a required field'),
  weight: yup.number().required('weight is a required field'),
});

const CreateBulkAvesAnimals = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
}) => {
  const {
    t,
    errors,
    control,
    handleSubmit,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);
  const { ref, inView } = useInView();

  // Create
  const { mutateAsync: saveMutation } = CreateBulkAvesAnimalsAPI({
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
        text: 'Animals added successfully',
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
                <div className="mb-2 w-full mt-2">
                  <Label>
                    Sélectionner les cages
                    <span className="text-red-600">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select cages codes" />
                    </SelectTrigger>
                    <SelectContent className="dark:border-gray-800">
                      <SelectGroup>
                        {isLoadingLocations ? (
                          <LoadingFile />
                        ) : isErrorLocations ? (
                          <ErrorFile
                            title="404"
                            description="Error finding data please try again..."
                          />
                        ) : Number(dataLocations?.pages[0]?.data?.total) <=
                          0 ? (
                          <ErrorFile description="Don't have cages yet please add" />
                        ) : (
                          dataLocations?.pages
                            .flatMap((page: any) => page?.data?.value)
                            .map((item) => (
                              <>
                                <Controller
                                  key={item?.code}
                                  control={control}
                                  name="locations"
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
                <div className="flex items-center space-x-4">
                  <div className="my-2">
                    <Label>
                      {t.formatMessage({ id: 'NUMBER.ANIMALS' })}
                      <span className="text-red-600">*</span>
                    </Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="quantity"
                      defaultValue="0"
                      placeholder="Number of animals"
                      errors={errors}
                    />
                  </div>
                  <div>
                    <Label>
                      {t.formatMessage({ id: 'TABANIMAL.WEIGHT' })}
                      (g)<span className="text-red-600">*</span>
                    </Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="weight"
                      placeholder="Give weight"
                      errors={errors}
                    />
                  </div>
                  <div className="">
                    <Label>
                      {t.formatMessage({ id: 'LAUNCHING.DATE' })}
                      <span className="text-red-600">*</span>
                    </Label>
                    <DateInput
                      control={control}
                      errors={errors}
                      placeholder="Starting date"
                      name="birthday"
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

export { CreateBulkAvesAnimals };
