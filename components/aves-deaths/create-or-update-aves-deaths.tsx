import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { GetAnimalsAPI } from '@/api-site/animals';
import { CreateOrUpdateOneAvesDeathAPI } from '@/api-site/deaths';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput, ButtonLoadMore } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { TextAreaInput, TextInput } from '@/components/ui-setting/shadcn';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import { Label } from '../ui/label';

const schema = yup.object({
  code: yup.string().optional(),
  male: yup.number().optional(),
  female: yup.number().optional(),
  number: yup.number().optional(),
  note: yup.string().required('note is a required field'),
});

const CreateOrUpdateAvesDeaths = ({
  showModal,
  setShowModal,
  death,
}: {
  showModal: boolean;
  setShowModal: any;
  death?: any;
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
    if (death) {
      const fields = ['code', 'female', 'male', 'number', 'note'];
      fields?.forEach((field: any) => setValue(field, death[field]));
    }
  }, [death, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneAvesDeathAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<DeathsModel> = async (payload: DeathsModel) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        deathId: death?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Death saved successfully',
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

                {!death?.id ? (
                  <div className="mb-4">
                    <Label>
                      Sélectionnez le code de la bande:
                      <span className="text-red-600">*</span>
                    </Label>
                    <Controller
                      control={control}
                      name="code"
                      render={({ field: { value, onChange } }) => (
                        <Select
                          onValueChange={onChange}
                          name={'code'}
                          value={value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select band code" />
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
                                <ErrorFile description="Don't have active animals yet" />
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
                    {animalType.name === 'Poulet de chair' ? (
                      <div className="mt-4">
                        <Label>
                          Nombre animaux:
                          <span className="text-red-600">*</span>
                        </Label>
                        <TextInput
                          control={control}
                          type="number"
                          name="number"
                          placeholder="Give a number"
                          errors={errors}
                        />
                      </div>
                    ) : (
                      <div className="my-2 flex items-center space-x-1">
                        <Label>
                          Males:
                          <span className="text-red-600">*</span>
                        </Label>
                        <TextInput
                          control={control}
                          type="number"
                          name="male"
                          placeholder="Number of males"
                          errors={errors}
                        />
                        <Label>
                          Femèles:
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
                    )}
                  </div>
                ) : null}

                <div className="mb-4">
                  <TextAreaInput
                    control={control}
                    label="Description"
                    name="note"
                    placeholder="Note"
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

export { CreateOrUpdateAvesDeaths };
