import { updatePasswordAPI } from '@/api-site/user';
import { UserUpdatePasswordFormModel } from '@/types/user';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput } from '../ui-setting';
import { TextPasswordInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription } from '../ui/alert';

const schema = yup.object({
  oldPassword: yup.string().required('old password required'),
  password: yup.string().required('new password required'),
  passwordConfirm: yup.string().required('confirm password required'),
});

const UpdateFormPassword = () => {
  const {
    control,
    handleSubmit,
    errors,
    loading,
    reset,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const onSubmit: SubmitHandler<UserUpdatePasswordFormModel> = async (
    payload: any,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await updatePasswordAPI({ ...payload });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: `Information save successfully`,
      });
      reset();
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
            <h2 className="text-base font-bold"> Change password </h2>

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

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
              <div className="mt-2">
                <TextPasswordInput
                  label="Old password"
                  control={control}
                  name="oldPassword"
                  placeholder="Old password"
                  errors={errors}
                />
              </div>
              <div className="mt-2">
                <TextPasswordInput
                  label="New password"
                  control={control}
                  name="password"
                  placeholder="New password"
                  errors={errors}
                />
              </div>
              <div className="mt-2">
                <TextPasswordInput
                  label="Confirm password"
                  control={control}
                  name="passwordConfirm"
                  placeholder="Confirm password"
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

export { UpdateFormPassword };
