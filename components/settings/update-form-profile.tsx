import { UpdateOneProfileAPI } from '@/api-site/profile';
import { ProfileFormModel } from '@/types/profile';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { UploadOutlined } from '@ant-design/icons';
import { Avatar, GetProp, Upload, UploadProps } from 'antd';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { SelectSearchInput } from '../ui-setting/ant';
import { ButtonInput } from '../ui-setting/button-input';
import { TextAreaInput, TextInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription } from '../ui/alert';

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

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
  city: yup.string().required('city is a required field'),
  address: yup.string().required('address is a required field'),
  occupation: yup.string().required('occupation is a required field'),
  currencyId: yup.string().required('currency is a required field'),
  countryId: yup.string().required('country is a required field'),
});

const UpdateFormProfile = ({
  profile,
  currencies,
  countries,
}: {
  profile: any;
  countries: any;
  currencies: any;
}) => {
  const [imageUrl, setImageUrl] = useState<string>(profile?.photo);
  const [image, setImage] = useState<any>();
  const { control, setValue, handleSubmit, errors, hasErrors, setHasErrors } =
    useReactHookForm({ schema });

  useEffect(() => {
    if (profile) {
      const fields = [
        'currencyId',
        'countryId',
        'phone',
        'city',
        'address',
        'occupation',
        'firstName',
        'lastName',
        'description',
      ];
      fields?.forEach((field: any) => setValue(field, profile[field]));
    }
  }, [profile, setValue]);

  const { isPending: loading, mutateAsync: saveMutation } =
    UpdateOneProfileAPI();

  const onSubmit: SubmitHandler<ProfileFormModel> = async (
    data: ProfileFormModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...data,
        image,
        profileId: profile?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: `Information saved successfully`,
      });
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
          <div className="px-4 py-5">
            <h2 className="text-base font-bold"> Profile </h2>

            {hasErrors && (
              <Alert
                variant="destructive"
                className="mb-4 bg-red-600 text-center"
              >
                <AlertDescription className="text-white">
                  {hasErrors}
                </AlertDescription>
              </Alert>
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
                        listType="picture-circle"
                        className="avatar-uploader"
                        showUploadList={false}
                        onChange={handleChange}
                        beforeUpload={beforeUpload}
                        accept=".png,.jpg,.jpeg,.gif"
                        maxCount={1}
                      >
                        {imageUrl ? (
                          <Avatar
                            size={100}
                            shape="circle"
                            src={imageUrl}
                            alt={`${profile?.firstName} ${profile?.lastName}`}
                          />
                        ) : (
                          <div className="text-center text-black dark:text-white">
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Profile</div>
                          </div>
                        )}
                      </Upload>
                    </div>
                  </>
                )}
              />
            </div>
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
              <div className="mt-2">
                <TextInput
                  label="First name"
                  control={control}
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  errors={errors}
                />
              </div>
              <div className="mt-2">
                <TextInput
                  label="Last name"
                  control={control}
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  errors={errors}
                />
              </div>
              <div className="mt-2">
                <TextInput
                  label="Phone"
                  control={control}
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  errors={errors}
                />
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
              <div className="mt-2">
                <TextInput
                  label="Address"
                  control={control}
                  type="text"
                  name="address"
                  placeholder="address"
                  errors={errors}
                />
              </div>
              <div className="mt-2">
                <TextInput
                  label="City"
                  control={control}
                  type="text"
                  name="city"
                  placeholder="city"
                  errors={errors}
                />
              </div>
              <div className="mt-2">
                <TextInput
                  label="Occupation"
                  control={control}
                  type="text"
                  name="occupation"
                  placeholder="role"
                  errors={errors}
                />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <div className="mt-2">
                <SelectSearchInput
                  label="Counties"
                  firstOptionName="Country"
                  valueType="key"
                  control={control}
                  errors={errors}
                  placeholder="Country"
                  defaultValue={`${profile?.country?.name}`}
                  name="countryId"
                  dataItem={[
                    {
                      id: 'dd7dbc74-ce9d-49f2-83cb-77cc7325de52',
                      name: 'Cameroon',
                    },
                    {
                      id: '1240315b-305e-4bf3-ae67-3abe8eba853b',
                      name: 'Morocco',
                    },
                  ]}
                />
              </div>
              <div className="mt-2">
                <SelectSearchInput
                  label="Payment currency"
                  firstOptionName="Currency"
                  valueType="key"
                  control={control}
                  errors={errors}
                  placeholder="Currency"
                  name="currencyId"
                  defaultValue={`${profile?.currency?.name}`}
                  dataItem={[
                    {
                      id: 'd55d5409-9779-4ba8-87dc-f29e1ed7b8fd',
                      name: 'Central African CFA Franc',
                    },
                    {
                      id: '11d03330-9c69-4b5d-b337-fbe71fe9a942',
                      name: 'West African CFA Franc',
                    },
                  ]}
                />
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5">
              <div className="mt-2">
                <TextAreaInput
                  control={control}
                  label="Bio"
                  name="description"
                  placeholder="Introduce yourself and what you're creating"
                  errors={errors}
                />
              </div>
            </div>
            <div className="mb-2 mt-4 flex items-center space-x-4">
              <ButtonInput
                size="lg"
                type="submit"
                variant="default"
                className="w-full"
                loading={loading}
              >
                Save changes
              </ButtonInput>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { UpdateFormProfile };
