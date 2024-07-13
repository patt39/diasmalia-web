import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';
import { useInputState } from '../hooks';
import { getCookieUser } from './context-user';

const PublicComponent = (Component: ComponentType) => {
  const userToken = getCookieUser();
  return function ProtectedRoute({ ...props }) {
    const { userStorage } = useInputState();
    const isOnline = userStorage?.id !== undefined;
    const { push, query } = useRouter();

    useEffect(() => {
      if (userToken && isOnline) {
        push(`/dashboard`);
        // if (!Number(userStorage?.organization?.assignTypes)) {
        //   push(`/select/animal-type`);
        // } else {
        //   push(`/dashboard`);
        // }
      }
    }, [userStorage, isOnline, push, query]);

    return <Component {...props} />;
  };
};

export { PublicComponent };
