import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/users/create-user",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: [tagTypes.users],
    }),

    getAllUsers: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.users],
    }),

    getSingleUsers: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.users],
    }),

    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
  useGetSingleUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = authApi;
