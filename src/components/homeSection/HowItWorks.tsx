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
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">
          How It <span className="text-[#FE7D1F]">Works</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base max-w-xl mx-auto">
          Book your favorite sport court in just 5 quick and simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="group relative bg-white dark:bg-[#1e1e1e] rounded-2xl p-5 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center"
          >
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#FE7D1F] text-white font-bold flex items-center justify-center text-sm shadow-md group-hover:scale-110 transition-transform">
              {index + 1}
            </div>
            <div className="w-24 h-24 mb-4 flex items-center justify-center p-2 rounded-xl bg-orange-50 dark:bg-gray-800 group-hover:bg-orange-100 dark:group-hover:bg-gray-700 transition-colors">
              <img
                alt={step.title}
                src={step.imageUrl}
                className="max-h-16 object-contain transform group-hover:scale-105 transition-transform"
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-2">
              {step.title.replace(/^Step \d+:\s*/, "")}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
