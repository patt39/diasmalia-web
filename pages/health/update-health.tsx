import { UpdateHealthAPI } from '@/api-site/health';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { TextAreaInput, TextInput } from '@/components/ui-setting/shadcn';
import { Label } from '@/components/ui/label';
import { HealthsModel } from '@/types/treatments';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { UploadOutlined } from '@ant-design/icons';
import { Avatar, GetProp, Upload, UploadProps } from 'antd';
import { XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    AlertDangerNotification({
      text: 'You can only upload JPG/PNG file!',
    });
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    AlertDangerNotification({
      text: 'Image must smaller than 2MB!',
    });
  }
  return isJpgOrPng && isLt2M;
};

const schema = yup.object();

const UpdateHealth = ({
  showModal,
  setShowModal,
  health,
}: {
  showModal: boolean;
  setShowModal: any;
  health?: any;
}) => {
  const {
    t,
    control,
    handleSubmit,
    errors,
    hasErrors,
    setHasErrors,
    setValue,
  } = useReactHookForm({ schema });
  const [imageUrl, setImageUrl] = useState<string>(health?.image);
  const [image, setImage] = useState<any>();

  useEffect(() => {
    if (health) {
      const fields = ['name', 'description'];
      fields?.forEach((field: any) => setValue(field, health[field]));
    }
  }, [health, setValue]);

  // Create
  const { isPending: loading, mutateAsync: saveMutation } = UpdateHealthAPI();

  const onSubmit: SubmitHandler<HealthsModel> = async (
    payload: HealthsModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        image,
        healthId: health?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Health updated successfully',
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

  const handleChange: UploadProps['onChange'] = (info) => {
    const { file } = info;
    if (['done', 'error'].includes(String(file?.status))) {
      getBase64(file?.originFileObj as FileType, (url) => {
        setImageUrl(url as any);
        setImage(file?.originFileObj);
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

                <div className="mt-4">
                  <Controller
                    name="image"
                    control={control}
                    render={({}) => (
                      <>
                        <div className="mx-auto justify-center text-center">
                          <Upload
                            name="attachment"
                            listType="picture-card"
                            showUploadList={false}
                            onChange={handleChange}
                            beforeUpload={beforeUpload}
                            accept=".png,.jpg,.jpeg,.gif"
                            maxCount={1}
                          >
                            {imageUrl ? (
                              <Avatar
                                size={100}
                                shape="square"
                                src={imageUrl}
                              />
                            ) : (
                              <div className="text-center text-black dark:text-white">
                                <UploadOutlined />
                                <div style={{ marginTop: 8 }}>Upload image</div>
                              </div>
                            )}
                          </Upload>
                        </div>
                      </>
                    )}
                  />
                </div>
                <div className="mb-4">
                  <Label> Medication</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="name"
                    errors={errors}
                  />
                </div>
                <div className="mb-4">
                  <TextAreaInput
                    control={control}
                    label="Description"
                    name="description"
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

export { UpdateHealth };
