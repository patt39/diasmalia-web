import { GetAnimalsAPI } from '@/api-site/animals';
import { CreateOrUpdateOneSaleAPI } from '@/api-site/sales';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import {
  SelectInput,
  TextAreaInput,
  TextInput,
} from '@/components/ui-setting/shadcn';
import { SalesModel } from '@/types/sale';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const schema = yup.object({
  animals: yup.array().optional(),
  address: yup.string().optional(),
  phone: yup.string().optional(),
  email: yup.string().optional(),
  price: yup.number().required('price is required'),
  soldTo: yup.string().required('Customer name is required'),
  method: yup.string().required('method is required'),
  note: yup.string().required('note is a required field'),
});

const CreateOrUpdateSales = ({
  showModal,
  setShowModal,
  sale,
}: {
  showModal: boolean;
  setShowModal: any;
  sale?: any;
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
    register,
  } = useReactHookForm({ schema });
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);

  useEffect(() => {
    if (sale) {
      const fields = [
        'animals',
        'address',
        'phone',
        'email',
        'note',
        'price',
        'soldTo',
        'method',
      ];
      fields?.forEach((field: any) => setValue(field, sale[field]));
    }
  }, [sale, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneSaleAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<SalesModel> = async (payload: SalesModel) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        saleId: sale?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Sale saved successfully',
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
    sort: 'asc',
    status: 'ACTIVE',
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
                  {!sale?.id ? (
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
                  <TextInput
                    control={control}
                    type="number"
                    name="price"
                    placeholder="Give a price"
                    errors={errors}
                  />
                </div>
                <div className="mb-4">
                  <TextInput
                    control={control}
                    type="text"
                    name="soldTo"
                    placeholder="Customer name"
                    errors={errors}
                  />
                </div>
                <div className="mb-4">
                  <TextInput
                    control={control}
                    type="text"
                    name="email"
                    placeholder="Customer email"
                    errors={errors}
                  />
                </div>
                <div className="mb-4">
                  <TextInput
                    control={control}
                    type="number"
                    name="phone"
                    placeholder="Customer phone number"
                    errors={errors}
                  />
                </div>
                <div className="mb-4">
                  <TextInput
                    control={control}
                    type="text"
                    name="address"
                    placeholder="Customer address"
                    errors={errors}
                  />
                </div>
                <div className="mb-4">
                  <SelectInput
                    firstOptionName="Choose a methos"
                    control={control}
                    errors={errors}
                    placeholder="Select a method"
                    valueType="text"
                    name="method"
                    dataItem={[
                      { id: 1, name: 'FARM' },
                      { id: 2, name: 'MARKET' },
                      { id: 3, name: 'AUCTION' },
                      { id: 4, name: 'CONTRACT' },
                      { id: 5, name: 'SOCIALMEDIA' },
                      { id: 12, name: 'OTHERS' },
                    ]}
                  />
                </div>
                <div className="mb-4">
                  <TextAreaInput
                    control={control}
                    label="Details of sale"
                    name="note"
                    placeholder="Give details about animals and client"
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

export { CreateOrUpdateSales };
