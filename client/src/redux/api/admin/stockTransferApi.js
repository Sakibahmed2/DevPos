import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const stockTransferApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStockTransfer: builder.mutation({
      query: (stockTransferData) => ({
        url: "/stock-transfers",
        method: "POST",
        body: stockTransferData,
      }),
      invalidatesTags: [tagTypes.stockTransfers],
    }),

    getAllStockTransfer: builder.query({
      query: (params) => ({
        url: "/stock-transfers",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.stockTransfers],
    }),

    getSingleStockTransfer: builder.query({
      query: (id) => ({
        url: `/stock-transfers/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.stockTransfers],
    }),

    updateStockTransfer: builder.mutation({
      query: ({ stockTransferId, stockTransferData }) => {
        return {
          url: `/stock-transfers/${stockTransferId}`,
          method: "PUT",
          body: stockTransferData,
        };
      },
      invalidatesTags: [tagTypes.stockTransfers],
    }),

    deleteStockTransfer: builder.mutation({
      query: (stockTransferId) => ({
        url: `/stock-transfers/${stockTransferId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.stockTransfers],
    }),
  }),
});

export const {
  useCreateStockTransferMutation,
  useGetAllStockTransferQuery,
  useGetSingleStockTransferQuery,
  useUpdateStockTransferMutation,
  useDeleteStockTransferMutation,
} = stockTransferApi;
