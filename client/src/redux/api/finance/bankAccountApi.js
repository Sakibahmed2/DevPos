import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const bankAccountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBankAccount: builder.mutation({
      query: (data) => ({
        url: "/bank-accounts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.bankAccount],
    }),

    getAllBankAccount: builder.query({
      query: (params) => ({
        url: "/bank-accounts",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.bankAccount],
    }),

    getSingleBankAccount: builder.query({
      query: (id) => ({
        url: `/bank-accounts/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.bankAccount],
    }),

    updateBankAccount: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/bank-accounts/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.bankAccount],
    }),

    deleteBankAccount: builder.mutation({
      query: (id) => ({
        url: `/bank-accounts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.bankAccount],
    }),
  }),
});

export const {
  useCreateBankAccountMutation,
  useGetAllBankAccountQuery,
  useGetSingleBankAccountQuery,
  useUpdateBankAccountMutation,
  useDeleteBankAccountMutation,
} = bankAccountApi;
