import React, { useState } from "react";
import { Row, Col, Card, Input, Select, Pagination, Button } from "antd"; // Your RTK Query hook
import { useGetAllFacilitiesQuery } from "../../redux/features/admin/admin.api";
import { Link } from "react-router-dom";
import { FaLocationDot, FaMoneyCheckDollar } from "react-icons/fa6";
import { IoInformationCircleSharp } from "react-icons/io5";
import Lottie from "lottie-react";

import sportLoader from "../../assets/images/sport-loader.json";

const { Search } = Input;
const { Option } = Select;

const FacilitiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState<string | undefined>(
    undefined
  );
  const [page, setPage] = useState(1);

  const getQueryParams = () => {
    const queryParams: { name: string; value: string }[] = [];

    if (searchTerm) {
      queryParams.push({ name: "searchTerm", value: searchTerm });
    }

    if (filterLocation) {
      queryParams.push({
        name: "sort",
        value: filterLocation === "asc" ? "pricePerHour" : "-pricePerHour",
      });
    }

    queryParams.push({ name: "page", value: page.toString() });
    queryParams.push({ name: "limit", value: "6" });

    return queryParams;
  };

  const { data, isLoading } = useGetAllFacilitiesQuery(getQueryParams());

  const metaData = data?.meta;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilterLocation(value);
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[60vh]">
        <Lottie
          animationData={sportLoader}
          loop={true}
          style={{ maxWidth: "300px", height: "300px" }}
        />
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header & Search Bar */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Explore All <span className="text-[#FE7D1F]">Facilities</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
          Find and book the top sports grounds, arenas, and courts in your area.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
          <Search
            placeholder="Search by facility name or location..."
            enterButton="Search"
            size="large"
            allowClear
            onSearch={handleSearch}
            className="w-full sm:w-2/3"
          />
          <Select
            placeholder="Sort by price"
            allowClear
            size="large"
            className="w-full sm:w-1/3"
            onChange={handleFilterChange}
          >
            <Option value="asc">Price: Low to High</Option>
            <Option value="desc">Price: High to Low</Option>
          </Select>
        </div>
      </div>

      {/* Facilities Cards */}
      {data?.data?.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#1e1e1e] rounded-2xl border border-gray-100 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No facilities found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.data?.map((facility, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-[#1e1e1e] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between"
            >
              <div className="relative overflow-hidden h-56 bg-gray-100 dark:bg-gray-800">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={facility?.image}
                  alt={facility?.name}
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-md">
                  <span>${facility.pricePerHour}</span> / hr
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#FE7D1F] transition-colors line-clamp-1">
                    {facility.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-2">
                    {facility.description}
                  </p>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm mt-4">
                    <FaLocationDot className="text-[#FE7D1F]" />
                    <span className="truncate">{facility.location}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                  <Link to={`/facility/${facility._id}`} className="flex-1">
                    <Button
                      icon={<IoInformationCircleSharp size={16} />}
                      className="w-full rounded-lg h-10 font-medium dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                    >
                      Details
                    </Button>
                  </Link>
                  <Link to="/createBooking" className="flex-1">
                    <Button
                      type="primary"
                      style={{ backgroundColor: "#FE7D1F" }}
                      className="w-full rounded-lg h-10 font-medium text-white shadow-md"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <Pagination
          current={page}
          pageSize={metaData?.limit || 6}
          total={metaData?.total || 0}
          onChange={(value) => setPage(value)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default FacilitiesPage;
