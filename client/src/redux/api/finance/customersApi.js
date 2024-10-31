import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const customersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCustomers: builder.mutation({
      query: (data) => ({
        url: "/customers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.customers],
    }),

    getAllCustomers: builder.query({
      query: (params) => ({
        url: "/customers",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.customers],
    }),

    getSingleCustomers: builder.query({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.customers],
    }),

    updateCustomers: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/customers/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.customers],
    }),

    deleteCustomers: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.customers],
    }),
  }),
});

export const {
  useCreateCustomersMutation,
  useGetAllCustomersQuery,
  useGetSingleCustomersQuery,
  useUpdateCustomersMutation,
  useDeleteCustomersMutation,
} = customersApi;
