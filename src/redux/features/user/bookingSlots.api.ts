import { baseApi } from "../../api/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlelectedSlots: builder.query({
      query: () => ({
        url: "/slots/selectedSlots",
        method: "GET",
      }),
      // providesTags: ["reviews"],
    }),

    createSlelectedSlot: builder.mutation({
      query: (slotData) => ({
        url: "/slots/selectedSlot",
        method: "POST",
        body: slotData,
      }),
      invalidatesTags: ["slot"],
    }),
  }),
});

export const { useGetAllSlelectedSlotsQuery, useCreateSlelectedSlotMutation } =
  reviewApi;
