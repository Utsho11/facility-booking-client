import { Link, useParams } from "react-router-dom";
import { useGetSingleBookingQuery } from "../../redux/features/user/user.api";
import { Button, Card, Col, Row } from "antd";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";

const BookingDetailsPage = () => {
  const { id } = useParams();

  const { data: booking } = useGetSingleBookingQuery(id as string);

  console.log(booking);

  return (
    <div className="">
      <Card className="facility-card" bordered={false}>
        <Row gutter={[16, 16]} align="middle">
          <Col sm={24} lg={12}>
            <img
              src={booking?.facility?.image}
              alt={booking?.facility?.name}
              className="facility-image"
            />
          </Col>
          <Col sm={24} lg={12}>
            <div className="facility-details">
              <h2>{booking?.facility?.name}</h2>
              <p style={{ color: "#545454" }}>
                {booking?.facility?.description} Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Fugiat nisi aliquam ad quia,
                totam consectetur quos nemo odio vel distinctio perspiciatis
                officiis saepe magni expedita laborum facere enim voluptas
                dolorum.
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <FaLocationDot /> {booking?.facility?.location}
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "3rem" }}
              >
                <p
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <FaCalendarAlt /> {booking?.date}
                </p>

                <p
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <IoIosTime /> {booking?.startTime}-{booking?.endTime}
                </p>
              </div>
              <p>
                <strong>Price:</strong> ${booking?.facility?.pricePerHour} /
                hour
              </p>
              <Row gutter={[8, 8]}>
                <Col>
                  <Link to="/user/myBookings">
                    <Button
                      style={{
                        backgroundColor: "#2c2c2c",
                        color: "#fff",
                        marginTop: "1rem",
                      }}
                      size="large"
                    >
                      Back to My Bookings
                    </Button>
                  </Link>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default BookingDetailsPage;
