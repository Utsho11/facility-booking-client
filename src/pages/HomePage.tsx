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
      <Spotlight />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
