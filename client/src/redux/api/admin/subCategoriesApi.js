import { baseApi } from "../baseApi";

const subCategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubCategories: builder.mutation({
      query: (categoriesData) => ({
        url: "/sub-categories",
        method: "POST",
        body: categoriesData,
      }),
    }),

    getAllSubCategories: builder.query({
      query: (params) => ({
        url: "/sub-categories",
        method: "GET",
        params: params,
      }),
    }),

    getSingleSubCategories: builder.query({
      query: (categoriesId) => ({
        url: `/sub-categories/${categoriesId}`,
        method: "GET",
      }),
    }),

    updateSubCategories: builder.mutation({
      query: ({ categoryId, categoryData }) => {
        return {
          url: `/sub-categories/${categoryId}`,
          method: "PUT",
          body: categoryData,
        };
      },
    }),

    deleteSubCategories: builder.mutation({
      query: (categoriesId) => ({
        url: `/sub-categories/${categoriesId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateSubCategoriesMutation,
  useGetAllSubCategoriesQuery,
  useGetSingleSubCategoriesQuery,
  useUpdateSubCategoriesMutation,
  useDeleteSubCategoriesMutation,
} = subCategoriesApi;
