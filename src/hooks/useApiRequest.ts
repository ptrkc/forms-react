import { useEffect, useState } from 'react';
import { ApiError, apiRequest, ApiRequestOptions } from '../utils/apiRequest';
import { useUser } from '../hooks/useUser';

export const useApiRequest = <T>(route: string, options: ApiRequestOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();

  useEffect(() => {
    setIsLoading(true);
    apiRequest<T>(route, options)
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof ApiError && err.code === 401) {
          setUser(null);
        }
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
};
