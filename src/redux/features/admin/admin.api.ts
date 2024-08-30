import { TBooking, TFacility } from "../../../types/facility.types";
import { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacilities: builder.query({
      query: (args = []) => {
        const params = new URLSearchParams();

        if (args && args.length > 0) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url:
            args && args.length > 0
              ? `/facility?${params.toString()}`
              : "/facility",
          method: "GET",
        };
      },
      providesTags: ["facility"],
      transformResponse: (response: TResponseRedux<TFacility[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAllBookingForAdmin: builder.query<TBooking[], void>({
      query: () => ({
        url: "bookings",
        method: "GET",
      }),
      providesTags: ["booking"],
      transformResponse: (response: TResponseRedux<TBooking[]>) => {
        return response?.data ?? [];
      },
    }),
    getSingleFacility: builder.query<TFacility, string>({
      query: (id: string) => ({
        url: `/facility/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TFacility>) => {
        if (!response?.data) {
          throw new Error("Facility data not found");
        }
        return response.data;
      },
    }),
    addFacility: builder.mutation({
      query: (data) => ({
        url: "/facility",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["facility"],
    }),
    updateFacility: builder.mutation({
      query: (args) => ({
        url: `/facility/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["facility"],
    }),
    deleteFacility: builder.mutation({
      query: (id: string) => ({
        url: `/facility/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["facility"],
    }),
  }),
});

export const {
  useGetAllFacilitiesQuery,
  useAddFacilityMutation,
  useDeleteFacilityMutation,
  useGetSingleFacilityQuery,
  useUpdateFacilityMutation,
  useGetAllBookingForAdminQuery,
} = adminApi;
