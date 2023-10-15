import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EditInventory, InventoryData } from "../models/datamodels";
import { PatientData } from "../models/datamodels";

export const AxiosClient = createApi({
  reducerPath: "axiosClient",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7023/api/" }),
  tagTypes: ["Inventorys", "Donors", "Hospitals", "PatientWaitlist"],
  endpoints: (builder) => ({
    readRequest: builder.query({
      query: (slug) => {
        return slug;
      },
      providesTags: ["Donors"],
    }),
    deleteRequest: builder.mutation<{ success: boolean; id: string }, string>({
      query(slug: string) {
        return {
          url: `${slug}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Donors"],
    }),
    addInventory: builder.mutation<void, InventoryData>({
      query: (inventory) => ({
        url: "inventorys",
        method: "POST",
        body: inventory,
      }),
    }),
    editInventory: builder.mutation<void, EditInventory>({
      query: (inventory) => ({
        url: `inventorys/${inventory.inventoryId}`,
        method: "PUT",
        body: inventory,
      }),
    }),
    addPatient: builder.mutation<void, PatientData>({ // Corrected placement
      query: (patientwaitlist) => ({
        url: "patientwaitlists",
        method: "POST",
        body: patientwaitlist,
      }),
    }),
  }),
});

export const {
  useReadRequestQuery,
  useDeleteRequestMutation,
  useAddInventoryMutation,
  useEditInventoryMutation,
  useAddPatientMutation, // Corrected mutation name
} = AxiosClient;
