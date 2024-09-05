import { useState } from "react";
import Swal from "sweetalert2";
import {
  useGetSlotsQuery,
  useUpdateSlotMutation,
} from "../../../redux/features/admin/slot.api";
import { TSlot } from "../../../types";

const SlotManagement = () => {
  const { data: slotsResponse, isLoading: slotsLoading } = useGetSlotsQuery();
  const [updateSlot] = useUpdateSlotMutation();
  const [selectedSlot, setSelectedSlot] = useState<TSlot | null>(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("available");

  // Open modal and populate form with selected slot data
  const handleEditSlot = (slot: TSlot) => {
    setSelectedSlot(slot);
    setDate(slot.date);
    setStartTime(slot.startTime);
    setEndTime(slot.endTime);

    // Correctly map slot's booking status
    setStatus(status);
  };

  // Update slot with form data
  const handleSaveChanges = async () => {
    if (!selectedSlot) return;

    try {
      // Update slot with the collected form data
      await updateSlot({
        id: selectedSlot._id,
        data: {
          date,
          startTime,
          endTime,
          isBooked: status,
        },
      }).unwrap();

      Swal.fire({
        title: "Success",
        text: "Slot details updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      setSelectedSlot(null); // Close the modal
    } catch (error) {
      console.error("Failed to update slot:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update slot details.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (slotsLoading) {
    return (
      <div className="flex items-center justify-center lg:py-32">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  const slots = slotsResponse?.data;

  return (
    <div>
      <h2 className="text-xl md:text-3xl text-primary text-center font-semibold mb-4">
        Slot Management
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full bg-white md:p-8">
          <thead className="text-xl">
            <tr>
              <th>Service Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot: TSlot) => (
              <tr key={slot._id}>
                <td>{slot.service.name}</td>
                <td>{slot.date}</td>
                <td>
                  {slot.startTime} - {slot.endTime}
                </td>
                <td>{slot.isBooked}</td>
                <td className="flex space-x-2">
                  <button
                    className="btn bg-primary text-white hover:bg-hover"
                    onClick={() => handleEditSlot(slot)}
                    disabled={slot.isBooked === "booked"} // Only allow editing if not booked
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Slot Modal */}
      {selectedSlot && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Edit Slot</h3>
            <div className="form-group mt-2">
              <label>Date</label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <label>Start Time</label>
              <input
                type="time"
                className="input input-bordered w-full"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <label>End Time</label>
              <input
                type="time"
                className="input input-bordered w-full"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <label>Status</label>
              <select
                className="input input-bordered w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={selectedSlot.isBooked === "booked"} // Disable status change if already booked
              >
                <option value="available">AVAILABLE</option>
                <option value="canceled">CANCELLED</option>
              </select>
            </div>
            <div className="modal-action">
              <button
                className="btn bg-primary text-white hover:bg-hover"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              <button className="btn" onClick={() => setSelectedSlot(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotManagement;
