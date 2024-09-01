import FacilitySection from "../components/homeSection/FacilitySection";
import HowItWorks from "../components/homeSection/HowItWorks";
import Slider from "../components/homeSection/Slider";
import Spotlight from "../components/homeSection/Spotlight";
import Testimonials from "../components/homeSection/Testimonials";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  return (
    <div className="">
      <Slider />
      <FacilitySection />
      <HowItWorks />
      <div style={{ textAlign: "center", margin: "3rem 0" }}>
        <h1>In The Spotlight</h1>
      </div>
      <Spotlight />
      <div style={{ textAlign: "center", margin: "3rem 0" }}>
        <h1>Testimonial</h1>
      </div>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
