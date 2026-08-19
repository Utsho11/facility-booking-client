import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button, Card, Divider, Result, Spin, Tag } from "antd";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaClock,
  FaReceipt,
  FaPrint,
  FaArrowRight,
} from "react-icons/fa";
import confetti from "canvas-confetti";

interface BookingReceipt {
  _id: string;
  transactionId: string;
  facility?: {
    name: string;
    location: string;
    image?: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  payableAmount: number;
  paymentStatus: string;
  isBooked: string;
}

const PaymentStatus: React.FC = () => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const status = searchParams.get("status") || "success";
  const isSuccess = status === "success";

  const [booking, setBooking] = useState<BookingReceipt | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isSuccess) {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe fallback if canvas not available
      }
    }

    if (transactionId) {
      const API_BASE =
        import.meta.env.VITE_API_URL ||
        "https://facility-booking-backend-system.vercel.app/api";

      fetch(`${API_BASE}/payment/verify/${transactionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.success && data?.data) {
            setBooking(data.data);
          }
        })
        .catch((err) => console.error("Error fetching receipt:", err))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [transactionId, isSuccess]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-16 px-4 max-w-3xl mx-auto min-h-[80vh] flex flex-col justify-center">
      <div className="bg-white dark:bg-[#1e1e1e] p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 transition-all">
        {isSuccess ? (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-950/50 text-green-500 rounded-full mb-6 animate-bounce">
              <FaCheckCircle size={48} />
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-base">
              Your court booking has been confirmed and locked.
            </p>

            {/* Receipt Summary Card */}
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700 text-left">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200">
                  <FaReceipt className="text-[#FE7D1F]" />
                  <span>Transaction Receipt</span>
                </div>
                <Tag color="green" className="font-semibold uppercase">
                  PAID
                </Tag>
              </div>

              {isLoading ? (
                <div className="py-8 text-center">
                  <Spin tip="Loading booking confirmation details..." />
                </div>
              ) : (
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Transaction ID:
                    </span>
                    <span className="font-mono font-medium text-gray-800 dark:text-gray-200">
                      {transactionId || booking?.transactionId || "N/A"}
                    </span>
                  </div>

                  {booking?.facility?.name && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Facility:
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {booking.facility.name}
                      </span>
                    </div>
                  )}

                  {booking?.date && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <FaCalendarAlt size={12} /> Play Date:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {booking.date}
                      </span>
                    </div>
                  )}

                  {booking?.startTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <FaClock size={12} /> Time Window:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {booking.startTime} — {booking.endTime}
                      </span>
                    </div>
                  )}

                  <Divider className="my-2 border-gray-200 dark:border-gray-700" />

                  <div className="flex justify-between items-center text-base font-bold">
                    <span className="text-gray-800 dark:text-gray-200">
                      Total Paid:
                    </span>
                    <span className="text-2xl text-[#FE7D1F]">
                      ${booking?.payableAmount || 0}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                icon={<FaPrint />}
                onClick={handlePrint}
                size="large"
                className="w-full sm:w-auto rounded-xl font-medium"
              >
                Print Receipt
              </Button>
              <Link to="/user/myBookings" className="w-full sm:w-auto">
                <Button
                  type="primary"
                  style={{ backgroundColor: "#FE7D1F" }}
                  size="large"
                  className="w-full font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  View My Bookings <FaArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-950/50 text-red-500 rounded-full mb-6">
              <FaTimesCircle size={48} />
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Payment Failed or Cancelled
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-base">
              Your transaction was not completed. No charges were made.
            </p>

            <div className="mt-8 p-4 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-900 text-sm text-red-700 dark:text-red-300">
              Transaction Ref: {transactionId || "N/A"}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/createBooking" className="w-full sm:w-auto">
                <Button
                  type="primary"
                  style={{ backgroundColor: "#FE7D1F" }}
                  size="large"
                  className="w-full font-bold rounded-xl shadow-md"
                >
                  Try Booking Again
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="large" className="w-full rounded-xl font-medium">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
