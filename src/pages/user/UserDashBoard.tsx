import { FaHome, FaPhoneAlt, FaCalendarCheck, FaCheckCircle, FaMoneyCheckAlt } from "react-icons/fa";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useGetAllBookingForUserQuery, useGetMeQuery } from "../../redux/features/user/user.api";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "antd";
import avatar from "../../assets/images/avatar-male-man-svgrepo-com.png";
import "./styles/Dashboard.css";

const UserDashBoard = () => {
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  const { data, isLoading } = useGetMeQuery(user?.userEmail);
  const { data: userBookings } = useGetAllBookingForUserQuery();

  const totalBookings = userBookings?.length || 0;
  const confirmedBookings =
    userBookings?.filter((b) => b.isBooked === "confirmed")?.length || 0;
  const totalSpent =
    userBookings
      ?.filter((b) => b.paymentStatus === "paid")
      ?.reduce((acc, curr) => acc + (curr.payableAmount || 0), 0) || 0;

  if (isLoading) {
    return <p className="p-8 text-center">Loading dashboard...</p>;
  }

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      {/* Top Metrics Row */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={8}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
            <div className="p-4 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-[#FE7D1F]">
              <FaCalendarCheck size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Bookings</p>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                {totalBookings}
              </h3>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={8}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
            <div className="p-4 rounded-xl bg-green-100 dark:bg-green-950/40 text-green-500">
              <FaCheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Confirmed Slots</p>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                {confirmedBookings}
              </h3>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={8}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
            <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-blue-500">
              <FaMoneyCheckAlt size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                ${totalSpent}
              </h3>
            </div>
          </div>
        </Col>
      </Row>

      {/* User Profile Card */}
      <div className="flex justify-center">
        <div className="profile-card bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl">
          <div className="">
            <img className="avatar-icon" src={avatar} alt="User avatar" />
          </div>
          <div className="headings">
            <p className="name text-gray-900 dark:text-white font-bold">
              {data?.data?.name || "Member"}
            </p>
            <p className="role text-xs uppercase font-semibold text-[#FE7D1F]">
              ({data?.data?.role})
            </p>
          </div>
          <div className="info">
            <ul className="contact-info space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-[#FE7D1F]" />
                <p>+88 {data?.data?.phone}</p>
              </li>
              <li className="flex items-center gap-2">
                <MdEmail className="text-[#FE7D1F]" />
                <p>{data?.data?.email}</p>
              </li>
              <li className="flex items-center gap-2">
                <FaLocationDot className="text-[#FE7D1F]" />
                <p>{data?.data?.address}</p>
              </li>
            </ul>
          </div>
          <hr className="profile-card-divider my-4 border-gray-200 dark:border-gray-800" />
          <div className="flex justify-center gap-3">
            <Link to="/user/myBookings">
              <Button type="primary" style={{ backgroundColor: "#FE7D1F" }}>
                My Bookings
              </Button>
            </Link>
            <Link to="/createBooking">
              <Button>Book a Court</Button>
            </Link>
            <Link to="/">
              <Button icon={<FaHome />}>Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
