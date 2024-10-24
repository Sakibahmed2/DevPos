import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const subCategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubCategories: builder.mutation({
      query: (categoriesData) => ({
        url: "/sub-categories",
        method: "POST",
        body: categoriesData,
      }),
      invalidatesTags: [tagTypes.subCategories],
    }),

    getAllSubCategories: builder.query({
      query: (params) => ({
        url: "/sub-categories",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.subCategories],
    }),

    getSingleSubCategories: builder.query({
      query: (categoriesId) => ({
        url: `/sub-categories/${categoriesId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.subCategories],
    }),

    updateSubCategories: builder.mutation({
      query: ({ categoryId, categoryData }) => {
        return {
          url: `/sub-categories/${categoryId}`,
          method: "PUT",
          body: categoryData,
        };
      },
      invalidatesTags: [tagTypes.subCategories],
    }),

    deleteSubCategories: builder.mutation({
      query: (categoriesId) => ({
        url: `/sub-categories/${categoriesId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.subCategories],
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
