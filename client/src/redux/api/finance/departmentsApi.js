import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const departmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDepartments: builder.mutation({
      query: (data) => ({
        url: "/departments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.departments],
    }),

    getAllDepartments: builder.query({
      query: (params) => ({
        url: "/departments",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.departments],
    }),

    getSingleDepartments: builder.query({
      query: (id) => ({
        url: `/departments/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.departments],
    }),

    updateDepartments: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/departments/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.departments],
    }),

    deleteDepartments: builder.mutation({
      query: (id) => ({
        url: `/departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.departments],
    }),
  }),
});

export const {
  useCreateDepartmentsMutation,
  useGetAllDepartmentsQuery,
  useGetSingleDepartmentsQuery,
  useUpdateDepartmentsMutation,
  useDeleteDepartmentsMutation,
} = departmentsApi;
