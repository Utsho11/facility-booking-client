import React from "react";
import { Link } from "react-router-dom";
import {
  FaBolt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaShieldAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Input, Button } from "antd";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f0f0f] text-gray-400 border-t border-gray-800 transition-colors">
      {/* Top Banner / Newsletter */}
      <div className="border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#1c1c1c] to-[#252525] p-6 sm:p-8 rounded-3xl border border-gray-800">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-[#FE7D1F] text-xs font-bold uppercase mb-2">
                <FaBolt /> VIP Player Access
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Stay In The Game With <span className="text-[#FE7D1F]">AuraCourt</span>
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                Receive instant priority alerts when premier weekend court slots open up.
              </p>
            </div>
            <div className="flex w-full md:w-auto max-w-md gap-2">
              <Input
                placeholder="Enter your athlete email..."
                className="rounded-xl h-11 bg-[#141414] border-gray-700 text-white placeholder-gray-500"
              />
              <Button
                type="primary"
                style={{ backgroundColor: "#FE7D1F" }}
                className="h-11 px-6 font-bold rounded-xl shadow-md border-none shrink-0"
              >
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-orange-600 via-[#FE7D1F] to-amber-400 flex items-center justify-center text-white shadow-md">
                <FaBolt size={18} />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                AuraCourt <span className="text-[#FE7D1F]">Pro</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              The premier athletic arena reservation engine. Experience frictionless visual slot booking, real-time double-booking prevention, and instant digital gate passes.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#FE7D1F] text-white flex items-center justify-center transition-colors">
                <FaFacebookF size={13} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#FE7D1F] text-white flex items-center justify-center transition-colors">
                <FaTwitter size={13} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#FE7D1F] text-white flex items-center justify-center transition-colors">
                <FaInstagram size={13} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#FE7D1F] text-white flex items-center justify-center transition-colors">
                <FaLinkedinIn size={13} />
              </a>
            </div>
          </div>

          {/* Sports Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Featured Arenas
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/facilities" className="hover:text-[#FE7D1F] transition-colors">
                  Championship Tennis Courts
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-[#FE7D1F] transition-colors">
                  BWF Teakwood Badminton
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-[#FE7D1F] transition-colors">
                  FIFA Certified Turf Pitches
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-[#FE7D1F] transition-colors">
                  Hardwood Basketball Arenas
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-[#FE7D1F] transition-colors">
                  Olympic Swimming Centers
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/createBooking" className="hover:text-[#FE7D1F] transition-colors">
                  Visual Booking Studio
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-[#FE7D1F] transition-colors">
                  All Sports Venues
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FE7D1F] transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FE7D1F] transition-colors">
                  Help & Concierge Desk
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#FE7D1F] transition-colors">
                  Athlete & Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Operations Hub
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-[#FE7D1F] mt-0.5 shrink-0" />
                <span>Savar Sports Enclave, Level 5, Dhaka 1340</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaPhoneAlt className="text-[#FE7D1F] shrink-0" />
                <span>+88 01718-888662</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaEnvelope className="text-[#FE7D1F] shrink-0" />
                <span>concierge@auracourt.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-gray-800/60 py-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} AuraCourt Pro. All rights reserved.</p>
          <div className="flex items-center gap-2 text-gray-400">
            <FaShieldAlt className="text-green-500" />
            <span>256-Bit SSL Encrypted Reservations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
