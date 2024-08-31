import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),
    createAService: builder.mutation({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: data,
      }),
    }),
    getAServiceById: builder.query({
      query: (id: string) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
    }),
    getAvailabilityByDateAndServiceId: builder.query({
      query: ({ date, serviceId }) => ({
        url: `/slots/availability`,
        method: "GET",
        params: { date, serviceId },
      }),
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useCreateAServiceMutation,
  useGetAServiceByIdQuery,
  useGetAvailabilityByDateAndServiceIdQuery,
} = serviceApi;
