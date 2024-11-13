import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const quotationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuotation: builder.mutation({
      query: (data) => ({
        url: "/quotations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.quotation],
    }),

    getAllQuotation: builder.query({
      query: (params) => ({
        url: "/quotations",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.quotation],
    }),

    getSingleQuotation: builder.query({
      query: (id) => ({
        url: `/quotations/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.quotation],
    }),

    updateQuotation: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/quotations/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.quotation],
    }),

    deleteQuotation: builder.mutation({
      query: (id) => ({
        url: `/quotations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.quotation],
    }),
  }),
});

export const {
  useCreateQuotationMutation,
  useGetAllQuotationQuery,
  useGetSingleQuotationQuery,
  useUpdateQuotationMutation,
  useDeleteQuotationMutation,
} = quotationApi;
