import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const manageStockApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createManageStock: builder.mutation({
      query: (manageStockData) => ({
        url: "/manage-stock",
        method: "POST",
        body: manageStockData,
      }),
      invalidatesTags: [tagTypes.manageStock],
    }),

    getAllManageStocks: builder.query({
      query: (params) => ({
        url: "/manage-stock",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.manageStock],
    }),

    getSingleManageStock: builder.query({
      query: (id) => ({
        url: `/manage-stock/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.manageStock],
    }),

    updateManageStock: builder.mutation({
      query: ({ manageStockId, manageStockData }) => {
        return {
          url: `/manage-stock/${manageStockId}`,
          method: "PUT",
          body: manageStockData,
        };
      },
      invalidatesTags: [tagTypes.manageStock],
    }),

    deleteManageStock: builder.mutation({
      query: (manageStockId) => ({
        url: `/manage-stock/${manageStockId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.manageStock],
    }),
  }),
});

export const {
  useCreateManageStockMutation,
  useGetAllManageStocksQuery,
  useGetSingleManageStockQuery,
  useUpdateManageStockMutation,
  useDeleteManageStockMutation,
} = manageStockApi;
