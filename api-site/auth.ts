import {
  UserForgotPasswordFormModel,
  UserLoginFormModel,
  UserRegisterFormModel,
  UserResetPasswordFormModel,
} from '@/types/auth';
import { UserModel } from '@/types/user';
import { makeApiCall } from '@/utils';

export const loginUserAPI = async (
  payload: UserLoginFormModel,
): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: 'loginUser',
    body: payload,
  });
};

export const passwordResetUserAPI = async (
  payload: UserForgotPasswordFormModel,
): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: 'passwordResetUser',
    body: payload,
  });
};

export const resetPasswordAPI = async (
  payload: UserResetPasswordFormModel,
): Promise<{ data: UserModel }> => {
  const { token, password, passwordConfirm } = payload;
  return await makeApiCall({
    action: 'resetPassword',
    body: { token, password, passwordConfirm },
    urlParams: { token },
  });
};

export const resendCodeAPI = async () => {
  return await makeApiCall({
    action: 'resendCode',
  });
};

export const validCodeAPI = async ({ code }: { code: string }) => {
  return await makeApiCall({
    action: 'validCode',
    body: { code },
  });
};

export const registerUserAPI = async (payload: UserRegisterFormModel) => {
  return await makeApiCall({
    action: 'registerUser',
    body: payload,
  });
};
