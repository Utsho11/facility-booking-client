import React from "react";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";
import {
  FaTrophy,
  FaUsers,
  FaShieldAlt,
  FaBolt,
  FaCheckCircle,
  FaArrowRight,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import user1 from "../../assets/images/User-1.avif";
import user2 from "../../assets/images/User-2.avif";
import user3 from "../../assets/images/User-3.webp";

const stats = [
  { label: "Active Athletes", value: "15,000+", icon: <FaUsers className="text-[#FE7D1F]" size={24} /> },
  { label: "Premier Venues", value: "85+", icon: <FaTrophy className="text-[#FE7D1F]" size={24} /> },
  { label: "Bookings Completed", value: "120,000+", icon: <FaBolt className="text-[#FE7D1F]" size={24} /> },
  { label: "Player Satisfaction", value: "99.4%", icon: <FaShieldAlt className="text-[#FE7D1F]" size={24} /> },
];

const pillars = [
  {
    title: "Instant Court Discovery",
    desc: "Find and lock in premium badminton, tennis, football, and basketball courts near you in under 60 seconds.",
    icon: "⚡",
  },
  {
    title: "Double-Booking Prevention",
    desc: "Our real-time interval scheduling engine ensures 0% overlap collisions and instant availability updates.",
    icon: "🛡️",
  },
  {
    title: "Transparent Player Pricing",
    desc: "Zero hidden maintenance fees. What you see per hour is exactly what you pay with instant digital receipts.",
    icon: "💎",
  },
  {
    title: "Vibrant Sports Community",
    desc: "Connect with local sports clubs, join tournaments, and read verified reviews from active community players.",
    icon: "🤝",
  },
];

const team = [
  {
    name: "Alex Martinez",
    role: "Founder & CEO",
    photoUrl: user1,
    bio: "Former collegiate athlete with 10+ years scaling modern sports tech ecosystems.",
  },
  {
    name: "Sophia Chen",
    role: "Chief Technology Officer",
    photoUrl: user2,
    bio: "Full-stack architect specializing in distributed real-time booking reservation systems.",
  },
  {
    name: "David Kim",
    role: "Head of Venue Operations",
    photoUrl: user3,
    bio: "Passionate sports organizer overseeing facility certifications and player safety standards.",
  },
];

const milestones = [
  {
    year: "2023",
    title: "The Vision",
    desc: "Founded by athletes frustrated with manual phone reservations and double-booked courts.",
  },
  {
    year: "2024",
    title: "Multi-Venue Expansion",
    desc: "Onboarded over 50 premier arenas and integrated automated digital payment gateways.",
  },
  {
    year: "2025",
    title: "Smart Booking Studio",
    desc: "Launched our visual court picker and community review ecosystem, serving 15,000+ players.",
  },
];

const About = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-[#FE7D1F] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-xs">
          About BookMyCourt
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          Empowering Athletes Through{" "}
          <span className="text-[#FE7D1F]">Seamless Court Access</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-base sm:text-lg leading-relaxed">
          We are on a mission to make world-class sports facilities accessible to every athlete, team, and enthusiast with zero friction, guaranteed availability, and modern digital booking.
        </p>
      </div>

      {/* Metric Stats Cards */}
      <Row gutter={[20, 20]} className="mb-20">
        {stats.map((stat, idx) => (
          <Col xs={24} sm={12} lg={6} key={idx}>
            <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/40 mb-3">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                {stat.value}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 mt-1">
                {stat.label}
              </p>
            </div>
          </Col>
        ))}
      </Row>

      {/* Core Mission & Pillars */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Why Players Choose <span className="text-[#FE7D1F]">BookMyCourt</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Engineered for high performance, reliability, and ultimate player convenience.
          </p>
        </div>

        <Row gutter={[24, 24]}>
          {pillars.map((pillar, idx) => (
            <Col xs={24} md={12} key={idx}>
              <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm h-full hover:-translate-y-1 transition-transform">
                <span className="text-3xl mb-4 block">{pillar.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Milestones Timeline */}
      <div className="mb-20 bg-gradient-to-br from-orange-50/50 to-amber-50/30 dark:from-[#1e1e1e] dark:to-[#171717] p-8 sm:p-12 rounded-3xl border border-orange-100 dark:border-gray-800">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Our Journey So Far
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">
            How we grew from an athletic frustration to the premier booking platform.
          </p>
        </div>

        <Row gutter={[24, 24]}>
          {milestones.map((m, idx) => (
            <Col xs={24} md={8} key={idx}>
              <div className="bg-white dark:bg-[#252525] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-full">
                <span className="inline-block px-3 py-1 bg-[#FE7D1F] text-white font-bold text-xs rounded-full mb-3">
                  {m.year}
                </span>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {m.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Leadership Team */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Meet the <span className="text-[#FE7D1F]">Leadership</span> Team
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            The athletes and engineers driving our sports booking revolution.
          </p>
        </div>

        <Row gutter={[24, 24]}>
          {team.map((member, idx) => (
            <Col xs={24} sm={12} lg={8} key={idx}>
              <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm text-center p-6 hover:shadow-lg transition-all group">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-orange-100 dark:border-orange-950">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-[#FE7D1F] uppercase tracking-wider mt-0.5">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Bottom CTA Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-[#FE7D1F] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          Ready to Step Onto the Court?
        </h2>
        <p className="text-orange-100 text-sm sm:text-base max-w-xl mx-auto mb-6">
          Explore our certified venues, view live slot availability, and reserve your playtime today.
        </p>
        <Link to="/facilities">
          <Button
            size="large"
            className="bg-white text-[#FE7D1F] hover:bg-gray-100 font-bold px-8 h-12 rounded-xl shadow-lg border-none hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            Explore All Courts <FaArrowRight size={14} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default About;
