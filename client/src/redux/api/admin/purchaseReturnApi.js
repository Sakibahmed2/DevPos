import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const purchaseReturnApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPurchaseReturn: builder.mutation({
      query: (data) => ({
        url: "/purchase-return",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.purchaseReturn],
    }),

    getAllPurchaseReturn: builder.query({
      query: (params) => ({
        url: "/purchase-return",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.purchaseReturn],
    }),

    getSinglePurchaseReturn: builder.query({
      query: (id) => ({
        url: `/purchase-return/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.purchaseReturn],
    }),

    updatePurchaseReturn: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/purchase-return/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.purchaseReturn],
    }),

    deletePurchaseReturn: builder.mutation({
      query: (id) => ({
        url: `/purchase-return/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.purchaseReturn],
    }),
  }),
});

export const {
  useCreatePurchaseReturnMutation,
  useGetAllPurchaseReturnQuery,
  useGetSinglePurchaseReturnQuery,
  useUpdatePurchaseReturnMutation,
  useDeletePurchaseReturnMutation,
} = purchaseReturnApi;
