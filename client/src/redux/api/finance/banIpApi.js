import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const banIpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBanIp: builder.mutation({
      query: (data) => ({
        url: "/ban-ip-addresses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.banIp],
    }),

    getAllBanIp: builder.query({
      query: (params) => ({
        url: "/ban-ip-addresses",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.banIp],
    }),

    getSingleBanIp: builder.query({
      query: (id) => ({
        url: `/ban-ip-addresses/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.banIp],
    }),

    updateBanIp: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/ban-ip-addresses/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.banIp],
    }),

    deleteBanIp: builder.mutation({
      query: (id) => ({
        url: `/ban-ip-addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.banIp],
    }),
  }),
});

export const {
  useCreateBanIpMutation,
  useGetAllBanIpQuery,
  useGetSingleBanIpQuery,
  useUpdateBanIpMutation,
  useDeleteBanIpMutation,
} = banIpApi;
