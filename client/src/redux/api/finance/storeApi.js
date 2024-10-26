import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const storesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStores: builder.mutation({
      query: (storesData) => ({
        url: "/stores",
        method: "POST",
        body: storesData,
      }),
      invalidatesTags: [tagTypes.store],
    }),

    getAllStores: builder.query({
      query: (params) => ({
        url: "/stores",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.store],
    }),

    getSingleStores: builder.query({
      query: (id) => ({
        url: `/stores/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.store],
    }),

    updateStores: builder.mutation({
      query: ({ storeId, storeData }) => {
        return {
          url: `/stores/${storeId}`,
          method: "PUT",
          body: storeData,
        };
      },
      invalidatesTags: [tagTypes.store],
    }),

    deleteStores: builder.mutation({
      query: (storeId) => ({
        url: `/stores/${storeId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.store],
    }),
  }),
});

export const {
  useCreateStoresMutation,
  useGetAllStoresQuery,
  useGetSingleStoresQuery,
  useUpdateStoresMutation,
  useDeleteStoresMutation,
} = storesApi;
