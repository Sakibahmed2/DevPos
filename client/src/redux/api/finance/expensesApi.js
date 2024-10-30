import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const expensesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExpenses: builder.mutation({
      query: (expensesData) => ({
        url: "/expenses",
        method: "POST",
        body: expensesData,
      }),
      invalidatesTags: [tagTypes.expenses],
    }),

    getAllExpenses: builder.query({
      query: (params) => ({
        url: "/expenses",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.expenses],
    }),

    getSingleExpenses: builder.query({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.expenses],
    }),

    updateExpenses: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/expenses/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.expenses],
    }),

    deleteExpenses: builder.mutation({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.expenses],
    }),
  }),
});

export const {
  useCreateExpensesMutation,
  useGetAllExpensesQuery,
  useGetSingleExpensesQuery,
  useUpdateExpensesMutation,
  useDeleteExpensesMutation,
} = expensesApi;
