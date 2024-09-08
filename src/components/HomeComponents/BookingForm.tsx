import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

const BookingForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("10:00");

  const onSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="hidden md:flex items-center justify-center gap-0 pt-6"
    >
      <div className="flex flex-col">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <input
          id="location"
          type="text"
          placeholder="Location"
          {...register("location", { required: true })}
          className="border p-2 lg:p-4 rounded-l-md w-full bg-gray-100"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="date" className="sr-only">
          Date
        </label>
        <DatePicker
          id="date"
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date as Date);
            setValue("date", date);
          }}
          className="border p-2 lg:p-4 w-full bg-gray-100"
          placeholderText="Date"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="time" className="sr-only">
          Time
        </label>
        <TimePicker
          id="time"
          value={selectedTime}
          onChange={(time) => {
            setSelectedTime(time as string);
            setValue("time", time);
          }}
          className="border p-2 lg:p-4 w-full bg-gray-100"
          disableClock={true}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="serviceType" className="sr-only">
          Service Type
        </label>
        <select
          id="serviceType"
          {...register("serviceType", { required: true })}
          className="border p-2 lg:p-4 w-full bg-gray-100"
        >
          <option value="Cleaning">Cleaning</option>
          <option value="Repair">Repair</option>
          <option value="Installation">Installation</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-primary hover:bg-hover text-white p-2 lg:p-4 rounded-e-mg lg:w-48 "
      >
        Book your wash now
      </button>
    </form>
  );
};

export default BookingForm;
