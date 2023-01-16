import { useQuery } from 'react-query';
import { apiRequest, ApiRequestOptions } from '../utils/apiRequest';

export function useApiQuery<T>(url: string, options?: ApiRequestOptions) {
  const query = useQuery(url, async () => await apiRequest<T>(url, options), {
    onError: (error) => console.log(error),
  });
  return query;
}
