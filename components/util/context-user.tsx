import { GetOneUserMeAPI, IpLocationAPI } from '@/api-site/user';
import { UserModel } from '@/types/user';

import Cookies from 'js-cookie';
import { FC, ReactNode, createContext, useContext } from 'react';

type AuthContextProps = {
  user?: UserModel | undefined;
  userStorage?: any;
};

const initAuthContextPropsState = {
  user: undefined,
  userStorage: undefined,
};

const AuthContext = createContext<AuthContextProps>(
  initAuthContextPropsState as any,
);

const useAuth = () => {
  return useContext(AuthContext);
};

export const getCookieUser = () =>
  typeof window !== 'undefined'
    ? Cookies.get(String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN))
    : null;

export const getCookieVerifyUser = () =>
  typeof window !== 'undefined'
    ? Cookies.get(String(process.env.NEXT_PUBLIC_BASE_NAME_VERIFY_TOKEN))
    : null;

const ContextUserProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const { data: user } = GetOneUserMeAPI();
  const { data: ipLocation } = IpLocationAPI();

  return (
    <>
      <AuthContext.Provider
        value={{
          ...(user as any),
          userStorage: user,
          ipLocation: ipLocation,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export { ContextUserProvider, useAuth };
