import { baseApi } from "../../api/baseApi";

// Define types for service data
interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface AvailabilityParams {
  date: string;
  serviceId: string;
}

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query<Service[], void>({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      // transformResponse: (response: { data: Service[] }) => response.data,
    }),
    createAService: builder.mutation<Service, Partial<Service>>({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: data,
      }),
      // Optionally, add an `invalidatesTags` property to trigger cache invalidation
      // invalidatesTags: [{ type: 'Service', id: 'LIST' }],
    }),
    getAServiceById: builder.query<Service, string>({
      query: (id: string) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
    }),
    getAvailabilityByDateAndServiceId: builder.query<any, AvailabilityParams>({
      query: ({ date, serviceId }) => ({
        url: `/slots/availability`,
        method: "GET",
        params: { date, serviceId },
      }),
    }),
    updateService: builder.mutation<
      Service,
      { id: string; data: Partial<Service> }
    >({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),

    deleteService: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      // Optionally invalidate the cache to remove deleted service from the UI
      invalidatesTags: ["Services"],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useCreateAServiceMutation,
  useGetAServiceByIdQuery,
  useGetAvailabilityByDateAndServiceIdQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = serviceApi;
