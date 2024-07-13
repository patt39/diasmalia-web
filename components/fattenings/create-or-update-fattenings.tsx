import { GetAnimalsAPI } from '@/api-site/animals';
import { CreateOrUpdateOneFatteningAPI } from '@/api-site/fattenings';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { TextInput } from '@/components/ui-setting/shadcn';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FatteningsModel } from '@/types/fattening';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  //animals: yup.array().required(),
  actualWeight: yup.number().optional(),
});

const CreateOrUpdateFattenings = ({
  showModal,
  setShowModal,
  fattening,
}: {
  showModal: boolean;
  setShowModal: any;
  fattening?: any;
}) => {
  const {
    control,
    errors,
    setValue,
    handleSubmit,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
    register,
  } = useReactHookForm({ schema });
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);

  useEffect(() => {
    if (fattening) {
      const fields = ['animals', 'actualWeight'];
      fields?.forEach((field: any) => setValue(field, fattening[field]));
    }
  }, [fattening, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneFatteningAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<FatteningsModel> = async (
    payload: FatteningsModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        fatteningId: fattening?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Fattening saved successfully',
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
  } = GetAnimalsAPI({
    take: 10,
    sort: 'desc',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    productionPhase: 'GROWTH',
    animalTypeId: animalTypeId,
  });

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

                {!fattening?.id ? (
                  <div className="mb-4 w-full mt-2">
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
                            <ErrorFile description="Don't have animals in growth phase yet please add" />
                          ) : (
                            dataAnimals?.pages
                              .flatMap((page: any) => page?.data?.value)
                              .map((item, index) => (
                                <>
                                  <div key={index}>
                                    <label
                                      htmlFor={item?.id}
                                      className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
                                    >
                                      <div className="flex items-center">
                                        &#8203;
                                        <input
                                          type="checkbox"
                                          className="size-4 rounded cursor-pointer border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-900"
                                          id={item?.id}
                                          {...register('animals')}
                                          value={item?.code}
                                        />
                                      </div>

                                      <div>
                                        <strong className="font-medium text-gray-900 dark:text-white">
                                          {item?.code}
                                        </strong>
                                      </div>
                                    </label>
                                  </div>
                                </>
                              ))
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                ) : null}

                {fattening.id ? (
                  <div className="mb-4">
                    <TextInput
                      label="Actual weight"
                      control={control}
                      type="number"
                      name="actualWeight"
                      placeholder="Give a number"
                      errors={errors}
                    />
                  </div>
                ) : null}
                <div className="mt-4 flex items-center space-x-4">
                  <ButtonInput
                    type="button"
                    className="w-full"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </ButtonInput>
                  <ButtonInput
                    type="submit"
                    className="w-full"
                    variant="primary"
                    disabled={loading}
                    loading={loading}
                  >
                    Save
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

export { CreateOrUpdateFattenings };
