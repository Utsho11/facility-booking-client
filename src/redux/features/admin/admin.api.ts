import { TFacility } from "../../../types/facility.types";
import { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacilities: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/facility",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["facility"],
      transformResponse: (response: TResponseRedux<TFacility[]>) => {
        console.log(response.data);

        return {
          data: response.data,
          meta: response.meta,
        };
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
} = adminApi;
