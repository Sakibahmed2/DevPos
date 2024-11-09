import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const rolesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRoles: builder.mutation({
      query: (data) => ({
        url: "/roles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.roles],
    }),

    getAllRoles: builder.query({
      query: (params) => ({
        url: "/roles",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.roles],
    }),

    getSingleRoles: builder.query({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.roles],
    }),

    updateRoles: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/roles/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.roles],
    }),

    deleteRoles: builder.mutation({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.roles],
    }),
  }),
});

export const {
  useCreateRolesMutation,
  useGetAllRolesQuery,
  useGetSingleRolesQuery,
  useUpdateRolesMutation,
  useDeleteRolesMutation,
} = rolesApi;
