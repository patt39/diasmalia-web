import { GetAnimalsAPI } from '@/api-site/animals';
import { CreateSaleAPI } from '@/api-site/sales';
import { useInputState, useReactHookForm } from '@/components/hooks';
import {
  ButtonInput,
  ButtonLoadMore,
  SearchInput,
} from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import {
  SelectInput,
  TextAreaInput,
  TextInput,
} from '@/components/ui-setting/shadcn';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { sellingMethods } from '@/i18n/default-exports';
import { SalesModel } from '@/types/sale';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { FileQuestion, XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import * as yup from 'yup';

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
  detail: yup.string().required('detail is required'),
  price: yup.number().required('price is required'),
  method: yup.string().required('method is required'),
});

const AddSales = ({
  showModal,
  setShowModal,
  animalTypeId,
}: {
  showModal: boolean;
  setShowModal: any;
  animalTypeId?: any;
}) => {
  const {
    t,
    control,
    handleSubmit,
    errors,
    hasErrors,
    setHasErrors,
    watch,
    locale,
  } = useReactHookForm({ schema });
  const watchSaleCanale = watch('method');
  const { ref, inView } = useInView();
  const { search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingAnimals,
    isError: isErrorAnimals,
    data: dataAnimals,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetAnimalsAPI({
    search,
    take: 10,
    sort: 'desc',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    animalTypeId: animalTypeId,
  });

  // Create or Update data
  const { isPending: loading, mutateAsync: saveMutation } = CreateSaleAPI();

  const onSubmit: SubmitHandler<SalesModel> = async (payload: SalesModel) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Sale saved successfully',
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

                <Label>
                  Select animals<span className="text-red-600">*</span>
                </Label>
                <div className="flex mb-4 w-full items-center">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="select animals" />
                    </SelectTrigger>
                    <SelectContent className="dark:border-gray-800">
                      <div className="mr-auto items-center gap-2">
                        <SearchInput
                          placeholder="Search by code"
                          onChange={handleSetSearch}
                        />
                      </div>
                      <SelectGroup>
                        {isLoadingAnimals ? (
                          <LoadingFile />
                        ) : isErrorAnimals ? (
                          <ErrorFile
                            title="404"
                            description="Error finding data please try again..."
                          />
                        ) : Number(dataAnimals?.pages[0]?.data?.total) <= 0 ? (
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
                                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4"
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
                                          <Label>
                                            {item?.code} {item?.productionPhase}
                                          </Label>
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <FileQuestion />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t.formatMessage({ id: 'CODE.SALES.TOOLTIP' })}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="my-2 items-center">
                  <Label>Nom du client</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="soldTo"
                    placeholder="customer name"
                    errors={errors}
                  />
                </div>
                <div className="flex space-x-4 mt-2">
                  <div className="w-80">
                    <Label>Email</Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="email"
                      placeholder="customer email"
                      errors={errors}
                    />
                  </div>
                  <div className="w-80">
                    <Label>Téléphone</Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="phone"
                      placeholder="customer phone number"
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="my-2 items-center">
                  <Label>Address</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="address"
                    placeholder="customer address"
                    errors={errors}
                  />
                </div>
                <Label>Canal de vente</Label>
                <span className="text-red-600">*</span>
                <div className="mb-4 items-center">
                  <SelectInput
                    control={control}
                    errors={errors}
                    placeholder="selling method"
                    valueType="key"
                    name="method"
                    dataItem={sellingMethods.filter((i) => i?.lang === locale)}
                  />
                </div>
                {watchSaleCanale === 'OTHER' ? (
                  <div className="mb-4">
                    <TextAreaInput
                      control={control}
                      label="Detail de la vente"
                      name="note"
                      placeholder="give details about animals and client"
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

export { AddSales };
