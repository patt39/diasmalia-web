import { GetAnimalsAPI } from '@/api-site/animals';
import { CreateOrUpdateOneSaleAPI } from '@/api-site/sales';
import { useInputState, useReactHookForm } from '@/components/hooks';
import {
  ButtonInput,
  ButtonLoadMore,
  SearchInput,
} from '@/components/ui-setting';
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
import { FileQuestion, XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import * as yup from 'yup';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

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
  const { search, handleSetSearch } = useInputState();
  const { query } = useRouter();
  const { ref, inView } = useInView();
  const selectedAnimals = watch('animals', '');
  const animalTypeId = String(query?.animalTypeId);
  const countSelectedAnimals = selectedAnimals.length;

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
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOrUpdateOneSaleAPI();

  const onSubmit: SubmitHandler<SalesModel> = async (payload: SalesModel) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        saleId: sale?.id,
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
            <div className="flex mb-0">
              <div className="mr-auto">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        {countSelectedAnimals || 0}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="dark:border-gray-800">
                      <p>
                        {countSelectedAnimals}
                        {t.formatMessage({ id: 'ANIMAL.SELECTED.COUNT' })}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="justify-end">
                <button
                  className="float-right border-0 bg-transparent text-black"
                  onClick={() => setShowModal(false)}
                >
                  <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                    <XIcon />
                  </span>
                </button>
              </div>
            </div>
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

                {!sale?.id ? (
                  <div className="flex mb-4 w-full items-center mt-2">
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
                          ) : Number(dataAnimals?.pages[0]?.data?.total) <=
                            0 ? (
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
                                              {item?.code}{' '}
                                              {item?.productionPhase}
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
                ) : null}

                <div className="mb-4 flex items-center space-x-1">
                  <Label>Client:</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="soldTo"
                    placeholder="customer name"
                    errors={errors}
                  />
                </div>
                <div className="mb-4 flex items-center space-x-1">
                  <Label>Email:</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="email"
                    placeholder="customer email"
                    errors={errors}
                  />
                </div>
                <div className="mb-4 flex items-center space-x-1">
                  <Label>Address:</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="address"
                    placeholder="customer address"
                    errors={errors}
                  />
                </div>
                <div className="mb-4 flex items-center space-x-2">
                  <Label>
                    Prix:<span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="number"
                    name="price"
                    placeholder="price"
                    errors={errors}
                  />
                  <Label>Phone:</Label>
                  <TextInput
                    control={control}
                    type="number"
                    name="phone"
                    placeholder="customer phone number"
                    errors={errors}
                  />
                </div>
                <Label>Canal de vente:</Label>
                <span className="text-red-600">*</span>
                <div className="mb-4 flex items-center space-x-1">
                  <SelectInput
                    control={control}
                    errors={errors}
                    placeholder="selling method"
                    valueType="text"
                    name="method"
                    dataItem={sellingMethods.filter((i) => i?.lang === locale)}
                  />
                </div>
                <div className="mb-4">
                  <TextAreaInput
                    control={control}
                    label="Détails de la vente"
                    name="note"
                    placeholder="details about animals and client"
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

export { CreateOrUpdateSales };
