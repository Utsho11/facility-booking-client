import { Button, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useGetAllFacilitiesQuery } from "../../redux/features/admin/admin.api";

const FacilitySection = () => {
  const { data } = useGetAllFacilitiesQuery([
    { name: "limit", value: "6" },
    { name: "page", value: "1" },
  ]);

  return (
    <div style={{ margin: "2rem" }}>
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
              <p>
                <strong>Location:</strong> {facility.location}
              </p>
              <p>
                <strong>Hourly Rate:</strong> ${facility.pricePerHour}
              </p>
              <hr style={{ margin: "1rem" }} />
              <div>
                <Row gutter={8}>
                  <Col>
                    <Link to={`/facility/${facility._id}`}>
                      <Button>Details</Button>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/createBooking">
                      <Button>Book Now</Button>
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
