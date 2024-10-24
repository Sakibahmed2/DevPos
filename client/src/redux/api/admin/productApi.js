import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: [tagTypes.products],
    }),

    getAllProducts: builder.query({
      query: (params) => ({
        url: "/products",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.products],
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.products],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, productData }) => {
        return {
          url: `/products/${productId}`,
          method: "PUT",
          body: productData,
        };
      },
      invalidatesTags: [tagTypes.products],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.products],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
