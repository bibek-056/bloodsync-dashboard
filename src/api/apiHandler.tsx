import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  EditInventoryData,
  InventoryData,
  AddAdminDataModel,
  PatientData,
  EditPatientwaitlist,
  DonorData,
  EditDonors,
  HospitalDataModel,
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

    deleteAdmin: builder.mutation<{ success: boolean; id: string }, string>({
      query(slug: string) {
        return {
          url: `${slug}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Users'],
    }),

    addInventory: builder.mutation<void, InventoryData>({
      query: (inventory) => ({
        url: 'inventorys',
        method: 'POST',
        body: inventory,
      }),
      invalidatesTags: ['Donors'],
    }),

    addHospital: builder.mutation<void, HospitalDataModel>({
      query: (hospital) => ({
        url: 'hospitals',
        method: 'POST',
        body: hospital,
      }),
      invalidatesTags: ['Hospitals'],
    }),

    editInventory: builder.mutation<void, EditInventoryData>({
      query: (inventory) => ({
        url: `inventorys/${inventory.inventoryId}`,
        method: 'PUT',
        body: inventory,
      }),
      invalidatesTags: ['Donors'],
    }),

    addPatient: builder.mutation<void, PatientData>({
      query: (patientwaitlists) => ({
        url: 'patientwaitlists',
        method: 'POST',
        body: patientwaitlists,
      }),
      invalidatesTags: ['Donors'],
    }),
    editPatient: builder.mutation<void, EditPatientwaitlist>({
      query: (patientwaitlists) => ({
        url: `patientwaitlists/${patientwaitlists.patientId}`,
        method: 'PUT',
        body: patientwaitlists,
      }),
      invalidatesTags: ['Donors'],
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
        url: 'userdonor',
        method: 'POST',
        body: donor,
      }),
    }),
    editDonor: builder.mutation<void, EditDonors>({
      query: (donor) => ({
        url: `users/${donor.userId}`,
        method: 'PUT',
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
  useEditDonorMutation,
  useAddPatientMutation,
  useEditPatientMutation,
  useAddHospitalMutation
} = AxiosClient;
