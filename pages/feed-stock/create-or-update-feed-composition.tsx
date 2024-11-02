import { CreateOrUpdateOneFeedStockAPI } from '@/api-site/feed-stock';
import { useInputState, useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { TextInput } from '@/components/ui-setting/shadcn';
import { Label } from '@/components/ui/label';
import { FeedStockPostModel } from '@/types/feeding';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { generateUUID } from '@/utils/utils';
import { XIcon } from 'lucide-react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { FeedCompositionComponent } from './feed-composition-component';

const schema = yup.object({
  type: yup.string().required('feed type is required'),
  percentage: yup.string().required('percentage is required'),
});

const CreateOrUpdateFeedComposition = ({
  showModal,
  setShowModal,
  feedStock,
}: {
  showModal: boolean;
  setShowModal: any;
  feedStock?: any;
}) => {
  const { control, handleSubmit, errors, hasErrors, setHasErrors } =
    useReactHookForm({ schema });
  const { t } = useInputState();

  // Create
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOrUpdateOneFeedStockAPI();

  const onSubmit: SubmitHandler<FeedStockPostModel> = async (
    payload: FeedStockPostModel,
  ) => {
    const { type, percentage } = payload;
    setHasErrors(undefined);
    const data = [
      ...(feedStock?.composition ?? []),
      { id: generateUUID(), type, percentage, createdAt: new Date() },
    ];
    try {
      await saveMutation({
        composition: data,
        feedStockId: feedStock?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Feed stock composition saved successfully',
      });
    } catch (error: any) {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const newItem = feedStock?.composition?.filter(
        (item: any) => item?.id !== id,
      );
      await saveMutation({ feedStockId: feedStock?.id, composition: newItem });
      AlertSuccessNotification({
        text: 'Composition deleted successfully',
      });
    } catch (error: any) {
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
            <div className="mb-4">
              <button
                className=" mb-4 float-right border-0 bg-transparent text-black"
                onClick={() => setShowModal(false)}
              >
                <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                  <XIcon />
                </span>
              </button>
            </div>

            <div className="mt-10">
              {feedStock?.composition?.map((item: any) => (
                <FeedCompositionComponent
                  key={item?.id}
                  item={item}
                  onClick={() => deleteItem(item?.id)}
                />
              ))}
            </div>

            <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
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
                <>
                  <div className="my-2 flex lg:col-span-2 space-x-4 items-center">
                    <div className="w-96">
                      <Label>
                        {t.formatMessage({ id: 'RAW.MATERIAL' })}
                        <span className="text-red-600">*</span>
                      </Label>
                      <TextInput
                        control={control}
                        type="text"
                        name="type"
                        placeholder="Add a raw material"
                        errors={errors}
                      />
                    </div>
                    <div>
                      <Label>
                        {t.formatMessage({ id: 'FEED.QUANTITY' })}
                        <span className="text-red-600">*</span>
                      </Label>
                      <TextInput
                        control={control}
                        type="text"
                        name="percentage"
                        placeholder="Add a value"
                        errors={errors}
                      />
                    </div>
                  </div>
                </>

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

export { CreateOrUpdateFeedComposition };
