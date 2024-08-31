import { useForm } from "react-hook-form";
import { TSlot } from "../../types";
import { useLocation } from "react-router-dom";

const Booking = () => {
  const location = useLocation();
  const { selectedSlot, service } = location.state || {};
  console.log("slot data from the previous page", selectedSlot);
  console.log("service data from the previous page", service.data);
  // const { data: slotData, isLoading } = useGetAllSlelectedSlotsQuery([]);

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
  const { name, img, description, price } = service.data;
  const { startTime, endTime } = selectedSlot;
  return (
    <div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 py-24">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-primary mb-4">{name}</h2>
          <img src={img} alt={name} className="rounded-lg shadow-md mb-4" />
          <p className="text-lg text-gray-700 mb-4">{description}</p>
          <p className="text-xl text-gray-900 font-semibold">Price: ${price}</p>
          <p className="text-lg text-gray-700">
            Selected Time: {startTime} - {endTime}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Booking Details
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                User Name
              </label>
              <input
                type="text"
                {...register("userName", { required: "User name is required" })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {/* {errors.userName.message} */}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {/* {errors.email.message} */}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Selected Time
              </label>
              <input
                type="text"
                // value={`${?.startTime} - ${selectedSlotDetails?.endTime}`}
                readOnly
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md shadow-lg hover:bg-hover"
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
