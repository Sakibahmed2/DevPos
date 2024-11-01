import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const designationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDesignations: builder.mutation({
      query: (data) => ({
        url: "/designations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.designations],
    }),

    getAllDesignations: builder.query({
      query: (params) => ({
        url: "/designations",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.designations],
    }),

    getSingleDesignations: builder.query({
      query: (id) => ({
        url: `/designations/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.designations],
    }),

    updateDesignations: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/designations/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.designations],
    }),

    deleteDesignations: builder.mutation({
      query: (id) => ({
        url: `/designations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.designations],
    }),
  }),
});

export const {
  useCreateDesignationsMutation,
  useGetAllDesignationsQuery,
  useGetSingleDesignationsQuery,
  useUpdateDesignationsMutation,
  useDeleteDesignationsMutation,
} = designationsApi;
