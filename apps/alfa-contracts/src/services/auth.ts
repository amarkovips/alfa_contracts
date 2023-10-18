import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import axios, { AxiosError } from 'axios';

import { urls } from '../utils/urls';

interface IResponse {
  success: boolean
}

const baseQuery =
  (): BaseQueryFn<{
    url: string;
  }> =>
    async ({ url }) => {
      try {
        const response = await axios.get('/api');
        const result = response.data;
        console.log(result);
        return { data: result };
      } catch (axiosError) {
        let error = axiosError as AxiosError;
        return { error: '' }
      }
    };

export const auth = createApi({
  reducerPath: 'auth',
  baseQuery: baseQuery(),
  endpoints: (build) => ({
    auth: build.query<IResponse, null>({
      query: () => ({
        url: urls.oauth,
      }),
    }),
  }),
});

export const {
  useLazyAuthQuery,
} = auth;
