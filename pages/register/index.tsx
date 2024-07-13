/* eslint-disable @next/next/no-img-element */
import { registerUserAPI } from '@/api-site/auth';
import { useReactHookForm } from '@/components/hooks';
import { LayoutAuth } from '@/components/layouts/auth';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { TextInput, TextPasswordInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PublicComponent } from '@/components/util/public-component';
import { UserRegisterFormModel } from '@/types/auth';
import { AlertDangerNotification } from '@/utils/alert-notification';
import { Checkbox } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  email: yup
    .string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required(),
  password: yup.string().min(8, 'Minimum 8 symbols').required(),
  organizationName: yup.string().min(8, 'Minimum 8 symbols').required(),
  firstName: yup.string().required('first name is a required field'),
  lastName: yup.string().required('last name is a required field'),
  confirm: yup
    .boolean()
    .oneOf([true], 'Please check the box to deactivate your account')
    .required(),
});

const Register = () => {
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
  } = useReactHookForm({ schema });

  const onSubmit: SubmitHandler<UserRegisterFormModel> = async (
    payload: UserRegisterFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);

    try {
      await registerUserAPI({
        ...payload,
      });
      setHasErrors(false);
      setLoading(false);
      push(`/verify/confirm-email${redirect ? `?redirect=${redirect}` : ''}`);
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
    <LayoutAuth title="Register">
      <div className="m-auto mt-10 w-full max-w-lg rounded-lg p-6 py-6 shadow-md dark:bg-black md:mt-16">
        <div className="mx-auto flex justify-center">
          <img
            className="h-12 w-auto sm:h-14"
            src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
            alt=""
          />
        </div>
        <div className="mt-4 mx-auto flex justify-center">
          <h6 className="text-center text-xl font-bold">
            {`Sign up. It's free!`}
          </h6>
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
              label="Organization name"
              type="text"
              name="organizationName"
              placeholder="Organization name"
              errors={errors}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div className="mb-4">
              <TextInput
                control={control}
                label="First name"
                type="text"
                name="firstName"
                placeholder="First name"
                errors={errors}
              />
            </div>

            <div className="mb-4">
              <TextInput
                control={control}
                label="Last name"
                type="text"
                name="lastName"
                placeholder="Last name"
                errors={errors}
              />
            </div>
          </div>

          <div className="mb-4">
            <TextInput
              control={control}
              label="Email"
              type="email"
              name="email"
              placeholder="Email Address"
              errors={errors}
            />
          </div>

          <div className="mb-4">
            <TextPasswordInput
              control={control}
              label="Password"
              name="password"
              placeholder="Password"
              errors={errors}
            />
          </div>

          <div className="mb-4">
            <Controller
              name="confirm"
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <div className="flex items-center">
                    <div className="flex">
                      <Checkbox checked={value} onChange={onChange} />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="remember-me"
                        //className="text-sm font-bold text-gray-700"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I accept the{' '}
                        <Link
                          className="text-sm text-blue-600 hover:underline"
                          href="/terms-condition"
                        >
                          terms
                        </Link>{' '}
                        &{' '}
                        <Link
                          className="text-sm text-blue-600 hover:underline"
                          href="/privacy-policy"
                        >
                          privacy policy
                        </Link>
                      </label>
                    </div>
                  </div>
                </>
              )}
            />
            {errors?.confirm && (
              <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                {errors?.confirm?.message as any}
              </span>
            )}
          </div>

          <div className="mt-6">
            <ButtonInput
              type="submit"
              className="w-full"
              variant="primary"
              size="lg"
              loading={loading}
            >
              Create account
            </ButtonInput>
          </div>
        </form>

        <Link href={`/login${redirect ? `?redirect=${redirect}` : ''}`}>
          <p className="mt-8 cursor-pointer text-center text-xs font-bold text-gray-600 hover:text-blue-600 hover:underline">
            {' '}
            Already have an account? Log in here
          </p>
        </Link>
      </div>
    </LayoutAuth>
  );
};
export default PublicComponent(Register);
