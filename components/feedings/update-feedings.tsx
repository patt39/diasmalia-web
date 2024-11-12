import { GetAnimalsAPI } from '@/api-site/animals';
import { GetFeedStockAPI } from '@/api-site/feed-stock';
import { UpdateOneFeedingAPI } from '@/api-site/feedings';
import { useInputState, useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import { Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { TextInput } from '../ui-setting/shadcn';
import { Label } from '../ui/label';

const schema = yup.object({
  animals: yup.array().optional(),
  quantity: yup.number().required('quantity is required'),
  feedStockId: yup.string().required('feed type is required'),
});

const UpdateFeedings = ({
  showModal,
  setShowModal,
  feeding,
}: {
  showModal: boolean;
  setShowModal: any;
  feeding?: any;
}) => {
  const { t, control, errors, hasErrors, handleSubmit, setHasErrors } =
    useReactHookForm({ schema });
  const { query } = useRouter();
  const { userStorage } = useInputState();
  const animalTypeId = String(query?.animalTypeId);

  //Update data
  const { isPending: loading, mutateAsync: saveMutation } =
    UpdateOneFeedingAPI();

  const onSubmit: SubmitHandler<FeedingsModel> = async (
    payload: FeedingsModel,
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

                <div className="mb-4 flex items-center space-x-4">
                  <div className="w-80">
                    <Label>Code</Label>
                    <Controller
                      control={control}
                      name="code"
                      render={({ field: { value, onChange } }) => (
                        <Select
                          onValueChange={onChange}
                          name={'code'}
                          value={value}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={`${feeding?.animal?.code}`}
                            />
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
                                      <SelectItem
                                        key={index}
                                        value={item?.code}
                                      >
                                        {item?.code}
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
                  <div className="w-80">
                    <Label>{t.formatMessage({ id: 'FEED.QUANTITY' })}(g)</Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="quantity"
                      defaultValue={`${feeding?.quantity}`}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <Label>
                    {t.formatMessage({ id: 'TABFEEDING.FEEDTYPE' })}
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
                          <SelectValue
                            placeholder={`${feeding?.feedStock?.feedCategory}`}
                          />
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

export { UpdateFeedings };
