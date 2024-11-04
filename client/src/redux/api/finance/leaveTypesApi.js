import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const leaveTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLeaveTypes: builder.mutation({
      query: (data) => ({
        url: "/leave-types",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.leaveType],
    }),

    getAllLeaveTypes: builder.query({
      query: (params) => ({
        url: "/leave-types",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.leaveType],
    }),

    getSingleLeaveTypes: builder.query({
      query: (id) => ({
        url: `/leave-types/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.leaveType],
    }),

    updateLeaveTypes: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/leave-types/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.leaveType],
    }),

    deleteLeaveTypes: builder.mutation({
      query: (id) => ({
        url: `/leave-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.leaveType],
    }),
  }),
});

export const {
  useCreateLeaveTypesMutation,
  useGetAllLeaveTypesQuery,
  useGetSingleLeaveTypesQuery,
  useUpdateLeaveTypesMutation,
  useDeleteLeaveTypesMutation,
} = leaveTypesApi;
