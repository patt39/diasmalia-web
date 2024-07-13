/* eslint-disable @next/next/no-img-element */
import { passwordResetUserAPI } from '@/api-site/auth';
import { useReactHookForm } from '@/components/hooks';
import { LayoutAuth } from '@/components/layouts/auth';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { TextInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PublicComponent } from '@/components/util/public-component';
import { UserForgotPasswordFormModel } from '@/types/auth';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  email: yup
    .string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required(),
});

const ForgotPassword = () => {
  const { query, push } = useRouter();
  const { redirect } = query;
  const {
    control,
    handleSubmit,
    errors,
    isValid,
    isDirty,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const onSubmit: SubmitHandler<UserForgotPasswordFormModel> = async (
    payload: UserForgotPasswordFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);

    try {
      await passwordResetUserAPI(payload);
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Email send successfully',
      });
      push(`/login${redirect ? `?redirect=${redirect}` : ''}`);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: 'An error has occurred.',
      });
    }
  };

  return (
    <LayoutAuth title="Forgot password">
      <div className="m-auto mt-10 w-full max-w-sm rounded-lg p-6 py-12 shadow-md dark:bg-[#121212] md:mt-16">
        <div className="mx-auto flex justify-center">
          <h6 className="mt-3 text-center text-xl font-bold">
            {`Forgot password?`}
          </h6>
        </div>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          {hasErrors && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{hasErrors}</AlertDescription>
            </Alert>
          )}

          <div className="mt-4">
            <TextInput
              control={control}
              label="Email"
              type="text"
              name="email"
              placeholder="Email Address"
              errors={errors}
            />
          </div>

          <div className="mt-6">
            <ButtonInput
              type="submit"
              className="w-full"
              size="lg"
              variant="primary"
              loading={loading}
              disabled={!isDirty || !isValid}
            >
              Request Password Reset
            </ButtonInput>
          </div>
        </form>

        <Link href={`/login${redirect ? `?redirect=${redirect}` : ''}`}>
          <p className="mt-8 cursor-pointer text-center text-xs font-bold text-gray-600 hover:text-blue-600 hover:underline">
            Already have an account? Log in here
          </p>
        </Link>
      </div>
    </LayoutAuth>
  );
};

export default PublicComponent(ForgotPassword);
