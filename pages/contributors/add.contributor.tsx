import { CreateBulkAnimalsAPI } from '@/api-site/animals';
import { GetBreedsAPI } from '@/api-site/breed';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { SelectInput } from '@/components/ui-setting/shadcn';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AnimalModel } from '@/types/animal';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import * as yup from 'yup';

const schema = yup.object({
  codeMother: yup.string().optional(),
  codeFather: yup.string().optional(),
  birthday: yup.string().optional(),
  breedName: yup.string().optional(),
  locationCode: yup.string().optional(),
  number: yup.number().required('number is a required field'),
  weight: yup.number().required('weight is a required field'),
  gender: yup.string().required('gender is a required field'),
  productionPhase: yup.string().required('productionPhase is a required field'),
});

const AddContributor = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
  animal?: any;
}) => {
  const {
    t,
    control,
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

  // Create
  const { mutateAsync: saveMutation } = CreateBulkAnimalsAPI({
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
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Animals created successfully',
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
    isLoading: isLoadingBreeds,
    isError: isErrorBreeds,
    data: dataBreeds,
  } = GetBreedsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
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

                <div>
                  <Label>
                    Email<span className="text-red-600">*</span>
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

                <div className="my-2">
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
                                    <SelectItem key={index} value={item?.name}>
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

export { AddContributor };
