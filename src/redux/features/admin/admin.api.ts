import { TFacility } from "../../../types/facility.types";
import { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacilities: builder.query({
      query: (args) => {
        console.log(args);
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
      transformResponse: (response: TResponseRedux<TFacility[]>) => {
        console.log(response.data);

        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const { useGetAllFacilitiesQuery } = adminApi;
