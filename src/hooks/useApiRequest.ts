import { useEffect, useState } from 'react';
import { ApiError, apiRequest, ApiRequestOptions } from '../utils/apiRequest';

export const useApiRequest = <T>(route: string, options: ApiRequestOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiRequest<T>(route, options)
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
};
