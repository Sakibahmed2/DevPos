import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const expenseCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExpenseCategories: builder.mutation({
      query: (expenseCategoryData) => ({
        url: "/expense-categories",
        method: "POST",
        body: expenseCategoryData,
      }),
      invalidatesTags: [tagTypes.expenseCategories],
    }),

    getAllExpenseCategories: builder.query({
      query: (params) => ({
        url: "/expense-categories",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.expenseCategories],
    }),

    getSingleExpenseCategories: builder.query({
      query: (id) => ({
        url: `/expense-categories/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.expenseCategories],
    }),

    updateExpenseCategories: builder.mutation({
      query: ({ expenseCategoryId, expenseCategoryData }) => {
        return {
          url: `/expense-categories/${expenseCategoryId}`,
          method: "PUT",
          body: expenseCategoryData,
        };
      },
      invalidatesTags: [tagTypes.expenseCategories],
    }),

    deleteExpenseCategories: builder.mutation({
      query: (id) => ({
        url: `/expense-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.expenseCategories],
    }),
  }),
});

export const {
  useCreateExpenseCategoriesMutation,
  useGetAllExpenseCategoriesQuery,
  useGetSingleExpenseCategoriesQuery,
  useUpdateExpenseCategoriesMutation,
  useDeleteExpenseCategoriesMutation,
} = expenseCategoryApi;
