import "@/styles/globals.css";
import "animate.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import "react-quill/dist/quill.snow.css";
import "toastify-js/src/toastify.css";

import { LoadingFile } from "@/components/ui-setting/ant";
import { ContextUserProvider } from "@/components/util/context-user";
import { ThemeProvider } from "@/components/util/theme-provider";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ClientOnly } from "@/components/util/client-only";
import { ContextIntlProvider } from "@/i18n/context-intl-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
// const queryClient = new QueryClient({
//   defaultOptions: { queries: { staleTime: 60_000, gcTime: 10 * (60 * 1000) } },
// });
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextIntlProvider>
        <GoogleOAuthProvider
          clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        >
          <ClientOnly fallback={<LoadingFile />}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <HydrationBoundary state={pageProps.dehydratedState}>
                <ConfigProvider>
                  <ContextUserProvider>
                    <Component {...pageProps} />

                    {Boolean(process.env.NEXT_PUBLIC_QUERY_DEV_TOOLS) && (
                      <ReactQueryDevtools
                        buttonPosition="bottom-right"
                        initialIsOpen={false}
                      />
                    )}
                  </ContextUserProvider>
                </ConfigProvider>
              </HydrationBoundary>
            </ThemeProvider>
          </ClientOnly>
        </GoogleOAuthProvider>
      </ContextIntlProvider>
    </QueryClientProvider>
  );
}
