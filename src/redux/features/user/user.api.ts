// import { TQueryParam } from "../../../types/global";
import { TBooking } from "../../../types/facility.types";
import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => ({
        url: "auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    getAllBookingForUser: builder.query<TBooking[], void>({
      query: () => ({
        url: "bookings/user",
        method: "GET",
      }),
      providesTags: ["booking"],
      transformResponse: (response: TResponseRedux<TBooking[]>) => {
        return response?.data ?? [];
      },
    }),
    getSingleBooking: builder.query<TBooking, string>({
      query: (id: string) => ({
        url: `/bookings/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TBooking>) => {
        if (!response?.data) {
          throw new Error("Booking data not found");
        }
        return response.data;
      },
    }),
    cancelBooking: builder.mutation({
      query: (id: string) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["booking"],
    }),
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useAddUserMutation,
  useGetMeQuery,
  useGetAllBookingForUserQuery,
  useCancelBookingMutation,
  useGetSingleBookingQuery,
} = userApi;
