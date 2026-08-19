import FacilitySection from "../components/homeSection/FacilitySection";
import HowItWorks from "../components/homeSection/HowItWorks";
import Slider from "../components/homeSection/Slider";
import Spotlight from "../components/homeSection/Spotlight";
import Testimonials from "../components/homeSection/Testimonials";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  return (
    <div className="bg-gray-50 dark:bg-[#121212] transition-colors duration-300 min-h-screen">
      <Slider />
      <FacilitySection />
      <HowItWorks />
      
      <div className="text-center pt-16 pb-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">
          In The <span className="text-[#FE7D1F]">Spotlight</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base max-w-xl mx-auto">
          Catch up with the latest sporting community events, tips, and facility highlights.
        </p>
      </div>
      <Spotlight />

      <div className="text-center pt-16 pb-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">
          Player <span className="text-[#FE7D1F]">Stories</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base max-w-xl mx-auto">
          Hear what athletes and venue managers have to say about Book My Court.
        </p>
      </div>
      <Testimonials />
      
      <Footer />
    </div>
  );
};

export default HomePage;
