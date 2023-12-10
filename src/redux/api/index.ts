import {
  createApi,
  fetchBaseQuery,
}                           from '@reduxjs/toolkit/query/react';
import { IAppState }        from '@redux/store';

export const baseUrl = import.meta.env.VITE_API_URL as string;

export const api = createApi({
  reducerPath: 'api',
  tagTypes   : ['schedule', 'user'],
  baseQuery  : fetchBaseQuery({
    baseUrl       : baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as IAppState).auth.accessToken;

      if (accessToken) {
        headers.set('Authorization', accessToken);
      }

      return headers;
    }
  }),
  endpoints: () => ({})
});