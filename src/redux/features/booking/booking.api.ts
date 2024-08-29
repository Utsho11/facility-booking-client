import { TDate, TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkAvailability: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/check-availability",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TDate[]>) => {
        return {
          data: response.data,
        };
      },
    }),
    createBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCheckAvailabilityQuery, useCreateBookingMutation } =
  bookingApi;
