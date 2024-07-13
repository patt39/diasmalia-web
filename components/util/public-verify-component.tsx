import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";
import { useInputState } from "../hooks";
import { getCookieUser, getCookieVerifyUser } from "./context-user";

const PublicVerifyComponent = (Component: ComponentType) => {
  const userTokenVerify = getCookieVerifyUser();
  const userToken = getCookieUser();
  return function ProtectedRoute({ ...props }) {
    const { userStorage } = useInputState();
    const isOnline = userStorage?.id !== undefined;
    const { push, query } = useRouter();

    useEffect(() => {
      if ((userTokenVerify || userToken) && isOnline) {
        push(`/dashboard`);
      }
    }, [userStorage, isOnline, push, query]);

    return <Component {...props} />;
  };
};

export { PublicVerifyComponent };
