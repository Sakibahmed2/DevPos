import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const promoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPromo: builder.mutation({
      query: (promoData) => ({
        url: "/promo",
        method: "POST",
        body: promoData,
      }),
      invalidatesTags: [tagTypes.promo],
    }),

    getAllPromo: builder.query({
      query: (params) => ({
        url: "/promo",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.promo],
    }),

    getSinglePromo: builder.query({
      query: (id) => ({
        url: `/promo/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.promo],
    }),

    updatePromo: builder.mutation({
      query: ({ promoId, promoData }) => {
        return {
          url: `/promo/${promoId}`,
          method: "PUT",
          body: promoData,
        };
      },
      invalidatesTags: [tagTypes.promo],
    }),

    deletePromo: builder.mutation({
      query: (promoId) => ({
        url: `/promo/${promoId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.promo],
    }),
  }),
});

export const {
  useCreatePromoMutation,
  useGetAllPromoQuery,
  useGetSinglePromoQuery,
  useUpdatePromoMutation,
  useDeletePromoMutation,
} = promoApi;
