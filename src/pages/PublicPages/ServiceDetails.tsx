import { useGetAServiceByIdQuery } from "../../redux/features/admin/service.api";
import { useParams } from "react-router-dom";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: service, isLoading } = useGetAServiceByIdQuery(id);
  console.log(service);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (!service || service.length === 0) {
    return <p>No services available at the moment.</p>;
  }
  const { name, price, img, duration, description } = service.data;
  return (
    <div className="max-w-5xl mx-auto md:py-24">
      <div className="hero bg-base-200 ">
        <div className="hero-content flex">
          <img src={img} className=" rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">{name}</h1>
            <p className="py-6">{description}</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
