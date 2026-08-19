import { Button, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useGetAllFacilitiesQuery } from "../../redux/features/admin/admin.api";
import { FaLocationDot, FaMoneyCheckDollar } from "react-icons/fa6";
import "./styles/facilitySection.css";
import { IoInformationCircleSharp } from "react-icons/io5";
import Lottie from "lottie-react";
import sportLoader from "../../assets/images/sport-loader.json";

const FacilitySection = () => {
  const { data, isLoading } = useGetAllFacilitiesQuery([
    { name: "limit", value: "6" },
    { name: "page", value: "1" },
  ]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Lottie
          animationData={sportLoader}
          loop={true}
          style={{ maxWidth: "300px", height: "300px" }}
        />
      </div>
    );
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">
          Featured <span className="text-[#FE7D1F]">Facilities</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base max-w-xl mx-auto">
          Explore world-class courts and sports venues ready for your next match.
        </p>
      </div>

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
                    className="w-full rounded-lg h-10 font-medium dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 hover:scale-102"
                  >
                    Details
                  </Button>
                </Link>
                <Link to="/createBooking" className="flex-1">
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#FE7D1F" }}
                    className="w-full rounded-lg h-10 font-medium text-white shadow-md hover:scale-102"
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/facilities">
          <Button
            size="large"
            className="rounded-full px-8 font-semibold hover:scale-105 transition-transform"
          >
            View All Facilities →
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FacilitySection;
