import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const leavesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLeaves: builder.mutation({
      query: (data) => ({
        url: "/leaves",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.leaveApply],
    }),

    getAllLeaves: builder.query({
      query: (params) => ({
        url: "/leaves",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.leaveApply],
    }),

    getSingleLeaves: builder.query({
      query: (id) => ({
        url: `/leaves/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.leaveApply],
    }),

    updateLeaves: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/leaves/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.leaveApply],
    }),

    updateLeaveApproval: builder.mutation({
      query: ({ id, status }) => {
        return {
          url: `/leaves/${id}/approval`,
          method: "PATCH",
          body: { status },
        };
      },
      invalidatesTags: [tagTypes.leaveApply],
    }),

    deleteLeaves: builder.mutation({
      query: (id) => ({
        url: `/leaves/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.leaveApply],
    }),
  }),
});

export const {
  useCreateLeavesMutation,
  useGetAllLeavesQuery,
  useGetSingleLeavesQuery,
  useUpdateLeavesMutation,
  useUpdateLeaveApprovalMutation,
  useDeleteLeavesMutation,
} = leavesApi;
