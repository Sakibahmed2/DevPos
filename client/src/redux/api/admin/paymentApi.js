import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/payments/create-sale",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.payment],
    }),

    getAllSales: builder.query({
      query: (params) => ({
        url: `/payments/all-sales`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.payment],
    }),

    getSingleSale: builder.query({
      query: (id) => ({
        url: `/payments/all-sales/${id}`,
        method: "GET",
      }),
    }),

    updateSale: builder.mutation({
      query: ({ saleId, saleData }) => ({
        url: `/payments/update-sale/${saleId}`,
        method: "PUT",
        body: saleData,
      }),
      invalidatesTags: [tagTypes.payment],
    }),

    deleteSale: builder.mutation({
      query: (id) => ({
        url: `/payments/delete-sale/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.payment],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllSalesQuery,
  useDeleteSaleMutation,
  useGetSingleSaleQuery,
  useUpdateSaleMutation,
} = paymentApi;
