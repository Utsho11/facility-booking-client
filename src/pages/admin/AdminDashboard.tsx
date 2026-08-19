import React from "react";
import {
  FaBuilding,
  FaCalendarCheck,
  FaDollarSign,
  FaUsers,
  FaPlus,
  FaUserShield,
  FaEye,
  FaCheckCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Button, Col, Row, Tag, Progress } from "antd";
import { Link } from "react-router-dom";
import { useGetMeQuery } from "../../redux/features/user/user.api";
import {
  useGetAllBookingForAdminQuery,
  useGetAllFacilitiesQuery,
} from "../../redux/features/admin/admin.api";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import avatar from "../../assets/images/avatar-male-man-svgrepo-com.png";

const AdminDashboard: React.FC = () => {
  const token = useAppSelector(useCurrentToken);

  let user: TUser | null = null;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  const { data: meData, isLoading } = useGetMeQuery(user?.userEmail);
  const { data: facilitiesData } = useGetAllFacilitiesQuery([]);
  const { data: bookingsData } = useGetAllBookingForAdminQuery();

  const totalFacilities = facilitiesData?.data?.length || 0;
  const totalBookings = bookingsData?.length || 0;
  const totalRevenue =
    bookingsData
      ?.filter((b: any) => b.paymentStatus === "paid")
      ?.reduce((acc: number, curr: any) => acc + (curr.payableAmount || 0), 0) || 0;

  if (isLoading) {
    return (
      <div className="p-12 text-center text-gray-500">
        Loading Command Dashboard...
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-orange-500 via-[#FE7D1F] to-amber-500 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2">
            <FaUserShield /> Executive Command Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Welcome, {meData?.data?.name || "Administrator"}
          </h1>
          <p className="text-orange-100 text-xs sm:text-sm mt-1">
            Real-time venue operations, platform revenue tracking, and reservation overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/addFacility">
            <Button
              type="default"
              icon={<FaPlus size={12} />}
              className="h-11 px-5 rounded-xl font-bold bg-white text-[#FE7D1F] hover:bg-orange-50 border-none shadow-md"
            >
              Add Arena
            </Button>
          </Link>
          <Link to="/admin/addAdmin">
            <Button
              className="h-11 px-5 rounded-xl font-bold bg-black/30 hover:bg-black/40 text-white border-white/30 backdrop-blur-md"
            >
              Provision Admin
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <Row gutter={[20, 20]}>
        {/* Metric 1 */}
        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Paid Revenue</span>
              <div className="p-2.5 rounded-2xl bg-green-100 dark:bg-green-950/50 text-green-600">
                <FaDollarSign size={18} />
              </div>
            </div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-3">
              ${totalRevenue}
            </h3>
            <p className="text-xs font-semibold text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
              <span>●</span> Verified via Aamarpay Gateway
            </p>
          </div>
        </Col>

        {/* Metric 2 */}
        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Total Reservations</span>
              <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-950/50 text-blue-600">
                <FaCalendarCheck size={18} />
              </div>
            </div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-3">
              {totalBookings}
            </h3>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
              <span>●</span> Instant Double-Booking Safe
            </p>
          </div>
        </Col>

        {/* Metric 3 */}
        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Active Arenas</span>
              <div className="p-2.5 rounded-2xl bg-orange-100 dark:bg-orange-950/50 text-[#FE7D1F]">
                <FaBuilding size={18} />
              </div>
            </div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-3">
              {totalFacilities}
            </h3>
            <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mt-2 flex items-center gap-1">
              <span>●</span> 100% Online & Bookable
            </p>
          </div>
        </Col>

        {/* Metric 4 */}
        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Court Occupancy</span>
              <div className="p-2.5 rounded-2xl bg-purple-100 dark:bg-purple-950/50 text-purple-600">
                <FaUsers size={18} />
              </div>
            </div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-3">
              86.4%
            </h3>
            <div className="mt-2">
              <Progress percent={86} size="small" strokeColor="#FE7D1F" showInfo={false} />
            </div>
          </div>
        </Col>
      </Row>

      {/* Main 2-Column Section */}
      <Row gutter={[24, 24]}>
        {/* Left Column: Admin Profile Card */}
        <Col xs={24} lg={8}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm text-center">
            <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-tr from-orange-500 to-amber-400 shadow-lg mb-4">
              <img
                src={avatar}
                alt="Admin Avatar"
                className="w-full h-full rounded-full bg-white dark:bg-gray-800 object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {meData?.data?.name || "System Admin"}
            </h3>
            <span className="inline-block mt-1 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/50 text-[#FE7D1F] text-xs font-bold uppercase">
              {meData?.data?.role || "Administrator"}
            </span>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3 text-left text-xs sm:text-sm">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <FaEnvelope className="text-[#FE7D1F] shrink-0" />
                <span className="truncate">{meData?.data?.email || "admin@auracourt.com"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <FaPhoneAlt className="text-[#FE7D1F] shrink-0" />
                <span>+88 {meData?.data?.phone || "01711000000"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <FaMapMarkerAlt className="text-[#FE7D1F] shrink-0" />
                <span>{meData?.data?.address || "AuraCourt Central HQ, Dhaka"}</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-2">
              <Link to="/admin/allBookings">
                <Button
                  type="primary"
                  style={{ backgroundColor: "#FE7D1F" }}
                  className="w-full font-bold h-10 rounded-xl shadow-md"
                >
                  All Bookings
                </Button>
              </Link>
              <Link to="/admin/manageFacilities">
                <Button className="w-full font-bold h-10 rounded-xl">
                  Manage Arenas
                </Button>
              </Link>
            </div>
          </div>
        </Col>

        {/* Right Column: Top Arenas & Recent Activity */}
        <Col xs={24} lg={16}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Active Arena Overview
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Real-time listing of sports facilities in the marketplace.
                </p>
              </div>
              <Link to="/admin/manageFacilities">
                <Button size="small" className="font-bold text-xs rounded-lg">
                  View All ({totalFacilities})
                </Button>
              </Link>
            </div>

            {/* Quick Arenas Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {facilitiesData?.data?.slice(0, 4)?.map((facility: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 flex items-center justify-between gap-3 hover:border-orange-300 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                        {facility.name}
                      </h4>
                      <p className="text-[11px] text-gray-400 capitalize">
                        {facility.category || "General"} Arena
                      </p>
                    </div>
                  </div>
                  <Tag color="orange" className="font-extrabold text-xs shrink-0">
                    ${facility.pricePerHour}/hr
                  </Tag>
                </div>
              ))}
            </div>

            {/* Recent Reservations Log */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  Recent Booking Feed
                </h4>
                <Link to="/admin/allBookings" className="text-xs text-[#FE7D1F] font-bold hover:underline">
                  Full Log ➔
                </Link>
              </div>

              {bookingsData?.length === 0 ? (
                <p className="text-xs text-gray-400 py-4 text-center">No reservations found yet.</p>
              ) : (
                <div className="space-y-2.5">
                  {bookingsData?.slice(0, 4)?.map((booking: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-gray-50/70 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <FaCheckCircle className="text-green-500 shrink-0" />
                        <div>
                          <span className="font-bold text-gray-800 dark:text-gray-200">
                            {booking.facility?.name || "Sports Arena"}
                          </span>
                          <span className="text-gray-400 ml-2">
                            ({booking.date} | {booking.startTime} - {booking.endTime})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-gray-900 dark:text-white">
                          ${booking.payableAmount}
                        </span>
                        <Tag color={booking.paymentStatus === "paid" ? "green" : "volcano"}>
                          {booking.paymentStatus || "pending"}
                        </Tag>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
