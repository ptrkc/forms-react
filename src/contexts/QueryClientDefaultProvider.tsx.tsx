import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useUser } from '../hooks/useUser';
import { ApiError } from '../utils/apiRequest';

const queryClient = new QueryClient();

export function QueryClientDefaultProvider({ children }: PropsWithChildren) {
  const { setUser } = useUser();
  const onError = (error: unknown) => {
    if (error instanceof ApiError && error.code === 401) {
      setUser(null);
    }
  };
  queryClient.setDefaultOptions({
    queries: { onError: onError },
    mutations: { onError: onError },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryClientDefaultProvider;
