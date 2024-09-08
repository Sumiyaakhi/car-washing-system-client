import { useGetAllServicesQuery } from "../../redux/features/admin/service.api";
import { TService } from "../../types";
interface ServiceApiResponse {
  data: TService[];
  isLoading: boolean;
  error: string;
}
const FeaturedService = () => {
  const { data, isLoading, error } =
    useGetAllServicesQuery<ServiceApiResponse>(undefined);

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

  if (error) {
    return <p>Error loading services. Please try again later.</p>;
  }

  if (!data || data.length === 0) {
    return <p>No services available at the moment.</p>;
  }
  // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
  const services = data.data;
  console.log(services);

  return (
    <div className="bg-primary">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl lg:text-4xl text-center font-lora font-extrabold text-white">
          Top Picks: Our Featured Services
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {services.slice(0, 6).map((service: TService, index: number) => (
            <div
              key={service._id || index}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden"
            >
              {service.img && ( // Check if image URL exists
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-full object-cover group-hover:opacity-75"
                />
              )}
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedService;
