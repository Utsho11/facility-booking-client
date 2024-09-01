import { Card, Button, Col, Row } from "antd";
import "./styles/FacilityCard.css";
import { useGetSingleFacilityQuery } from "../../redux/features/admin/admin.api";
import { useParams } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";

const FacilityDetailsPage = () => {
  const { id: facilityId } = useParams();

  const { data: facility, isLoading } = useGetSingleFacilityQuery(
    facilityId as string
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Card className="facility-card" bordered={false}>
      <Row gutter={[16, 16]} align="middle">
        <Col sm={24} lg={12}>
          <img
            src={facility?.image}
            alt={facility?.name}
            className="facility-image"
          />
        </Col>
        <Col sm={24} lg={12}>
          <div className="facility-details">
            <h2>{facility?.name}</h2>
            <p style={{ color: "#545454" }}>
              {facility?.description} Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Fugiat nisi aliquam ad quia, totam consectetur
              quos nemo odio vel distinctio perspiciatis officiis saepe magni
              expedita laborum facere enim voluptas dolorum.
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <FaLocationDot /> {facility?.location}
            </p>
            <p>
              <strong>Price:</strong> ${facility?.pricePerHour} / hour
            </p>
            <Row gutter={[8, 8]}>
              <Col>
                <Button
                  style={{ backgroundColor: "#fe7d1f", color: "#fff" }}
                  size="large"
                >
                  Book Now
                </Button>
              </Col>
              <Col>
                <Button size="large">Go to Facilities</Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default FacilityDetailsPage;
