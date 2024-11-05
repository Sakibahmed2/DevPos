import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const holidaysApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createHolidays: builder.mutation({
      query: (data) => ({
        url: "/holidays",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.holidays],
    }),

    getAllHolidays: builder.query({
      query: (params) => ({
        url: "/holidays",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.holidays],
    }),

    getSingleHolidays: builder.query({
      query: (id) => ({
        url: `/holidays/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.holidays],
    }),

    updateHolidays: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/holidays/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.holidays],
    }),

    deleteHolidays: builder.mutation({
      query: (id) => ({
        url: `/holidays/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.holidays],
    }),
  }),
});

export const {
  useCreateHolidaysMutation,
  useGetAllHolidaysQuery,
  useGetSingleHolidaysQuery,
  useUpdateHolidaysMutation,
  useDeleteHolidaysMutation,
} = holidaysApi;
