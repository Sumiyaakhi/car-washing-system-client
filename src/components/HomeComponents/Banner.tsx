import { Link } from "react-router-dom";
import img from "../../assets/images/banner.jpg";
import BookingForm from "./BookingForm";
import { PiGreaterThanBold } from "react-icons/pi";

const Banner = () => {
  return (
    <div
      className="pt-32  bg-cover bg-center bg-no-repeat w-full h-screen"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover", // Ensure the image covers the entire area
        backgroundPosition: "center", // Center the image
      }}
    >
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-6xl text-white font-bold text-center xl:pt-48">
          Get Your Car <br /> Cleaned anywhere
        </h1>
        <p className="text-xl lg:text-3xl  text-center text-white lg:pt-4">
          Book a car wash with the BD's largest car wash specialist
        </p>
      </div>
      <BookingForm />
      <div className="flex justify-center items-center gap-1 lg:pt-3 px-3 lg:px-7">
        <Link to="/service">
          {" "}
          <button className="text-xl font-bold  bg-white underline text-primary px-3 lg:px-9 py-2 lg:py-4 hover:bg-hover hover:text-white rounded-md">
            Book A Service
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
