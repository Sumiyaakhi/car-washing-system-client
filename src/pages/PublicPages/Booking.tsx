import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useCreateBookingMutation } from "../../redux/features/user/bookingSlots.api";

const Booking = () => {
  const location = useLocation();

  const [createBooking] = useCreateBookingMutation();
  const { selectedSlot, service } = location.state || {};
  const user = useAppSelector((state) => state.auth?.user);

  const { name, email, address, phone } = user || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: name || "",
      email: email || "",
      address: address || "",
      phone: phone || "",
      vehicleType: "car",
      vehicleBrand: "Toyota",
      vehicleModel: "Camry",
      manufacturingYear: 2020,
      registrationPlate: "ABC123",
    },
  });

  const onSubmit = async (data) => {
    try {
      const bookingPayload = {
        customer: {
          name: data.userName,
          email: data.email,
          phone: data.phone,
          address: data.address,
        },
        serviceId: service.data._id,
        slotId: selectedSlot._id,
        vehicleType: data.vehicleType,
        vehicleBrand: data.vehicleBrand,
        vehicleModel: data.vehicleModel,
        manufacturingYear: data.manufacturingYear,
        registrationPlate: data.registrationPlate,
        selectedSlot,
      };

      const bookingResult = await createBooking(bookingPayload).unwrap();
      if (bookingResult.success) {
        window.location.href = bookingResult.data.paymentUrl;
      }
    } catch (error) {
      console.error("Booking or Payment Error:", error);
    }
  };

  if (!selectedSlot || !service) {
    return (
      <div className="text-center py-28">
        <h1 className="text-3xl font-bold text-red-600">
          No service or slot selected.
        </h1>
        <p className="text-xl mt-4">
          Please go back to the services page and select a service and time slot
          to proceed with your booking.
        </p>
      </div>
    );
  }

  const { name: serviceName, img, description, price } = service.data;
  const { startTime, endTime } = selectedSlot;

  return (
    <div className="pt-12 md:pt-24">
      <h1 className="text-xl md:text-4xl text-primary font-bold text-center">
        See your booking here
      </h1>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-primary mb-4">
            {serviceName}
          </h2>
          <img
            src={img}
            alt={serviceName}
            className="rounded-lg shadow-md mb-4"
          />
          <p className="text-lg text-gray-700 mb-4">{description}</p>
          <p className="text-xl text-gray-900 font-semibold">Price: ${price}</p>
          <p className="text-lg text-gray-700">
            Selected Time: {startTime} - {endTime}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-primary text-center my-4">
            Booking Details
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* User Form Fields */}
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700"
              >
                User Name
              </label>
              <input
                id="userName"
                type="text"
                {...register("userName", {
                  required: "User name is required",
                })}
                placeholder="Enter your name"
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>
            {/* Other input fields here */}

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:bg-hover transition duration-300"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
