import { GetFeedStockAPI } from '@/api-site/feed-stock';
import { CreateOrUpdateOneAvesFeedingAPI } from '@/api-site/feedings';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { TextInput } from '@/components/ui-setting/shadcn';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FeedingAvesModel } from '@/types/feeding';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { Label } from '../ui/label';

const schema = yup.object({
  quantity: yup.number().required('quantity is a required field'),
  feedStockId: yup.string().required('feedStockId is a required field'),
});

const CreateOrUpdateAvesFeedings = ({
  showModal,
  setShowModal,
  feeding,
  animal,
}: {
  showModal: boolean;
  setShowModal: any;
  feeding?: any;
  animal?: any;
}) => {
  const {
    t,
    control,
    setValue,
    handleSubmit,
    errors,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);

  useEffect(() => {
    if (feeding) {
      const fields = ['code', 'quantity', 'feedStockId'];
      fields?.forEach((field: any) => setValue(field, feeding[field]));
    }
  }, [feeding, setValue]);

  useEffect(() => {
    if (animal) {
      const fields = ['code'];
      fields?.forEach((field: any) => setValue(field, animal[field]));
    }
  }, [animal, setValue]);

  // Create or Update data
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOrUpdateOneAvesFeedingAPI();

  const onSubmit: SubmitHandler<FeedingAvesModel> = async (
    payload: FeedingAvesModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        feedingId: feeding?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Feeding saved successfully',
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
    isLoading: isLoadingFeedStock,
    isError: isErrorFeedStock,
    data: dataFeedStock,
  } = GetFeedStockAPI({
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
                <div className="mb-2">
                  <Label>
                    {t.formatMessage({ id: 'SELECT.FEEDTYPE' })}
                    <span className="text-red-600">*</span>
                  </Label>
                  <Controller
                    control={control}
                    name="feedStockId"
                    render={({ field: { value, onChange } }) => (
                      <Select
                        onValueChange={onChange}
                        name={'feedStockId'}
                        value={value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select feed type" />
                        </SelectTrigger>
                        <SelectContent className="dark:border-gray-800">
                          <SelectGroup>
                            {isLoadingFeedStock ? (
                              <LoadingFile />
                            ) : isErrorFeedStock ? (
                              <ErrorFile
                                title="404"
                                description="Error finding data please try again..."
                              />
                            ) : Number(dataFeedStock?.pages[0]?.data?.total) <=
                              0 ? (
                              <ErrorFile description="Don't have active animals yet" />
                            ) : (
                              dataFeedStock?.pages
                                .flatMap((page: any) => page?.data?.value)
                                .map((item, index) => (
                                  <>
                                    <SelectItem key={index} value={item?.id}>
                                      {item?.feedCategory}
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
                <div className="mb-2">
                  <Label>
                    {t.formatMessage({ id: 'FEED.TYPE' })}(g)
                    <span className="text-red-600">*</span>
                  </Label>
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

export { CreateOrUpdateAvesFeedings };
