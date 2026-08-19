import React from "react";
import {
  FaCalendarCheck,
  FaCheckCircle,
  FaMoneyCheckAlt,
  FaTrophy,
  FaBolt,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaClock,
} from "react-icons/fa";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useGetAllBookingForUserQuery,
  useGetMeQuery,
} from "../../redux/features/user/user.api";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { Link } from "react-router-dom";
import { Button, Col, Row, Tag } from "antd";
import avatar from "../../assets/images/avatar-male-man-svgrepo-com.png";

const UserDashBoard: React.FC = () => {
  const token = useAppSelector(useCurrentToken);

  let user: TUser | null = null;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  const { data: meData, isLoading } = useGetMeQuery(user?.userEmail);
  const { data: userBookings } = useGetAllBookingForUserQuery();

  const totalBookings = userBookings?.length || 0;
  const confirmedBookings =
    userBookings?.filter((b: any) => b.isBooked === "confirmed")?.length || 0;
  const totalSpent =
    userBookings
      ?.filter((b: any) => b.paymentStatus === "paid")
      ?.reduce((acc: number, curr: any) => acc + (curr.payableAmount || 0), 0) || 0;

  const estimatedHours = totalBookings * 2;
  const loyaltyPoints = totalBookings * 50;

  if (isLoading) {
    return (
      <div className="p-12 text-center text-gray-500">
        Loading Athlete Dashboard...
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Athlete Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-orange-500 via-[#FE7D1F] to-amber-500 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2">
            <FaBolt /> Athlete Command Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Welcome Back, {meData?.data?.name || "Player"}!
          </h1>
          <p className="text-orange-100 text-xs sm:text-sm mt-1">
            Track your upcoming court slots, digital game receipts, and athlete reward tier.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/createBooking">
            <Button
              type="default"
              icon={<FaBolt size={12} />}
              className="h-11 px-5 rounded-xl font-bold bg-white text-[#FE7D1F] hover:bg-orange-50 border-none shadow-md"
            >
              Book A Court
            </Button>
          </Link>
          <Link to="/user/myBookings">
            <Button className="h-11 px-5 rounded-xl font-bold bg-black/30 hover:bg-black/40 text-white border-white/30 backdrop-blur-md">
              My Reservations
            </Button>
          </Link>
        </div>
      </div>

      {/* Athlete Metrics */}
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Confirmed Slots</span>
              <div className="p-2.5 rounded-2xl bg-green-100 dark:bg-green-950/50 text-green-600">
                <FaCheckCircle size={18} />
              </div>
            </div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-3">
              {confirmedBookings}
            </h3>
            <p className="text-xs font-semibold text-green-600 dark:text-green-400 mt-2">
              Ready for game day
            </p>
          </div>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Hours on Court</span>
              <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-950/50 text-blue-600">
                <FaClock size={18} />
              </div>
            </div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-3">
              {estimatedHours} hrs
            </h3>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-2">
              Total play duration
            </p>
          </div>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Loyalty Tier</span>
              <div className="p-2.5 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-600">
                <FaTrophy size={18} />
              </div>
            </div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-3">
              {loyaltyPoints} pts
            </h3>
            <p className="text-xs font-semibold text-[#FE7D1F] mt-2">
              Gold Athlete Status
            </p>
          </div>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Total Investment</span>
              <div className="p-2.5 rounded-2xl bg-purple-100 dark:bg-purple-950/50 text-purple-600">
                <FaMoneyCheckAlt size={18} />
              </div>
            </div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-3">
              ${totalSpent}
            </h3>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-2">
              Across all reservations
            </p>
          </div>
        </Col>
      </Row>

      {/* Main Grid: Profile & Upcoming Match Schedule */}
      <Row gutter={[24, 24]}>
        {/* Left Column: Player Profile */}
        <Col xs={24} lg={8}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm text-center">
            <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-tr from-orange-500 to-amber-400 shadow-lg mb-4">
              <img
                src={avatar}
                alt="Player Avatar"
                className="w-full h-full rounded-full bg-white dark:bg-gray-800 object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {meData?.data?.name || "Player Member"}
            </h3>
            <span className="inline-block mt-1 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/50 text-[#FE7D1F] text-xs font-bold uppercase">
              Verified Athlete
            </span>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3 text-left text-xs sm:text-sm">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <FaEnvelope className="text-[#FE7D1F] shrink-0" />
                <span className="truncate">{meData?.data?.email || "player@auracourt.com"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <FaPhoneAlt className="text-[#FE7D1F] shrink-0" />
                <span>+88 {meData?.data?.phone || "01811000000"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <FaMapMarkerAlt className="text-[#FE7D1F] shrink-0" />
                <span>{meData?.data?.address || "Dhaka, Bangladesh"}</span>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <Link to="/createBooking" className="block">
                <Button
                  type="primary"
                  style={{ backgroundColor: "#FE7D1F" }}
                  className="w-full font-bold h-11 rounded-xl shadow-md"
                >
                  Reserve Next Match
                </Button>
              </Link>
              <Link to="/facilities" className="block">
                <Button className="w-full font-bold h-11 rounded-xl">
                  Explore Venues
                </Button>
              </Link>
            </div>
          </div>
        </Col>

        {/* Right Column: Upcoming Match Schedule */}
        <Col xs={24} lg={16}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  My Reservation Schedule
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Your active and upcoming court bookings.
                </p>
              </div>
              <Link to="/user/myBookings">
                <Button size="small" className="font-bold text-xs rounded-lg">
                  View All ({totalBookings})
                </Button>
              </Link>
            </div>

            {userBookings?.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
                <p className="text-gray-400 text-sm mb-4">You have no reservations scheduled yet.</p>
                <Link to="/createBooking">
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#FE7D1F" }}
                    className="font-bold rounded-xl"
                  >
                    Book Your First Court
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {userBookings?.slice(0, 5)?.map((booking: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-orange-300 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900 dark:text-white">
                          {booking.facility?.name || "Sports Arena"}
                        </span>
                        <Tag color={booking.isBooked === "confirmed" ? "green" : "volcano"}>
                          {booking.isBooked}
                        </Tag>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        📅 {booking.date} &nbsp;•&nbsp; ⏰ {booking.startTime} - {booking.endTime}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200 dark:border-gray-700">
                      <span className="font-black text-sm text-gray-900 dark:text-white">
                        ${booking.payableAmount}
                      </span>
                      <Link to={`/payment-status?transactionId=${booking.transactionId}&status=${booking.paymentStatus === "paid" ? "success" : "failed"}`}>
                        <Button size="small" className="rounded-lg text-xs font-medium">
                          Receipt Pass
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashBoard;
