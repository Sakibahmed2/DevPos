import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const payrollsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayrolls: builder.mutation({
      query: (data) => ({
        url: "/payrolls",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.payrolls],
    }),

    getAllPayrolls: builder.query({
      query: (params) => ({
        url: "/payrolls",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.payrolls],
    }),

    getSinglePayrolls: builder.query({
      query: (id) => ({
        url: `/payrolls/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.payrolls],
    }),

    updatePayrolls: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/payrolls/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.payrolls],
    }),

    deletePayrolls: builder.mutation({
      query: (id) => ({
        url: `/payrolls/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.payrolls],
    }),
  }),
});

export const {
  useCreatePayrollsMutation,
  useGetAllPayrollsQuery,
  useGetSinglePayrollsQuery,
  useUpdatePayrollsMutation,
  useDeletePayrollsMutation,
} = payrollsApi;
