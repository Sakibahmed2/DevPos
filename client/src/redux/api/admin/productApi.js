import { baseApi } from "../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
    }),

    getAllProducts: builder.query({
      query: (params) => ({
        url: "/products",
        method: "GET",
        params: params,
      }),
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ productId, productData }) => {
        return {
          url: `/products/${productId}`,
          method: "PUT",
          body: productData,
        };
      },
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} = productApi;
