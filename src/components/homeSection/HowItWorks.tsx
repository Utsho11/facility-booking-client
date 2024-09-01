import React from "react";
import { Row, Col, Card } from "antd";
import step1 from "../../assets/images/step-1.png";
import step2 from "../../assets/images/step-2.png";
import step3 from "../../assets/images/step-3.png";
import step4 from "../../assets/images/step-4.png";
import step5 from "../../assets/images/step-5.png";
import "./styles/HowItWorks.css";

interface StepProps {
  imageUrl: string;
  title: string;
}

const steps: StepProps[] = [
  { imageUrl: step1, title: "Step 1: Choose a Facility." },
  { imageUrl: step2, title: "Step 2: Check Availability." },
  { imageUrl: step3, title: "Step 3: Select facility and Proceed To Book." },
  { imageUrl: step4, title: "Step 4: Select a Payment Option and Pay." },
  { imageUrl: step5, title: "Step 5: Submit OTP and Click Success." },
];

const HowItWorks: React.FC = () => {
  return (
    <div className="how-it-works">
      <h2>How It Works</h2>
      <Row gutter={[16, 24]} justify="center">
        {steps.map((step, index) => (
          <Col xs={24} lg={24} key={index}>
            <Card
              hoverable
              cover={
                <img
                  alt={step.title}
                  src={step.imageUrl}
                  className="step-image"
                />
              }
              className="how-it-works-card"
            >
              <Card.Meta title={step.title} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HowItWorks;
