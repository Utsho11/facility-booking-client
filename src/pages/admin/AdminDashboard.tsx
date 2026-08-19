import { FaHome, FaPhoneAlt, FaCalendarCheck, FaBuilding, FaDollarSign } from "react-icons/fa";
import "./styles/Dashboard.css";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import avatar from "../../assets/images/avatar-male-man-svgrepo-com.png";
import { Button, Card, Col, Row, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetMeQuery } from "../../redux/features/user/user.api";
import { useGetAllBookingForAdminQuery, useGetAllFacilitiesQuery } from "../../redux/features/admin/admin.api";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const AdminDashboard = () => {
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  const { data, isLoading } = useGetMeQuery(user?.userEmail);
  const { data: facilitiesData } = useGetAllFacilitiesQuery([]);
  const { data: bookingsData } = useGetAllBookingForAdminQuery();

  const totalFacilities = facilitiesData?.data?.length || 0;
  const totalBookings = bookingsData?.length || 0;
  const totalRevenue =
    bookingsData
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
              <FaBuilding size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Facilities</p>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                {totalFacilities}
              </h3>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={8}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
            <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-blue-500">
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
              <FaDollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Paid Revenue</p>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                ${totalRevenue}
              </h3>
            </div>
          </div>
        </Col>
      </Row>

      {/* Admin Profile Card */}
      <div className="flex justify-center">
        <div className="profile-card bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl">
          <div className="">
            <img className="avatar-icon" src={avatar} alt="Admin avatar" />
          </div>
          <div className="headings">
            <p className="name text-gray-900 dark:text-white font-bold">
              {data?.data?.name || "Administrator"}
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
            <Link to="/admin/allBookings">
              <Button type="primary" style={{ backgroundColor: "#FE7D1F" }}>
                View Bookings
              </Button>
            </Link>
            <Link to="/">
              <Button icon={<FaHome />}>Go Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
