import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { GetAnimalsAPI } from '@/api-site/animals';
import { CreateOrUpdateAvesSaleAPI } from '@/api-site/sales';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput, ButtonLoadMore } from '@/components/ui-setting';
import { SelectInput, TextInput } from '@/components/ui-setting/shadcn';
import { SalesModel } from '@/types/sale';
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
  code: yup.string().optional(),
  phone: yup.string().optional(),
  email: yup.string().optional(),
  address: yup.string().optional(),
  soldTo: yup.string().optional(),
  male: yup.number().optional(),
  female: yup.number().optional(),
  number: yup.number().optional(),
  detail: yup.string().optional(),
  price: yup.number().required('price is required'),
  method: yup.string().required('method is required'),
});

const CreateOrUpdateAvesSales = ({
  showModal,
  setShowModal,
  sale,
}: {
  showModal: boolean;
  setShowModal: any;
  sale?: any;
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
    if (sale) {
      const fields = [
        'code',
        'address',
        'phone',
        'email',
        'detail',
        'price',
        'soldTo',
        'method',
        'number',
      ];
      fields?.forEach((field: any) => setValue(field, sale[field]));
    }
  }, [sale, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateAvesSaleAPI({
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
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetAnimalsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    status: 'ACTIVE',
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
                {!sale?.id ? (
                  <div className="mb-2 items-center space-x-2">
                    <Label>
                      Code de la bande:<span className="text-red-600">*</span>
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
                            <SelectValue placeholder="Select a band code" />
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
                  </div>
                ) : (
                  ''
                )}
                {animalType.name === 'Poulet de chair' ? (
                  ''
                ) : (
                  <div className="mb-2">
                    <Label>
                      Choisissez un détail de vente:
                      <span className="text-red-600">*</span>
                    </Label>
                    <SelectInput
                      firstOptionName="Choose selling detail"
                      control={control}
                      errors={errors}
                      placeholder="Select a detail"
                      valueType="text"
                      name="detail"
                      dataItem={[
                        { id: 1, name: 'EGGS' },
                        { id: 2, name: 'CHICKS' },
                        { id: 3, name: 'CHICKENS' },
                      ]}
                    />
                  </div>
                )}
                {animalType.name === 'Poulet de chair' ? (
                  <div className="mb-2 flex items-center space-x-2">
                    <Label>
                      Nombre:<span className="text-red-600">*</span>
                    </Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="number"
                      placeholder="Give a number"
                      errors={errors}
                    />
                    <Label>
                      Prix:<span className="text-red-600">*</span>
                    </Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="price"
                      placeholder="Give a price"
                      errors={errors}
                    />
                  </div>
                ) : (
                  <div className="my-2 flex items-center space-x-1">
                    <div className="pr-10">
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
                    <div className="pl-10">
                      <Label>
                        Prix:<span className="text-red-600">*</span>
                      </Label>
                      <TextInput
                        control={control}
                        type="number"
                        name="price"
                        placeholder="Give a price"
                        errors={errors}
                      />
                    </div>
                  </div>
                )}

                <div className="mb-2 items-center space-x-1">
                  <Label>Nom du client:</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="soldTo"
                    placeholder="Customer name"
                    errors={errors}
                  />
                </div>
                <div className="mb-2 items-center space-x-1">
                  <Label>Email:</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="email"
                    placeholder="Customer email"
                    errors={errors}
                  />
                </div>
                <div className="mb-2 items-center space-x-1">
                  <Label>Téléphone:</Label>
                  <TextInput
                    control={control}
                    type="number"
                    name="phone"
                    placeholder="Customer phone number"
                    errors={errors}
                  />
                </div>
                <div className="mb-2 items-center space-x-1">
                  <Label>Address:</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="address"
                    placeholder="Customer address"
                    errors={errors}
                  />
                </div>
                <Label>Canal de vente:</Label>
                <span className="text-red-600">*</span>
                <div className="mb-4 flex items-center space-x-1">
                  <SelectInput
                    firstOptionName="Choose a sale method"
                    control={control}
                    errors={errors}
                    placeholder="Select the selling method"
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

export { CreateOrUpdateAvesSales };