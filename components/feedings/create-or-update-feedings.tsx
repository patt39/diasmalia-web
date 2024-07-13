import { GetAnimalsAPI } from '@/api-site/animals';
import { CreateOrUpdateOneFeedingAPI } from '@/api-site/feedings';
import { useInputState, useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FeedingsModel } from '@/types/feeding';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { SelectInput, TextInput } from '../ui-setting/shadcn';

const schema = yup.object({
  animals: yup.array().optional(),
  quantity: yup.number().required('quantity is required'),
  feedType: yup.string().required('feedType is required'),
});

const CreateOrUpdateFeedings = ({
  showModal,
  setShowModal,
  feeding,
}: {
  showModal: boolean;
  setShowModal: any;
  feeding?: any;
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
  const { userStorage } = useInputState();
  const animalTypeId = String(query?.animalTypeId);

  useEffect(() => {
    if (feeding) {
      const fields = ['animals', 'quantity', 'feedType'];
      fields?.forEach((field: any) => setValue(field, feeding[field]));
    }
  }, [feeding, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneFeedingAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<FeedingsModel> = async (
    payload: FeedingsModel,
  ) => {
    console.log(payload);
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        feedingId: feeding?.id,
      });

      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Feeding saved successfully',
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
    animalTypeId: animalTypeId,
    organizationId: userStorage?.organizationId,
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

                <div className="mb-4 flex items-center space-x-4 w-full">
                  {!feeding?.id ? (
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
                              <ErrorFile description="Don't have active animals created yet please do" />
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
                </div>

                <div className="mb-4">
                  <SelectInput
                    firstOptionName="Choose a feed type"
                    control={control}
                    errors={errors}
                    placeholder="Select type"
                    valueType="text"
                    name="feedType"
                    dataItem={[
                      { id: 1, name: 'FIBERS' },
                      { id: 2, name: 'FORAGES' },
                      { id: 3, name: 'PROTEINS' },
                      { id: 4, name: 'VITAMINS' },
                      { id: 5, name: 'ROUGHAGES' },
                      { id: 6, name: 'CONCENTRATES' },
                      { id: 7, name: 'BYPRODUCTS' },
                      { id: 8, name: 'COMPLETEFEED' },
                      { id: 9, name: 'MINERALSALTS' },
                      { id: 10, name: 'ENERGYSUPPLIMENTS' },
                      { id: 11, name: 'SYNTHETICADICTIVES' },
                      { id: 12, name: 'OTHERS' },
                    ]}
                  />
                </div>

                <div className="mb-4">
                  <TextInput
                    control={control}
                    type="number"
                    name="quantity"
                    placeholder="Give a quantity"
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

export { CreateOrUpdateFeedings };