import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import Swal from "sweetalert2";
import { useGetAllbookingsByEmailQuery } from "../../../redux/features/user/bookingSlots.api";

const PastBookings = () => {
  const userEmail = useAppSelector((state) => state.auth.user?.email);
  const { data, error, isLoading } = useGetAllbookingsByEmailQuery(userEmail);
  const [pastBookings, setPastBookings] = useState([]);

  useEffect(() => {
    if (data && data.data) {
      const bookings = data.data;
      const currentDate = new Date();
      const filteredBookings = bookings.filter((booking) => {
        const bookingDate = new Date(booking.slot.date);
        return bookingDate < currentDate;
      });
      setPastBookings(filteredBookings);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      let errorMessage = "Failed to fetch past bookings.";
      if (error.status === 404) {
        errorMessage = "No bookings found for this user.";
      } else if (error.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (error.status === 401) {
        errorMessage = "Unauthorized access. Please login.";
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center lg:py-32">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (!pastBookings || pastBookings.length === 0) {
    return <div>No past bookings found.</div>;
  }
  console.log(pastBookings);
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl md:text-3xl text-primary font-semibold text-center mb-6">
        Past Bookings
      </h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left">Service</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Slot Time</th>
            <th className="py-2 px-4 text-left">Vehicle</th>
            <th className="py-2 px-4 text-left">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {pastBookings.map((booking) => (
            <tr key={booking._id} className="border-b">
              <td className="py-2 px-4">{booking.service.name}</td>
              <td className="py-2 px-4">
                {new Date(booking.slot.date).toLocaleDateString()}
              </td>
              <td className="py-2 px-4">
                {booking.slot.startTime} - {booking.slot.endTime}
              </td>
              <td className="py-2 px-4">
                {booking.vehicleBrand} {booking.vehicleModel} (
                {booking.vehicleType})
              </td>
              <td className="py-2 px-4 text-green-500">
                {booking.paymentStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastBookings;
