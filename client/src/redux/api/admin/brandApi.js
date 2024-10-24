import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBrand: builder.mutation({
      query: (brandData) => ({
        url: "/brands",
        method: "POST",
        body: brandData,
      }),
      invalidatesTags: [tagTypes.brands],
    }),

    getAllBrands: builder.query({
      query: (params) => ({
        url: "/brands",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.brands],
    }),

    getSingleBrand: builder.query({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.brands],
    }),

    updateBrand: builder.mutation({
      query: ({ brandId, brandData }) => {
        return {
          url: `/brands/${brandId}`,
          method: "PUT",
          body: brandData,
        };
      },
      invalidatesTags: [tagTypes.brands],
    }),

    deleteBrand: builder.mutation({
      query: (brandId) => ({
        url: `/brands/${brandId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.brands],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useGetAllBrandsQuery,
  useGetSingleBrandQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
