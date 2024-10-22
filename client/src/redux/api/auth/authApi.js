import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/users/create-user",
        method: "POST",
        body: userData,
      }),
    }),

    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginUserMutation } = authApi;
