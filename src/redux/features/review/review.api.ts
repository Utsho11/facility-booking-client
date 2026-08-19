import { baseApi } from "../../api/baseApi";
import { TResponseRedux } from "../../../types/global";

export interface TReviewData {
  _id: string;
  facility: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface TFacilityReviewsResponse {
  reviews: TReviewData[];
  avgRating: number;
  totalReviews: number;
}

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFacilityReviews: builder.query<TFacilityReviewsResponse, string>({
      query: (facilityId: string) => ({
        url: `/reviews/${facilityId}`,
        method: "GET",
      }),
      providesTags: ["facility"],
      transformResponse: (response: TResponseRedux<TFacilityReviewsResponse>) => {
        return (
          response?.data ?? {
            reviews: [],
            avgRating: 5.0,
            totalReviews: 0,
          }
        );
      },
    }),
    createReview: builder.mutation({
      query: (data: { facility: string; rating: number; comment: string }) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["facility"],
    }),
  }),
});

export const { useGetFacilityReviewsQuery, useCreateReviewMutation } =
  reviewApi;
