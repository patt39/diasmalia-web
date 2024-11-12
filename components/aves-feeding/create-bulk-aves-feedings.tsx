import { GetAnimalsAPI } from '@/api-site/animals';
import { GetFeedStockAPI } from '@/api-site/feed-stock';
import { CreateOneFeedingAPI } from '@/api-site/feedings';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput, ButtonLoadMore } from '@/components/ui-setting';
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
import { FeedingsPostModel } from '@/types/feeding';
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
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const schema = yup.object({
  animals: yup.array().optional(),
  quantity: yup.number().required('quantity is required'),
  feedStockId: yup.string().required('feed type is required'),
});

const CreateBulkAvesFeedings = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
  feeding?: any;
}) => {
  const { t, watch, control, handleSubmit, errors, hasErrors, setHasErrors } =
    useReactHookForm({ schema });
  const { ref, inView } = useInView();
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);
  const selectedAnimals = watch('animals', []);
  const countSelectedAnimals = selectedAnimals?.length;

  // Create
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOneFeedingAPI();

  const onSubmit: SubmitHandler<FeedingsPostModel> = async (
    payload: FeedingsPostModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
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
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetAnimalsAPI({
    take: 10,
    sort: 'desc',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    animalTypeId: animalTypeId,
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
              <div className="justify-start">
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
              <div className="mx-auto">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        {t.formatMessage({ id: 'WHAT.TODO' })}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="dark:border-gray-800">
                      <p>{t.formatMessage({ id: 'FEEDING.WHATODO' })}</p>
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
                <div className="mb-2">
                  <Label>
                    Sélectionner les bandes à nourrir
                    <span className="text-red-600">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="select band codes" />
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
                                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow"
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
                                          <Label>{item?.code}</Label>
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
                          <SelectValue placeholder="select feed type" />
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
                    {t.formatMessage({ id: 'FEED.TYPE' })}(kg)
                    <span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="number"
                    name="quantity"
                    placeholder="quantity"
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

export { CreateBulkAvesFeedings };
