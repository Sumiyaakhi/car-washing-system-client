import { baseApi } from "../../api/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllbookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      // providesTags: ["reviews"],
    }),

    createBooking: builder.mutation({
      query: (slotData) => ({
        url: "/bookings",
        method: "POST",
        body: slotData,
      }),
      // invalidatesTags: ["slot"],
    }),
  }),
});

export const { useCreateBookingMutation, useGetAllbookingsQuery } = bookingApi;
