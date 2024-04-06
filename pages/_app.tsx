import '../styles/globals.css';
import '../styles/fonts.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Skeleton from '../components/Skeleton';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'src/api';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps<any>) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Skeleton>
              <Head>
                <title>ACM Portal</title>
              </Head>
              <Component {...pageProps} />
            </Skeleton>
          </LocalizationProvider>
        </SessionProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
export default MyApp;
