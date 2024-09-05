import { baseApi } from "../../api/baseApi";
import { TSlot } from "../../../types";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation for creating a new slot
    createASlot: builder.mutation<TSlot, Partial<TSlot>>({
      query: (data) => ({
        url: "/services/slots",
        method: "POST",
        body: data,
      }),
      // Invalidate the 'Slots' tag to trigger a refetch of slot data
      invalidatesTags: ["Slots"],
    }),

    // Query for fetching all slots
    getSlots: builder.query<TSlot[], void>({
      query: () => ({
        url: "/slots",
        method: "GET",
      }),
      // Provide the 'Slots' tag for this query
      providesTags: ["Slots"],
    }),

    // Mutation for updating a slot
    updateSlot: builder.mutation<TSlot, { id: string; data: Partial<TSlot> }>({
      query: ({ id, data }) => ({
        url: `/slots/${id}`,
        method: "PUT",
        body: data,
      }),
      // Invalidate the 'Slots' tag to refetch slot data after update
      invalidatesTags: ["Slots"],
    }),
  }),
});

export const {
  useGetSlotsQuery,
  useUpdateSlotMutation,
  useCreateASlotMutation,
} = slotApi;

export default slotApi;
