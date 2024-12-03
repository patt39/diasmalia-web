import { UpdateSaleAPI } from '@/api-site/sales';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import {
  SelectInput,
  TextAreaInput,
  TextInput,
} from '@/components/ui-setting/shadcn';
import { sellingMethods } from '@/i18n/default-exports';
import { SalesModel } from '@/types/sale';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { Label } from '../../components/ui/label';

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
  price: yup.number().optional(),
  method: yup.string().optional(),
});

const UpdateSales = ({
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
    locale,
    watch,
    control,
    setValue,
    handleSubmit,
    errors,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const watchSaleCanale = watch('method');

  useEffect(() => {
    if (sale) {
      const fields = [
        'code',
        'note',
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

  // Update data
  const { isPending: loading, mutateAsync: saveMutation } = UpdateSaleAPI();

  const onSubmit: SubmitHandler<SalesModel> = async (payload: SalesModel) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        saleId: sale?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Sale updated successfully',
      });
      setShowModal(false);
    } catch (error: any) {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

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
                <div className="flex space-x-4">
                  <div className="w-80">
                    <Label>
                      {t.formatMessage({ id: 'TABINCUBATION.QTYSTART' })}
                    </Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="number"
                      errors={errors}
                    />
                  </div>
                  <div className="w-80">
                    <Label>{t.formatMessage({ id: 'SALE.PRICE' })}</Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="price"
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="my-2 items-center">
                  <Label>{t.formatMessage({ id: 'SALE.CUSTOMER' })}</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="soldTo"
                    errors={errors}
                  />
                </div>
                <div className="my-2 items-center">
                  <Label>Email</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="email"
                    errors={errors}
                  />
                </div>
                <div className="my-2 items-center">
                  <Label>Téléphone</Label>
                  <TextInput
                    control={control}
                    type="number"
                    name="phone"
                    errors={errors}
                  />
                </div>
                <div className="my-2 items-center">
                  <Label>Address</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="address"
                    errors={errors}
                  />
                </div>
                <Label>{t.formatMessage({ id: 'SALE.METHOD' })}</Label>
                <div className="mb-4 items-center">
                  <SelectInput
                    control={control}
                    errors={errors}
                    valueType="key"
                    name="method"
                    dataItem={sellingMethods.filter((i) => i?.lang === locale)}
                  />
                </div>
                {watchSaleCanale === 'OTHER' ? (
                  <div className="mb-4">
                    <TextAreaInput
                      control={control}
                      label="Détail de la vente"
                      name="note"
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

export { UpdateSales };
