import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const variantAttributesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVariantAttributes: builder.mutation({
      query: (variantAttributesData) => ({
        url: "/variant-attributes",
        method: "POST",
        body: variantAttributesData,
      }),
      invalidatesTags: [tagTypes.variantAttributes],
    }),

    getAllVariantAttributes: builder.query({
      query: (params) => ({
        url: "/variant-attributes",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.variantAttributes],
    }),

    getSingleVariantAttributes: builder.query({
      query: (id) => ({
        url: `/variant-attributes/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.variantAttributes],
    }),

    updateVariantAttributes: builder.mutation({
      query: ({ variantAttributeId, variantAttributeData }) => {
        return {
          url: `/variant-attributes/${variantAttributeId}`,
          method: "PUT",
          body: variantAttributeData,
        };
      },
      invalidatesTags: [tagTypes.variantAttributes],
    }),

    deleteVariantAttributes: builder.mutation({
      query: (id) => ({
        url: `/variant-attributes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.variantAttributes],
    }),
  }),
});

export const {
  useCreateVariantAttributesMutation,
  useGetAllVariantAttributesQuery,
  useGetSingleVariantAttributesQuery,
  useUpdateVariantAttributesMutation,
  useDeleteVariantAttributesMutation,
} = variantAttributesApi;
