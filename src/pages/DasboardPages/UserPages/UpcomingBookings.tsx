import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import Swal from "sweetalert2";
import { useGetAllbookingsByEmailQuery } from "../../../redux/features/user/bookingSlots.api";
import Countdown from "react-countdown";

interface Booking {
  _id: string;
  service: {
    name: string;
  };
  slot: {
    date: string;
    startTime: string;
    endTime: string;
  };
  vehicleBrand: string;
  vehicleModel: string;
  vehicleType: string;
}

const UpcomingBookings = () => {
  const userEmail = useAppSelector((state) => state.auth.user?.email);
  const { data, error, isLoading } = useGetAllbookingsByEmailQuery(userEmail);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (data?.data) {
      const currentDate = new Date();
      const filteredBookings = data.data.filter((booking: Booking) => {
        const bookingDate = new Date(booking.slot.date);
        return bookingDate > currentDate; // Only show upcoming bookings
      });
      setUpcomingBookings(filteredBookings);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch upcoming bookings.",
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

  const renderer = ({ days, hours, minutes, seconds }: any) => {
    return (
      <div className="flex justify-around text-lg">
        <span>{days}d</span>
        <span>{hours}h</span>
        <span>{minutes}m</span>
        <span>{seconds}s</span>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Upcoming Bookings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingBookings.map((booking: Booking) => {
          const countdownDate = new Date(booking.slot.date).getTime();

          return (
            <div
              key={booking._id}
              className="bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl md:text-3xl text-primary font-semibold mb-2">
                {booking.service.name}
              </h3>
              <p className="text-xl font-bold">
                Date: {new Date(booking.slot.date).toLocaleDateString()}{" "}
              </p>
              <p className="text-xl font-semibold">
                {" "}
                Time Slot: {booking.slot.startTime} - {booking.slot.endTime}
              </p>
              <p className=" font-semibold">
                Vehicle: {booking.vehicleBrand} {booking.vehicleModel} (
                {booking.vehicleType})
              </p>
              <div className="mt-4">
                <p className="font-semibold">Countdown:</p>
                <Countdown date={countdownDate} renderer={renderer} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingBookings;
