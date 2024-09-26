import { GetAssignedTypesAPI } from '@/api-site/assigned-type';
import { CreateOrUpdateOneFeedStockAPI } from '@/api-site/feed-stock';
import { useInputState, useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { SelectInput, TextInput } from '@/components/ui-setting/shadcn';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FeedStockModel } from '@/types/feeding';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  feedCategory: yup.string().required('feedCategory is required'),
  animalTypeId: yup.string().required('animalTypeId is required'),
  number: yup.number().required('quantity is a required field'),
  bagWeight: yup.number().required('bagWeight is a required field'),
});

const CreateOrUpdateFeedStock = ({
  showModal,
  setShowModal,
  feedStock,
}: {
  showModal: boolean;
  setShowModal: any;
  feedStock?: any;
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
  } = useReactHookForm({ schema });
  const { t } = useInputState();

  useEffect(() => {
    if (feedStock) {
      const fields = ['feedCategory', 'animalTypeId', 'number', 'bagWeight'];
      fields?.forEach((field: any) => setValue(field, feedStock[field]));
    }
  }, [feedStock, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneFeedStockAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<FeedStockModel> = async (
    payload: FeedStockModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        feedStockId: feedStock?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Feed stock saved successfully',
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
    isLoading: isLoadingAssignedTypes,
    isError: isErrorAssignedTypes,
    data: dataAssignedTypes,
  } = GetAssignedTypesAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
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
                {!feedStock?.id ? (
                  <>
                    <div className="my-2 items-center">
                      <Label>
                        {t.formatMessage({ id: 'SELECT.ANIMALTYPE' })}
                        <span className="text-red-600">*</span>
                      </Label>
                      <Controller
                        control={control}
                        name="animalTypeId"
                        render={({ field: { value, onChange } }) => (
                          <Select
                            onValueChange={onChange}
                            name={'animalTypeId'}
                            value={value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select animal type" />
                            </SelectTrigger>
                            <SelectContent className="dark:border-gray-800">
                              <SelectGroup>
                                {isLoadingAssignedTypes ? (
                                  <LoadingFile />
                                ) : isErrorAssignedTypes ? (
                                  <ErrorFile
                                    title="404"
                                    description="Error finding data please try again..."
                                  />
                                ) : Number(
                                    dataAssignedTypes?.pages[0]?.data?.total,
                                  ) <= 0 ? (
                                  <ErrorFile description="Don't have location codes" />
                                ) : (
                                  dataAssignedTypes?.pages
                                    .flatMap((page: any) => page?.data?.value)
                                    .map((item, index) => (
                                      <>
                                        <SelectItem
                                          key={index}
                                          value={item?.animalType?.id}
                                        >
                                          {item?.animalType?.name}
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
                  </>
                ) : (
                  ''
                )}
                <div className="mb-2">
                  <Label>
                    {t.formatMessage({ id: 'FEED.TYPE' })}
                    <span className="text-red-600">*</span>
                  </Label>
                  <SelectInput
                    firstOptionName="Choose a transaction type"
                    control={control}
                    errors={errors}
                    placeholder="Select type"
                    valueType="text"
                    name="feedCategory"
                    dataItem={[
                      { id: 1, name: 'PRESTARTER' },
                      { id: 2, name: 'STARTER' },
                      { id: 3, name: 'GROWER' },
                      { id: 4, name: 'FATTENER' },
                      { id: 5, name: 'FINISHER' },
                      { id: 6, name: 'FORAGES' },
                      { id: 7, name: 'SILAGES' },
                      { id: 8, name: 'BYPRODUCTS' },
                      { id: 9, name: 'COMPLETEFEED' },
                      { id: 10, name: 'CONCENTRATES' },
                      { id: 11, name: 'LAYER_FEED' },
                      { id: 12, name: 'LACTATING_FEMALES' },
                      { id: 13, name: 'GESTATION_FEMALES' },
                      { id: 14, name: 'OTHER' },
                    ]}
                  />
                </div>
                <div className="mb-2">
                  <Label>
                    {t.formatMessage({ id: 'NUMBER.BAGS' })}
                    <span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="number"
                    name="number"
                    placeholder="Give an amount"
                    errors={errors}
                  />
                </div>
                <Label>
                  {t.formatMessage({ id: 'UNIT.WEIGHT' })}
                  <span className="text-red-600">*</span>(kg)
                </Label>
                <div className="mb-2">
                  <TextInput
                    control={control}
                    type="number"
                    name="bagWeight"
                    placeholder="Give an amount"
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

export { CreateOrUpdateFeedStock };
