import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCompany: builder.mutation({
      query: (data) => ({
        url: "/company",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.company],
    }),

    getSingleCompany: builder.query({
      query: ({ id }) => ({
        url: `/company/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.company],
    }),

    updateCompany: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/company/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.company],
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
} = companyApi;
