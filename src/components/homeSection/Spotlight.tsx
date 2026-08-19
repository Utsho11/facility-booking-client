import "./styles/Spotlight.css";
import img1 from "../../assets/images/blog-5-740x560.jpg";
import img2 from "../../assets/images/blog-12-740x560.jpg";
import img3 from "../../assets/images/blog-7-740x560.jpg";
import img4 from "../../assets/images/blog-6-740x560.jpg";
import img5 from "../../assets/images/blog-4-740x560.jpg";

const Spotlight = () => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Featured Big Spotlight */}
        <div className="lg:col-span-6 group bg-white dark:bg-[#1e1e1e] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="overflow-hidden h-72">
            <img
              src={img1}
              alt="Spotlight 1"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FE7D1F]">
              <span>Featured Story</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 dark:text-gray-400">By Admin</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-2 group-hover:text-[#FE7D1F] transition-colors leading-snug">
              Local Communities Celebrate Grand Opening of New Premier Multi-Sport Arenas
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 line-clamp-3">
              Explore how state-of-the-art facilities are empowering athletes of all ages with cutting-edge equipment and automated booking convenience.
            </p>
          </div>
        </div>

        {/* 4 Smaller Spotlights Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="group bg-white dark:bg-[#1e1e1e] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="overflow-hidden h-36">
              <img
                src={img2}
                alt="Spotlight 2"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold text-[#FE7D1F]">Training Tips</span>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-1 group-hover:text-[#FE7D1F] transition-colors line-clamp-2">
                5 Essential Warm-Up Routines Before Stepping Onto The Court
              </h3>
            </div>
          </div>

          <div className="group bg-white dark:bg-[#1e1e1e] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="overflow-hidden h-36">
              <img
                src={img3}
                alt="Spotlight 3"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold text-[#FE7D1F]">Community</span>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-1 group-hover:text-[#FE7D1F] transition-colors line-clamp-2">
                Weekend Tournaments: Building Team Spirit Through Sports
              </h3>
            </div>
          </div>

          <div className="group bg-white dark:bg-[#1e1e1e] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="overflow-hidden h-36">
              <img
                src={img4}
                alt="Spotlight 4"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold text-[#FE7D1F]">Venue Guide</span>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-1 group-hover:text-[#FE7D1F] transition-colors line-clamp-2">
                How to Pick The Perfect Court Surface for Your Playing Style
              </h3>
            </div>
          </div>

          <div className="group bg-white dark:bg-[#1e1e1e] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="overflow-hidden h-36">
              <img
                src={img5}
                alt="Spotlight 5"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold text-[#FE7D1F]">Youth League</span>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-1 group-hover:text-[#FE7D1F] transition-colors line-clamp-2">
                Youth Sports Development: Nurturing Future Champions
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;
