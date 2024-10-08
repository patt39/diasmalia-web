import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { GetAnimalsAPI } from '@/api-site/animals';
import { CreateOrUpdateAvesSaleAPI } from '@/api-site/sales';
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
import { Label } from '../ui/label';

const schema = yup.object({
  code: yup.string().optional(),
  note: yup.string().optional(),
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

const CreateAvesSales = ({
  showModal,
  setShowModal,
  sale,
  animal,
}: {
  showModal: boolean;
  setShowModal: any;
  sale?: any;
  animal?: any;
}) => {
  const {
    t,
    watch,
    control,
    handleSubmit,
    errors,
    loading,
    setValue,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const watchDetail = watch('detail');
  const watchSaleCanale = watch('method');
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);
  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: animalTypeId,
  });

  // Create
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

  useEffect(() => {
    if (animal) {
      const fields = ['code'];
      fields?.forEach((field: any) => setValue(field, animal[field]));
    }
  }, [animal, setValue]);

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
    sort: 'desc',
    sortBy: 'createdAt',
    status: 'ACTIVE',
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
                {!sale?.id ? (
                  <div className="items-center">
                    <Label>{t.formatMessage({ id: 'ANIMAL.CODE' })}</Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="code"
                      placeholder="Give a code"
                      errors={errors}
                    />
                  </div>
                ) : (
                  ''
                )}
                {['Pisciculture'].includes(animalType?.name) ? (
                  ''
                ) : animalType?.name === 'Pondeuses' ? (
                  <div className="my-2">
                    <Label>
                      Choisissez un détail de vente
                      <span className="text-red-600">*</span>
                    </Label>
                    <SelectInput
                      className="cursor-pointer"
                      firstOptionName="Choose selling detail"
                      control={control}
                      errors={errors}
                      placeholder="Select a detail"
                      valueType="text"
                      name="detail"
                      dataItem={[
                        { id: 1, name: 'EGGS' },
                        { id: 2, name: 'CHICKENS' },
                      ]}
                    />
                  </div>
                ) : (
                  <div className="my-2">
                    <Label>
                      Choisissez un détail de vente
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
                {['Pisciculture'].includes(animalType?.name) ? (
                  <div className="mb-2 flex items-center space-x-1">
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
                      {t.formatMessage({ id: 'SALE.PRICE' })}:
                      <span className="text-red-600">*</span>
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
                  <div className="flex justify-center">
                    {['EGGS', 'CHICKS', 'CHICKENS'].includes(watchDetail) &&
                    ['Pondeuses', 'Poulet de chair'].includes(
                      animalType?.name,
                    ) ? (
                      <div className="flex space-x-8">
                        <div>
                          <Label>
                            Nombre<span className="text-red-600">*</span>
                          </Label>
                          <TextInput
                            control={control}
                            type="number"
                            name="number"
                            placeholder="Give a number"
                            errors={errors}
                          />
                        </div>
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'SALE.PRICE' })}
                            <span className="text-red-600">*</span>
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
                    ) : ['EGGS', 'CHICKS'].includes(watchDetail) ? (
                      <div className="flex space-x-8">
                        <div>
                          <Label>
                            Nombre<span className="text-red-600">*</span>
                          </Label>
                          <TextInput
                            control={control}
                            type="number"
                            name="number"
                            placeholder="Give a number"
                            errors={errors}
                          />
                        </div>
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'SALE.PRICE' })}
                            <span className="text-red-600">*</span>
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
                    ) : (
                      <div className="flex items-center space-x-16">
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'ANIMAL.MALE' })}
                            <span className="text-red-600">*</span>
                          </Label>
                          <TextInput
                            control={control}
                            type="number"
                            name="male"
                            defaultValue="0"
                            placeholder="Number of males"
                            errors={errors}
                          />
                        </div>
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'ANIMAL.FEMALE' })}
                            <span className="text-red-600">*</span>
                          </Label>
                          <TextInput
                            control={control}
                            type="number"
                            name="female"
                            defaultValue="0"
                            placeholder="Number of females"
                            errors={errors}
                          />
                        </div>
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'SALE.PRICE' })}
                            <span className="text-red-600">*</span>
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
                  </div>
                )}

                <div className="my-2 items-center">
                  <Label>Nom du client</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="soldTo"
                    placeholder="Customer name"
                    errors={errors}
                  />
                </div>
                <div className="my-2 items-center">
                  <Label>Email</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="email"
                    placeholder="Customer email"
                    errors={errors}
                  />
                </div>
                <div className="my-2 items-center">
                  <Label>Téléphone</Label>
                  <TextInput
                    control={control}
                    type="number"
                    name="phone"
                    placeholder="Customer phone number"
                    errors={errors}
                  />
                </div>
                <div className="my-2 items-center">
                  <Label>Address</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="address"
                    placeholder="Customer address"
                    errors={errors}
                  />
                </div>
                <Label>Canal de vente</Label>
                <span className="text-red-600">*</span>
                <div className="mb-4 flex items-center">
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
                      { id: 6, name: 'OTHER' },
                    ]}
                  />
                </div>
                {watchSaleCanale === 'OTHER' ? (
                  <div className="mb-4">
                    <TextAreaInput
                      control={control}
                      label="Details of sale"
                      name="note"
                      placeholder="Give details about animals and client"
                      errors={errors}
                    />
                  </div>
                ) : (
                  ''
                )}
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

export { CreateAvesSales };
