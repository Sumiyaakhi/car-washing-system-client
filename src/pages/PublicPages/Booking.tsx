import { useForm } from "react-hook-form";
import { TSlot } from "../../types";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Booking = () => {
  const location = useLocation();
  const { selectedSlot, service } = location.state || {};
  console.log("slot data from the previous page", selectedSlot);
  console.log("service data from the previous page", service.data);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  console.log("this is the user", user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: TSlot) => {
    console.log("Form submitted with data:", data);
    // Implement payment processing logic here
  };

  if (!selectedSlot || selectedSlot.length === 0) {
    return <p>No service or slots available.</p>;
  }
  // const selectedSlots = slotData.data;
  const { name: serviceName, img, description, price } = service.data;
  const { startTime, endTime } = selectedSlot;
  const { name, email, address, phone } = user;
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
          <img src={img} alt={name} className="rounded-lg shadow-md mb-4" />
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
                {...register("userName", { required: "User name is required" })}
                placeholder="Enter your name"
                defaultValue={name}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                defaultValue={email}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="number"
                {...register("phone", { required: "Phone number is required" })}
                placeholder="Enter your phone number"
                defaultValue={phone}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                {...register("address", { required: "Address is required" })}
                placeholder="Enter your Address"
                defaultValue={address}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="selectedTime"
                className="block text-sm font-medium text-gray-700"
              >
                Selected Time
              </label>
              <input
                id="selectedTime"
                type="text"
                value={`${startTime} - ${endTime}`}
                readOnly
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

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
