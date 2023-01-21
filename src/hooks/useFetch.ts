/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { useQuery, UseQueryOptions } from 'react-query';
import { get } from 'utils';

interface IuseFetchParams<T, D> {
  url: string;
  key: string | unknown[];
  options?: UseQueryOptions<T, unknown, D>;
  format?: (data: T) => unknown;
}

export const useFetch = <T = unknown, D = T>({
  key,
  url,
  format,
  options,
}: IuseFetchParams<T, D>) => {
  const handler = async () => {
    const data = await get(url);

    return typeof format === 'function' ? format(data) : data;
  };

  return useQuery<T, unknown, D>(key, handler, options);
};
