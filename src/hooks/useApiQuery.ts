import { useQuery, UseQueryOptions } from 'react-query';
import { apiRequest, ApiRequestOptions } from '../utils/apiRequest';

export function useApiQuery<T>(
  url: string,
  options?: ApiRequestOptions,
  queryOptions?: Omit<
    UseQueryOptions<T, unknown, T, string>,
    'queryKey' | 'queryFn'
  >
) {
  const query = useQuery(
    url,
    async () => await apiRequest<T>(url, options),
    queryOptions
  );
  return query;
}
