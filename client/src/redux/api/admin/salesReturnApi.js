import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const saleReturnApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSaleReturn: builder.mutation({
      query: (data) => ({
        url: "/sale-return",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.saleReturn],
    }),

    getAllSaleReturn: builder.query({
      query: (params) => ({
        url: "/sale-return",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.saleReturn],
    }),

    getSingleSaleReturn: builder.query({
      query: (id) => ({
        url: `/sale-return/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.saleReturn],
    }),

    updateSaleReturn: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/sale-return/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.saleReturn],
    }),

    deleteSaleReturn: builder.mutation({
      query: (id) => ({
        url: `/sale-return/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.saleReturn],
    }),
  }),
});

export const {
  useCreateSaleReturnMutation,
  useGetAllSaleReturnQuery,
  useGetSingleSaleReturnQuery,
  useUpdateSaleReturnMutation,
  useDeleteSaleReturnMutation,
} = saleReturnApi;
