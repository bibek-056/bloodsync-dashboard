import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AxiosClient = createApi({
  reducerPath: 'axiosClient',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7023/api/' }),
  endpoints: (builder) => ({

    getAllInventory: builder.query({
      query: () => 'inventorys',
    }),
    readRequest: builder.query({
      query: (slug) => slug,
    }),
  }),
});
export const { useReadRequestQuery } = AxiosClient;
