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
      <Lottie
        animationData={sportLoader}
        loop={true}
        style={{ maxWidth: "100%", height: "100vh" }}
      />
    );
  }

  return (
    <div className="facility-section">
      <div style={{ textAlign: "center", margin: "1rem 0" }}>
        <h1>Facilities</h1>
      </div>
      <Row gutter={[16, 16]}>
        {data?.data?.map((facility, index) => (
          <Col key={index} xs={24} sm={12} lg={8}>
            <Card
              title={facility.name}
              bordered={false}
              hoverable
              style={{ width: "100%", height: "100%" }}
            >
              <img className="facility-card-img" src={facility?.image} />
              <p style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <FaLocationDot />
                <strong>{facility.location}</strong>
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <FaMoneyCheckDollar />
                <strong>{facility.pricePerHour}$</strong>
              </p>
              <hr style={{ margin: "1rem 0" }} />
              <div>
                <Row gutter={8}>
                  <Col>
                    <Link to={`/facility/${facility._id}`}>
                      <Button>
                        <IoInformationCircleSharp />
                        Details
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/createBooking">
                      <Button
                        style={{ backgroundColor: "#fe7d1f", color: "#fff" }}
                      >
                        Book Now
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FacilitySection;
