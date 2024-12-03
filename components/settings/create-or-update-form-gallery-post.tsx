import {
  CreateOrUpdateOnePostGalleryAPI,
  DeleteOneImageAPI,
  GetImagesAPI,
} from '@/api-site/upload';
import { GetUserAPI } from '@/api-site/user';
import { ImagesModel } from '@/types/profile';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { filterImageAndFile } from '@/utils/utils';
import { UploadOutlined } from '@ant-design/icons';
import { Alert, Upload } from 'antd';
import { TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useInputState, useUploadItem } from '../hooks';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput } from '../ui-setting/button-input';

const schema = yup.object();

const CreateOrUpdateFormGalleryImage = () => {
  const { back } = useRouter();
  const { userStorage } = useInputState();
  const { imageList, handleImageChange } = useUploadItem({
    uploadImages: [],
  });
  const { data: getUser } = GetUserAPI({
    userId: userStorage?.userId,
  });

  const { handleSubmit, setLoading, hasErrors, setHasErrors } =
    useReactHookForm({ schema });

  // Create or Update data
  const { isPending: loading, mutateAsync } = CreateOrUpdateOnePostGalleryAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<ImagesModel> = async (data: ImagesModel) => {
    setHasErrors(undefined);
    try {
      const { newImageLists } = filterImageAndFile({
        imageList: imageList,
      });
      const payload = {
        ...data,
        newImageLists,
      };

      await mutateAsync({
        ...payload,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Images saved successfully',
      });
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const { data: dataImages } = GetImagesAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    userCreatedId: getUser?.id,
  });

  const { mutateAsync: deleteMutation } = DeleteOneImageAPI();

  const deleteItem = async (item: any) => {
    try {
      await deleteMutation({ imageId: item?.id });
      AlertSuccessNotification({
        text: 'Image deleted successfully',
      });
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <div className="mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flow-root">
            <div
              className={`overflow-hidden rounded-lg border  border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]`}
            >
              <div className="px-4 py-5">
                <div className="flex-auto justify-center p-2">
                  {hasErrors ? (
                    <div className="mb-4">
                      <Alert message={hasErrors} type="error" showIcon />
                    </div>
                  ) : null}

                  <div className="mt-4 py-2">
                    <div className="mx-auto max-w-max">
                      <Upload
                        multiple
                        name="attachmentImages"
                        listType="picture-card"
                        fileList={imageList}
                        onChange={handleImageChange}
                        accept=".png,.jpg,.jpeg,.gif"
                        maxCount={10}
                      >
                        {imageList.length >= 10 ? null : (
                          <div className="text-center dark:text-white">
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Upload image</div>
                          </div>
                        )}
                      </Upload>
                    </div>
                  </div>
                  {Number(dataImages?.pages[0]?.data?.total) <= 0 ? (
                    <h2 className="text-base text-center font-bold">
                      Ajouter des images d'illustration pour faire votre
                      publicité
                    </h2>
                  ) : (
                    <div className="flex flex-wrap sm:justify-start md:justify-center lg:justify-between">
                      {dataImages?.pages
                        .flatMap((page: any) => page?.data?.value)
                        .map((item, index) => (
                          <>
                            <div className="py-8 px-10" key={index}>
                              <Image
                                height={300}
                                width={300}
                                className="flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-blue-500 text-white rounded shadow"
                                src={`${item?.link}`}
                                alt="https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-2.jpg"
                              />
                              <div className="items-center justify-items-center cursor-pointer">
                                <TrashIcon
                                  className="size-4 mt-4  text-red-800 hover:text-red-600"
                                  onClick={() => deleteItem(item)}
                                />
                              </div>
                            </div>
                          </>
                        ))}
                    </div>
                  )}

                  <div className="my-4 flex items-center space-x-4">
                    <ButtonInput
                      type="button"
                      className="w-full"
                      size="lg"
                      variant="outline"
                      onClick={() => back()}
                    >
                      Cancel
                    </ButtonInput>
                    <ButtonInput
                      type="submit"
                      className="w-full"
                      size="lg"
                      variant="default"
                      loading={loading}
                    >
                      Save
                    </ButtonInput>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export { CreateOrUpdateFormGalleryImage };
