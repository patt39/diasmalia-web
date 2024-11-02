import { UpdateOneContributorAPI } from '@/api-site/contributors';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { TextInput } from '@/components/ui-setting/shadcn';
import { Label } from '@/components/ui/label';
import { ProfileModel } from '@/types/profile';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object();

const UpdateContributor = ({
  showModal,
  setShowModal,
  profile,
  contributor,
}: {
  showModal: boolean;
  setShowModal: any;
  profile?: any;
  contributor?: any;
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

  useEffect(() => {
    if (profile) {
      const fields = [
        'phone',
        'occupation',
        'lastName',
        'firstName',
        'address',
        'city',
        'countryId',
        'currencyId',
      ];
      fields?.forEach((field: any) => setValue(field, profile[field]));
    }
  }, [profile, setValue]);

  useEffect(() => {
    if (contributor?.user) {
      const fields = ['email'];
      fields?.forEach((field: any) =>
        setValue(field, contributor?.user[field]),
      );
    }
  }, [contributor?.user, setValue]);

  useEffect(() => {
    if (contributor) {
      const fields = ['role'];
      fields?.forEach((field: any) => setValue(field, contributor[field]));
    }
  }, [contributor, setValue]);

  // Update data
  const { isPending: loading, mutateAsync: saveMutation } =
    UpdateOneContributorAPI();

  const onSubmit: SubmitHandler<ProfileModel> = async (
    payload: ProfileModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        profileId: profile?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Status changed successfully',
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
                <div className="my-2 flex items-center space-x-4">
                  <div className="w-80">
                    <Label>{t.formatMessage({ id: 'FIRST.NAME' })}</Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="firstName"
                      errors={errors}
                    />
                  </div>
                  <div className="w-80">
                    <Label>{t.formatMessage({ id: 'LAST.NAME' })}</Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="lastName"
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="my-2 flex items-center space-x-4">
                  <div className="w-80">
                    <Label>Email</Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="email"
                      errors={errors}
                    />
                  </div>
                  <div className="w-80">
                    <Label>Phone</Label>
                    <TextInput
                      control={control}
                      type="number"
                      name="phone"
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="my-2 flex items-center space-x-4">
                  <div className="w-80">
                    <Label>Address</Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="address"
                      errors={errors}
                    />
                  </div>
                  <div className="w-80">
                    <Label>City</Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="city"
                      errors={errors}
                    />
                  </div>
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

export { UpdateContributor };
