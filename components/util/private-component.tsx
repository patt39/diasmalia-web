import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';
import { useInputState } from '../hooks';
import { getCookieUser } from './context-user';

const PrivateComponent = (Component: ComponentType) => {
  const userToken = getCookieUser();
  return function ProtectedRoute({ ...props }) {
    const { linkHref, userStorage } = useInputState();
    const isOnline = userStorage?.id !== undefined;
    const { push, pathname } = useRouter();

    useEffect(() => {
      if (!userToken && !isOnline) {
        push(`/login${pathname ? `?redirect=${linkHref}` : ''}`);
      }
    }, [userStorage, linkHref, isOnline, pathname, push]);

    return <Component {...props} />;
  };
};

export { PrivateComponent };
