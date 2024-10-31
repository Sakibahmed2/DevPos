import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const suppliersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSuppliers: builder.mutation({
      query: (data) => ({
        url: "/suppliers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.suppliers],
    }),

    getAllSuppliers: builder.query({
      query: (params) => ({
        url: "/suppliers",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.suppliers],
    }),

    getSingleSuppliers: builder.query({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.suppliers],
    }),

    updateSuppliers: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/suppliers/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.suppliers],
    }),

    deleteSuppliers: builder.mutation({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.suppliers],
    }),
  }),
});

export const {
  useCreateSuppliersMutation,
  useGetAllSuppliersQuery,
  useGetSingleSuppliersQuery,
  useUpdateSuppliersMutation,
  useDeleteSuppliersMutation,
} = suppliersApi;
