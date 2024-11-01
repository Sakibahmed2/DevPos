import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEmployees: builder.mutation({
      query: (data) => ({
        url: "/employees",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.employees],
    }),

    getAllEmployees: builder.query({
      query: (params) => ({
        url: "/employees",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.employees],
    }),

    getSingleEmployees: builder.query({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.employees],
    }),

    updateEmployees: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/employees/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.employees],
    }),

    deleteEmployees: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.employees],
    }),
  }),
});

export const {
  useCreateEmployeesMutation,
  useGetAllEmployeesQuery,
  useGetSingleEmployeesQuery,
  useUpdateEmployeesMutation,
  useDeleteEmployeesMutation,
} = employeesApi;
