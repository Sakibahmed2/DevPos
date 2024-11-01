import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const shiftsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShifts: builder.mutation({
      query: (data) => ({
        url: "/shifts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.shifts],
    }),

    getAllShifts: builder.query({
      query: (params) => ({
        url: "/shifts",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.shifts],
    }),

    getSingleShifts: builder.query({
      query: (id) => ({
        url: `/shifts/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.shifts],
    }),

    updateShifts: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/shifts/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.shifts],
    }),

    deleteShifts: builder.mutation({
      query: (id) => ({
        url: `/shifts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.shifts],
    }),
  }),
});

export const {
  useCreateShiftsMutation,
  useGetAllShiftsQuery,
  useGetSingleShiftsQuery,
  useUpdateShiftsMutation,
  useDeleteShiftsMutation,
} = shiftsApi;
