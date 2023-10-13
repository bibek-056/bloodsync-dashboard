import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const AxiosClient = createApi({
  reducerPath: 'axiosClient',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7023/api/' }),
  tagTypes: ['Inventorys', 'Donors', 'Hospitals', 'PatientWaitlist'],
  endpoints: (builder) => ({
    readRequest: builder.query({
      query: (slug) => {
        return slug;
      },
      providesTags: ['Donors'],
    }),
    deleteRequest: builder.mutation<{ success: boolean; id: string }, string>({
      query(slug: string) {
        return {
          url: `${slug}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Donors'],
    }),
  }),
});

export const { useReadRequestQuery, useDeleteRequestMutation } = AxiosClient;
