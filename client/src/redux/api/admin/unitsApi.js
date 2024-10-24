import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const unitsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUnit: builder.mutation({
      query: (unitData) => ({
        url: "/units",
        method: "POST",
        body: unitData,
      }),
      invalidatesTags: [tagTypes.units],
    }),

    getAllUnits: builder.query({
      query: (params) => ({
        url: "/units",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.units],
    }),

    getSingleUnit: builder.query({
      query: (id) => ({
        url: `/units/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.units],
    }),

    updateUnit: builder.mutation({
      query: ({ unitId, unitData }) => {
        return {
          url: `/units/${unitId}`,
          method: "PUT",
          body: unitData,
        };
      },
      invalidatesTags: [tagTypes.units],
    }),

    deleteUnit: builder.mutation({
      query: (unitId) => ({
        url: `/units/${unitId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.units],
    }),
  }),
});

export const {
  useCreateUnitMutation,
  useGetAllUnitsQuery,
  useGetSingleUnitQuery,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
} = unitsApi;
