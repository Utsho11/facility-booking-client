import React, { useState } from "react";
import { Input, Select, Pagination, Button, Tag, Rate } from "antd";
import { useGetAllFacilitiesQuery } from "../../redux/features/admin/admin.api";
import { Link } from "react-router-dom";
import { FaLocationDot, FaStar, FaBolt, FaCheck } from "react-icons/fa6";
import { IoInformationCircleSharp } from "react-icons/io5";
import Lottie from "lottie-react";
import sportLoader from "../../assets/images/sport-loader.json";

const { Search } = Input;
const { Option } = Select;

const categories = [
  { label: "All Arenas", value: "all", icon: "🏟️" },
  { label: "Tennis", value: "tennis", icon: "🎾" },
  { label: "Badminton", value: "badminton", icon: "🏸" },
  { label: "Football", value: "football", icon: "⚽" },
  { label: "Basketball", value: "basketball", icon: "🏀" },
  { label: "Swimming", value: "swimming", icon: "🏊" },
  { label: "Cricket", value: "cricket", icon: "🏏" },
  { label: "Squash", value: "squash", icon: "🎯" },
  { label: "Volleyball", value: "volleyball", icon: "🏐" },
];

const FacilitiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  const getQueryParams = () => {
    const queryParams: { name: string; value: string }[] = [];

    if (searchTerm) {
      queryParams.push({ name: "searchTerm", value: searchTerm });
    }

    if (sortOrder) {
      queryParams.push({
        name: "sort",
        value: sortOrder === "asc" ? "pricePerHour" : "-pricePerHour",
      });
    }

    queryParams.push({ name: "page", value: page.toString() });
    queryParams.push({ name: "limit", value: "9" });

    return queryParams;
  };

  const { data, isLoading } = useGetAllFacilitiesQuery(getQueryParams());
  const metaData = data?.meta;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const filteredFacilities = data?.data?.filter((facility: any) => {
    if (selectedCategory === "all") return true;
    return (
      facility.category?.toLowerCase() === selectedCategory.toLowerCase() ||
      facility.name?.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });

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
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-[#FE7D1F] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-xs">
          AuraCourt Arena Catalog
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Explore Certified <span className="text-[#FE7D1F]">Sports Arenas</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm sm:text-base">
          Filter by sport category, inspect verified player ratings, and lock in your visual time slots instantly.
        </p>

        {/* Search & Sort Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
          <Search
            placeholder="Search venue name, sport, or district..."
            enterButton="Search"
            size="large"
            allowClear
            onSearch={handleSearch}
            className="w-full sm:w-2/3"
          />
          <Select
            placeholder="Sort by Rate"
            allowClear
            size="large"
            className="w-full sm:w-1/3"
            onChange={(val) => {
              setSortOrder(val);
              setPage(1);
            }}
          >
            <Option value="asc">Price: Low to High</Option>
            <Option value="desc">Price: High to Low</Option>
          </Select>
        </div>
      </div>

      {/* Category Filter Pills Bar */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {categories.map((cat, idx) => {
          const isSelected = selectedCategory === cat.value;
          return (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat.value)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-[#FE7D1F] text-white shadow-md shadow-orange-500/25 scale-105"
                  : "bg-white dark:bg-[#1e1e1e] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-orange-300"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Facility Grid */}
      {filteredFacilities?.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#1e1e1e] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm max-w-xl mx-auto">
          <p className="text-gray-500 dark:text-gray-400 text-base font-medium">
            No sports arenas found matching this category.
          </p>
          <Button
            type="primary"
            style={{ backgroundColor: "#FE7D1F" }}
            onClick={() => setSelectedCategory("all")}
            className="mt-4 font-bold rounded-xl"
          >
            Reset Filter
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFacilities?.map((facility: any, index: number) => (
            <div
              key={index}
              className="group bg-white dark:bg-[#1e1e1e] rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative overflow-hidden h-60 bg-gray-100 dark:bg-gray-800">
                <img
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  src={facility?.image}
                  alt={facility?.name}
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-md capitalize">
                  <span>{facility.category || "Arena"}</span>
                </div>
                <div className="absolute top-3 right-3 bg-[#FE7D1F] text-white font-black px-3.5 py-1 rounded-full text-xs shadow-md">
                  ${facility.pricePerHour} / hr
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-lg font-extrabold text-gray-900 dark:text-white group-hover:text-[#FE7D1F] transition-colors line-clamp-1">
                      {facility.name}
                    </h3>
                  </div>

                  {/* Rating Overview */}
                  <div className="flex items-center gap-2 text-xs text-amber-500 font-bold mb-2">
                    <Rate disabled defaultValue={facility.rating || 4.8} allowHalf style={{ fontSize: 13 }} />
                    <span className="text-gray-500 dark:text-gray-400">
                      ({facility.reviewsCount || 18} reviews)
                    </span>
                  </div>

                  <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 leading-relaxed">
                    {facility.description}
                  </p>

                  {/* Amenities Preview */}
                  {facility.amenities && facility.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {facility.amenities.slice(0, 3).map((amenity: string, aIdx: number) => (
                        <span
                          key={aIdx}
                          className="px-2 py-0.5 rounded-md bg-orange-50 dark:bg-orange-950/40 text-[#FE7D1F] text-[10px] font-bold"
                        >
                          ✓ {amenity}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-xs mt-3">
                    <FaLocationDot className="text-[#FE7D1F] shrink-0" />
                    <span className="truncate">{facility.location}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                  <Link to={`/facility/${facility._id}`} className="flex-1">
                    <Button
                      icon={<IoInformationCircleSharp size={15} />}
                      className="w-full rounded-xl h-10 font-bold dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                    >
                      Details
                    </Button>
                  </Link>
                  <Link to={`/createBooking?facilityId=${facility._id}`} className="flex-1">
                    <Button
                      type="primary"
                      style={{ backgroundColor: "#FE7D1F" }}
                      className="w-full rounded-xl h-10 font-bold text-white shadow-md hover:scale-102 transition-transform border-none"
                    >
                      Book Slot
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-14 flex justify-center">
        <Pagination
          current={page}
          pageSize={metaData?.limit || 9}
          total={metaData?.total || 0}
          onChange={(value) => setPage(value)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default FacilitiesPage;
