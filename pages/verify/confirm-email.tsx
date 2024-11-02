/* eslint-disable @next/next/no-img-element */
import { resendCodeAPI, validCodeAPI } from '@/api-site/auth';
import { useDecrementTimer, useReactHookForm } from '@/components/hooks';
import { LayoutAuth } from '@/components/layouts/auth';
import { ButtonInput } from '@/components/ui-setting';
import { TextInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PublicVerifyComponent } from '@/components/util/public-verify-component';
import { AlertDangerNotification } from '@/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  code: yup.string().min(3, 'Minimum 6 symbols').required(),
});

const ConfirmEmail = () => {
  const defaultTimer = 60;
  const { timer, isRunning, setIsRunning } = useDecrementTimer(defaultTimer);
  const [isResend, setIsResend] = useState(false);
  const { query, push } = useRouter();
  const { redirect } = query;
  const {
    control,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
    setHasSuccess,
  } = useReactHookForm({ schema });

  const onSubmit: SubmitHandler<{ code: string }> = async (payload: {
    code: string;
  }) => {
    setLoading(true);
    setHasErrors(undefined);

    try {
      const { data } = await validCodeAPI({ ...payload });
      setHasErrors(false);
      setLoading(false);
      if (Number(data?.assignTypes?.length) > 0) {
        window.location.href = `${
          redirect ? redirect : `${data?.url}/dashboard`
        }`;
      } else {
        push(`/select/animal-type${redirect ? `?redirect=${redirect}` : ''}`);
      }
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error?.response?.data?.message);
      AlertDangerNotification({
        text: error?.response?.data?.message,
      });
    }
  };

  const resendCodeItem = async () => {
    setIsResend(true);
    setHasSuccess(false);
    setHasErrors(undefined);
    try {
      await resendCodeAPI();
      setIsResend(false);
      setIsRunning(true);
      setHasSuccess(true);
    } catch (error: any) {
      setIsResend(false);
      setHasErrors(true);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <LayoutAuth title="Confirm your account">
        <div className="m-auto mt-8 w-full max-w-sm rounded-lg p-6 py-6 shadow-md dark:bg-black md:mt-16">
          <div className="mx-auto flex justify-center">
            <img
              className="h-12 w-auto sm:h-14"
              src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
              alt=""
            />
          </div>
          <div className="justify-center">
            <h6 className="mt-4 text-center text-xl font-bold">
              {`Confirm your account`}
            </h6>
            <p className="mt-4 text-center text-sm sm:text-sm text-gray-600">
              We sent a verification code to your email. Enter the code from the
              email in the field below.
            </p>
          </div>
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            {hasErrors && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{hasErrors}</AlertDescription>
              </Alert>
            )}

            <div className="mt-4">
              <div className="max-w-auto relative flex w-full">
                <TextInput
                  control={control}
                  name="code"
                  placeholder="Enter 6-digit code"
                  errors={errors}
                  required
                  type="number"
                  pattern="[0-9]*"
                  inputMode="numeric"
                />

                <ButtonInput
                  type="button"
                  variant="primary"
                  size="sm"
                  className="!absolute right-1 top-1 rounded"
                  loading={isResend}
                  onClick={() => resendCodeItem()}
                  disabled={isRunning ? true : false}
                >
                  {timer} Resend code
                </ButtonInput>
              </div>
            </div>
            <div className="mt-6">
              <ButtonInput
                type="submit"
                className="w-full"
                size="lg"
                variant="primary"
                loading={loading}
              >
                Verify code
              </ButtonInput>
            </div>
          </form>
        </div>
      </LayoutAuth>
    </>
  );
};
export default PublicVerifyComponent(ConfirmEmail);
