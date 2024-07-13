import { IntlProvider } from '@/i18n/intl-provider';
import {
  PropsWithChildren,
  ReactNode,
  Suspense,
  useEffect,
  useState,
} from 'react';

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export const ClientOnly = ({
  children,
  fallback,
}: PropsWithChildren<{ fallback: ReactNode }>) => {
  const isClient = useIsClient();

  if (!isClient) {
    return <>{fallback}</>;
  }

  return (
    <Suspense fallback={fallback}>
      <IntlProvider>{children}</IntlProvider>
    </Suspense>
  );
};
