export type UserLoginFormModel = {
  email: string;
  password: string;
};

export type UserForgotPasswordFormModel = {
  email: string;
};

export type UserResetPasswordFormModel = {
  password?: string;
  newPassword?: string;
  token?: string;
  passwordConfirm: string;
};

export type UserRegisterFormModel = {
  firstName: string;
  lastName: string;
  organizationName: string;
  email: string;
  password: string;
  confirm: boolean;
};
