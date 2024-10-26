import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const warrantiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createWarranties: builder.mutation({
      query: (warrantiesData) => ({
        url: "/warranties",
        method: "POST",
        body: warrantiesData,
      }),
      invalidatesTags: [tagTypes.warranties],
    }),

    getAllWarranties: builder.query({
      query: (params) => ({
        url: "/warranties",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.warranties],
    }),

    getSingleWarranties: builder.query({
      query: (id) => ({
        url: `/warranties/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.warranties],
    }),

    updateWarranties: builder.mutation({
      query: ({ warrantiesId, warrantiesData }) => {
        return {
          url: `/warranties/${warrantiesId}`,
          method: "PUT",
          body: warrantiesData,
        };
      },
      invalidatesTags: [tagTypes.warranties],
    }),

    deleteWarranties: builder.mutation({
      query: (warrantiesId) => ({
        url: `/warranties/${warrantiesId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.warranties],
    }),
  }),
});

export const {
  useCreateWarrantiesMutation,
  useGetAllWarrantiesQuery,
  useGetSingleWarrantiesQuery,
  useUpdateWarrantiesMutation,
  useDeleteWarrantiesMutation,
} = warrantiesApi;
