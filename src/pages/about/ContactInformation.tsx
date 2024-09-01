import { Card, Col, Row } from "antd";
import { MailOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";
const ContactInformation = () => (
  <section className="contact-section">
    <h2>Contact Us</h2>
    <Row gutter={[16, 16]} justify="center">
      <Col xs={24} sm={12} md={8}>
        <Card>
          <HomeOutlined style={{ fontSize: "24px", marginBottom: "10px" }} />
          <p>1234 Sports St, City, Country</p>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card>
          <PhoneOutlined style={{ fontSize: "24px", marginBottom: "10px" }} />
          <p>+1 234 567 890</p>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card>
          <MailOutlined style={{ fontSize: "24px", marginBottom: "10px" }} />
          <p>info@sportsbooking.com</p>
        </Card>
      </Col>
    </Row>
  </section>
);
export default ContactInformation;
