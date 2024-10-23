import { baseApi } from "../baseApi";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategories: builder.mutation({
      query: (categoriesData) => ({
        url: "/categories",
        method: "POST",
        body: categoriesData,
      }),
    }),

    getAllCategories: builder.query({
      query: (params) => ({
        url: "/categories",
        method: "GET",
        params: params,
      }),
    }),

    getSingleCategory: builder.query({
      query: (categoriesId) => ({
        url: `/categories/${categoriesId}`,
        method: "GET",
      }),
    }),

    updateCategories: builder.mutation({
      query: ({ categoryId, categoryData }) => {
        return {
          url: `/categories/${categoryId}`,
          method: "PUT",
          body: categoryData,
        };
      },
    }),

    deleteCategories: builder.mutation({
      query: (categoriesId) => ({
        url: `/categories/${categoriesId}`,
        method: "DELETE",
      }),
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
