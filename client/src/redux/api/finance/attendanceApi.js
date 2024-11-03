import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAttendance: builder.mutation({
      query: (data) => ({
        url: "/attendance",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.attendance],
    }),

    getAllAttendance: builder.query({
      query: (params) => ({
        url: "/attendance",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.attendance],
    }),

    getSingleAttendance: builder.query({
      query: (id) => ({
        url: `/attendance/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.attendance],
    }),

    updateAttendance: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/attendance/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.attendance],
    }),

    updateAttendanceApproval: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/attendance/${id}/approval`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.attendance],
    }),

    deleteAttendance: builder.mutation({
      query: (id) => ({
        url: `/attendance/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.attendance],
    }),
  }),
});

export const {
  useCreateAttendanceMutation,
  useGetAllAttendanceQuery,
  useGetSingleAttendanceQuery,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
  useUpdateAttendanceApprovalMutation,
} = attendanceApi;
