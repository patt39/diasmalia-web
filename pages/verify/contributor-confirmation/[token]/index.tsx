/* eslint-disable @next/next/no-img-element */
import { ContributorConfirmationAPI, VerifyTokenAPI } from '@/api-site/user';
import { useReactHookForm } from '@/components/hooks';
import { LayoutAuth } from '@/components/layouts/auth';
import { ButtonInput } from '@/components/ui-setting';
import { TextInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PublicVerifyComponent } from '@/components/util/public-verify-component';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  password: yup.string().min(3, 'Minimum 6 symbols').required(),
  passwordConfirm: yup.string().min(3, 'Minimum 6 symbols').required(),
});

const ContributorConfirmation = () => {
  const { query, push } = useRouter();
  const { redirect } = query;
  const { control, handleSubmit, errors, hasErrors, setHasErrors } =
    useReactHookForm({ schema });

  const token = String(query?.token);
  const { data: getVerifiedUser } = VerifyTokenAPI({
    token: token,
  });

  const { isPending: loading, mutateAsync: saveMutation } =
    ContributorConfirmationAPI();

  const onSubmit: SubmitHandler<{ password: string }> = async (payload: {
    password: string;
  }) => {
    setHasErrors(undefined);

    try {
      if (getVerifiedUser?.confirmedAt == null) {
        await saveMutation({
          ...payload,
          token: token,
        });
      }
      setHasErrors(false);
      push(`/login${redirect ? `?redirect=${redirect}` : ''}`);
    } catch (error: any) {
      setHasErrors(true);
      setHasErrors(error?.response?.data?.message);
      AlertDangerNotification({
        text: error?.response?.data?.message,
      });
    }
  };

  const rejectInvitation = async () => {
    try {
      AlertSuccessNotification({
        text: 'Invitation rejected',
      });
      push(`/register${redirect ? `?redirect=${redirect}` : ''}`);
    } catch (error: any) {
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
              {`Confirm invitation`}
            </h6>
            <p className="mt-4 text-center text-sm sm:text-sm text-gray-600">
              {getVerifiedUser?.inviter} has invited you to join the{' '}
              {getVerifiedUser?.organizationName} organization
            </p>
          </div>
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            {hasErrors && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{hasErrors}</AlertDescription>
              </Alert>
            )}

            <div className="mb-4">
              <TextInput
                control={control}
                label="Password"
                type="text"
                name="password"
                placeholder="insert password"
                errors={errors}
              />
            </div>
            <div className="mb-4">
              <TextInput
                control={control}
                label="Confirm password"
                type="text"
                name="passwordConfirm"
                placeholder="confirm password"
                errors={errors}
              />
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <ButtonInput
                type="button"
                className="w-full"
                variant="outline"
                onClick={() => rejectInvitation()}
              >
                Decline
              </ButtonInput>
              <ButtonInput
                type="submit"
                className="w-full"
                size="lg"
                variant="primary"
                loading={loading}
              >
                Accept
              </ButtonInput>
            </div>
          </form>
        </div>
      </LayoutAuth>
    </>
  );
};
export default PublicVerifyComponent(ContributorConfirmation);
