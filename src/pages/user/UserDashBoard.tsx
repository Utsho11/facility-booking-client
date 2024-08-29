import { FaHome, FaPhoneAlt } from "react-icons/fa";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useGetMeQuery } from "../../redux/features/user/user.api";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Button } from "antd";
import avatar from "../../assets/images/avatar-male-man-svgrepo-com.png";
import "./styles/Dashboard.css";

const UserDashBoard = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  const { data, isLoading } = useGetMeQuery(user?.userEmail);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{
        padding: "3rem 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="profile-card">
        <div className="">
          <img className="avatar-icon " src={avatar} alt="" />
        </div>
        <div className="headings">
          <p className="name">Hello, Mr.{data?.data?.name}</p>
          <p className="role">
            {"("}
            {data?.data?.role}
            {")"}
          </p>
        </div>
        <div className="info">
          <ul className="contact-info">
            <li>
              <FaPhoneAlt />
              <p>+88 {data?.data?.phone}</p>
            </li>
            <li>
              <MdEmail />
              <p>{data?.data?.email}</p>
            </li>

            <li>
              <FaLocationDot />
              <p>{data?.data?.address}</p>
            </li>
          </ul>
        </div>
        <hr className="profile-card-divider" />
        <div className="">
          <Link to="/">
            <Button>
              <FaHome />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
