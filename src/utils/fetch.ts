/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */

import axios, { Method } from 'axios';

export const createQueryString = (options: Record<string, any>): string =>
  '?' +
  Object.entries(options)
    .reduce<string[]>(
      (acc, option) => [
        ...acc,
        option.filter((x) => x !== null && x !== undefined).join('='),
      ],
      []
    )
    .filter(Boolean)
    .join('&');

export const createPath = (...elements: string[]): string => elements.join('/');

export const createUrl = (
  base: string,
  path?: string[] | null,
  query?: Record<string, any> | null
): string =>
  [
    base,
    '/',
    !(path == null) && createPath(...path),
    !(query == null) && createQueryString(query),
  ]
    .filter(Boolean)
    .join('');

const makeRequest =
  (method: Method) =>
  async <T = any>(
    url: string,
    body?: Record<string, unknown>,
    options: Record<string, unknown> = {}
  ): Promise<any> => {
    try {
      const { data } = await axios.request<T>({
        data: body,
        method,
        url,
        ...options,
      });

      return data;
    } catch (err: unknown) {
      throw err;
    }
  };

export const get = makeRequest('get');

export const put = makeRequest('put');

export const post = makeRequest('post');
