import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategories: builder.mutation({
      query: (categoriesData) => ({
        url: "/categories",
        method: "POST",
        body: categoriesData,
      }),
      invalidatesTags: [tagTypes.categories],
    }),

    getAllCategories: builder.query({
      query: (params) => ({
        url: "/categories",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.categories],
    }),

    getSingleCategory: builder.query({
      query: (categoriesId) => ({
        url: `/categories/${categoriesId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.categories],
    }),

    updateCategories: builder.mutation({
      query: ({ categoryId, categoryData }) => {
        return {
          url: `/categories/${categoryId}`,
          method: "PUT",
          body: categoryData,
        };
      },
      invalidatesTags: [tagTypes.categories],
    }),

    deleteCategories: builder.mutation({
      query: (categoriesId) => ({
        url: `/categories/${categoriesId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.categories],
    }),
  }),
});

export const {
  useCreateCategoriesMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoriesMutation,
  useDeleteCategoriesMutation,
  useGetSingleCategoryQuery,
} = categoriesApi;
