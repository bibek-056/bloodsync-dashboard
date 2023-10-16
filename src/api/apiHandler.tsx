import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  EditInventory,
  InventoryData,
  AddAdminDataModel,
  DonorData,
} from '../models/datamodels';

export const AxiosClient = createApi({
  reducerPath: 'axiosClient',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7023/api/' }),
  tagTypes: ['Inventorys', 'Donors', 'Hospitals', 'PatientWaitlists', 'Users'],
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
    addInventory: builder.mutation<void, InventoryData>({
      query: (inventory) => ({
        url: 'inventorys',
        method: 'POST',
        body: inventory,
      }),
    }),
    editInventory: builder.mutation<void, EditInventory>({
      query: (inventory) => ({
        url: `inventorys/${inventory.inventoryId}`,
        method: 'PUT',
        body: inventory,
      }),
    }),

    addAdmin: builder.mutation<void, AddAdminDataModel>({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
    }),

    addDonor: builder.mutation<void, DonorData>({
      query: (donor) => ({
        url: 'donors',
        method: 'POST',
        body: donor,
      }),
    }),
  }),
});

export const {
  useReadRequestQuery,
  useDeleteRequestMutation,
  useAddInventoryMutation,
  useEditInventoryMutation,
  useAddAdminMutation,
  useAddDonorMutation,
} = AxiosClient;
