import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const purchaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPurchase: builder.mutation({
      query: (data) => ({
        url: "/purchase/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.purchase],
    }),

    getAllPurchase: builder.query({
      query: (params) => ({
        url: "/purchase",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.purchase],
    }),

    getSinglePurchase: builder.query({
      query: (id) => ({
        url: `/purchase/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.purchase],
    }),

    updatePurchase: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/purchase/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.purchase],
    }),

    deletePurchase: builder.mutation({
      query: (id) => ({
        url: `/purchase/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.purchase],
    }),
  }),
});

export const {
  useCreatePurchaseMutation,
  useGetAllPurchaseQuery,
  useGetSinglePurchaseQuery,
  useUpdatePurchaseMutation,
  useDeletePurchaseMutation,
} = purchaseApi;
