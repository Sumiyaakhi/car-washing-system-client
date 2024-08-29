import { useState } from "react";
import { useGetAllServicesQuery } from "../../redux/features/admin/service.api";
import { TService } from "../../types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Service = () => {
  const { data, isLoading } = useGetAllServicesQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [filter, setFilter] = useState({ minPrice: 0, maxPrice: 1000 });
  console.log(data);
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

  if (!data || data.length === 0) {
    return <p>No services available at the moment.</p>;
  }

  const filteredServices = data.filter((service: TService) => {
    return (
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      service.price >= filter.minPrice &&
      service.price <= filter.maxPrice
    );
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortKey === "priceAsc") {
      return a.price - b.price;
    } else if (sortKey === "priceDesc") {
      return b.price - a.price;
    } else if (sortKey === "durationAsc") {
      return a.duration - b.duration;
    } else if (sortKey === "durationDesc") {
      return b.duration - a.duration;
    } else {
      return 0;
    }
  });

  return (
    <div className="lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl lg:text-4xl text-center font-lora font-extrabold text-white">
          Top Picks: Our Featured Services
        </h2>

        {/* Search and Filter Options */}
        <div className="mt-8 mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 hover:border-primary rounded-lg"
          />
          <div className="flex space-x-4">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Sort by</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="durationAsc">Duration: Short to Long</option>
              <option value="durationDesc">Duration: Long to Short</option>
            </select>
            <input
              type="number"
              placeholder="Min Price"
              value={filter.minPrice}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  minPrice: Number(e.target.value),
                }))
              }
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filter.maxPrice}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  maxPrice: Number(e.target.value),
                }))
              }
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {sortedServices
            .slice(0, 6)
            .map((service: TService, index: number) => (
              <div
                key={index}
                className="group relative bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-full object-cover group-hover:opacity-75"
                />
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {service.description}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 font-bold">
                    Price: ${service.price}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Duration: {service.duration} minutes
                  </p>
                  <div className="text-end">
                    <Link to={`/services/${service._id}`}>
                      <button className="btn bg-primary text-xl text-white hover:bg-hover">
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
