import { UpdateOneProfileAPI } from '@/api-site/profile';
import { ProfileFormModel } from '@/types/profile';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput } from '../ui-setting/button-input';
import { TextAreaInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription } from '../ui/alert';

const schema = yup.object({
  testimonial: yup.string().required(),
});

const Testimonial = ({ profile }: { profile: any }) => {
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

  useEffect(() => {
    if (profile) {
      const fields = [
        // 'currencyId',
        // 'countryId',
        'phone',
        'city',
        'address',
        'occupation',
        'firstName',
        'lastName',
        'description',
        'testimonial',
      ];
      fields?.forEach((field: any) => setValue(field, profile[field]));
    }
  }, [profile, setValue]);

  const { mutateAsync: saveMutation } = UpdateOneProfileAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<ProfileFormModel> = async (
    data: ProfileFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...data,
        profileId: profile?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: `Testimonial saved successfully`,
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
          <div className="px-4 py-5">
            <h2 className="text-base font-bold"> Testimonial </h2>

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

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5">
              <div className="mt-2">
                <TextAreaInput
                  control={control}
                  name="testimonial"
                  placeholder="give a testimonial of your experience with diasmalia soo far thanks..."
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
                Save
              </ButtonInput>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { Testimonial };
