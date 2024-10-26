import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const warehouseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createWarehouses: builder.mutation({
      query: (warehouseData) => ({
        url: "/warehouses",
        method: "POST",
        body: warehouseData,
      }),
      invalidatesTags: [tagTypes.warehouse],
    }),

    getAllWarehouses: builder.query({
      query: (params) => ({
        url: "/warehouses",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.warehouse],
    }),

    getSingleWarehouses: builder.query({
      query: (id) => ({
        url: `/warehouses/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.warehouse],
    }),

    updateWarehouses: builder.mutation({
      query: ({ warehouseId, warehouseData }) => {
        return {
          url: `/warehouses/${warehouseId}`,
          method: "PUT",
          body: warehouseData,
        };
      },
      invalidatesTags: [tagTypes.warehouse],
    }),

    deleteWarehouses: builder.mutation({
      query: (warehouseId) => ({
        url: `/warehouses/${warehouseId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.warehouse],
    }),
  }),
});

export const {
  useCreateWarehousesMutation,
  useGetAllWarehousesQuery,
  useGetSingleWarehousesQuery,
  useUpdateWarehousesMutation,
  useDeleteWarehousesMutation,
} = warehouseApi;
