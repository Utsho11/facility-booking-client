import { Button, Carousel } from "antd";
import Typewriter from "typewriter-effect";
import slider1 from "../../assets/images/h1-slider01.jpg";
import slider2 from "../../assets/images/h1-slider02.jpg";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBolt, FaShieldAlt, FaStar, FaTrophy } from "react-icons/fa";

const Slider = () => (
  <div className="relative">
    <Carousel autoplay effect="fade" autoplaySpeed={5000}>
      {/* Slide 1 */}
      <div>
        <div
          className="relative min-h-[560px] sm:min-h-[640px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${slider1})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/85 backdrop-blur-[2px]"></div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 animate-pulse">
              <FaBolt className="text-[#FE7D1F]" /> Premier Sports Reservation Platform
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Reserve World-Class Courts For{" "}
              <span className="text-[#FE7D1F]">
                <Typewriter
                  options={{
                    strings: [
                      "Tennis Arenas",
                      "Badminton Courts",
                      "FIFA Turf Football",
                      "NBA Basketball",
                      "Olympic Swimming",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-lg max-w-2xl mx-auto mt-4 font-normal">
              Real-time slot availability, instant booking confirmation, and zero double-booking collisions.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/createBooking" className="w-full sm:w-auto">
                <Button
                  type="primary"
                  style={{ backgroundColor: "#FE7D1F" }}
                  size="large"
                  className="w-full sm:w-auto font-bold h-12 px-8 rounded-xl shadow-xl hover:scale-105 transition-transform text-base border-none flex items-center justify-center gap-2"
                >
                  Book A Court Now <FaArrowRight size={14} />
                </Button>
              </Link>
              <Link to="/facilities" className="w-full sm:w-auto">
                <Button
                  size="large"
                  className="w-full sm:w-auto font-semibold h-12 px-8 rounded-xl bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md transition-all text-base"
                >
                  Explore All Venues
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 2 */}
      <div>
        <div
          className="relative min-h-[560px] sm:min-h-[640px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${slider2})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/85 backdrop-blur-[2px]"></div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">
              <FaTrophy className="text-[#FE7D1F]" /> Level Up Your Play
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Play Anytime, Anywhere With{" "}
              <span className="text-[#FE7D1F]">Guaranteed Availability</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-lg max-w-2xl mx-auto mt-4 font-normal">
              Select your play date, pick your free slot visually, and receive instant digital gate pass receipts.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/createBooking" className="w-full sm:w-auto">
                <Button
                  type="primary"
                  style={{ backgroundColor: "#FE7D1F" }}
                  size="large"
                  className="w-full sm:w-auto font-bold h-12 px-8 rounded-xl shadow-xl hover:scale-105 transition-transform text-base border-none flex items-center justify-center gap-2"
                >
                  Book Visual Slots <FaArrowRight size={14} />
                </Button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <Button
                  size="large"
                  className="w-full sm:w-auto font-semibold h-12 px-8 rounded-xl bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md transition-all text-base"
                >
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Carousel>

    {/* Floating Feature Bar */}
    <div className="relative -mt-10 z-20 max-w-5xl mx-auto px-4">
      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="flex flex-col items-center">
          <FaStar className="text-[#FE7D1F] mb-1" size={20} />
          <span className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">4.9 / 5.0</span>
          <span className="text-xs text-gray-400">Player Rating</span>
        </div>
        <div className="flex flex-col items-center">
          <FaBolt className="text-[#FE7D1F] mb-1" size={20} />
          <span className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">Instant Lock</span>
          <span className="text-xs text-gray-400">Live Slot Sync</span>
        </div>
        <div className="flex flex-col items-center">
          <FaTrophy className="text-[#FE7D1F] mb-1" size={20} />
          <span className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">50+ Arenas</span>
          <span className="text-xs text-gray-400">Certified Quality</span>
        </div>
        <div className="flex flex-col items-center">
          <FaShieldAlt className="text-[#FE7D1F] mb-1" size={20} />
          <span className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">0% Collisions</span>
          <span className="text-xs text-gray-400">Overlap Protected</span>
        </div>
      </div>
    </div>
  </div>
);

export default Slider;
