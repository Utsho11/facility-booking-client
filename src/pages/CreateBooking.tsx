import React, { useEffect, useState } from "react";
import { Button, Col, Row, Tag } from "antd";
import { useGetAllFacilitiesQuery } from "../redux/features/admin/admin.api";
import {
  useCheckAvailabilityQuery,
  useCreateBookingMutation,
} from "../redux/features/booking/booking.api";
import BMCForm from "../components/form/BMCForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import BMCSelect from "../components/form/BMCSelect";
import BMCDatePicker from "../components/form/BMCDatePicker";
import BMCTimePicker from "../components/form/BMCTimePicker";
import { TQueryParam } from "../types/global";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { TUser } from "../types/facility.types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { logout, useCurrentToken } from "../redux/features/auth/authSlice";
import { FaCalendarCheck, FaClock, FaDollarSign, FaShieldAlt, FaBolt } from "react-icons/fa";
import Lottie from "lottie-react";
import sportLoader from "../assets/images/sport-loader.json";

const CreateBooking = () => {
  const [searchParams] = useSearchParams();
  const initialFacilityId = searchParams.get("facilityId") || undefined;

  const { data: facilities, isLoading: isFacilitiesLoading } =
    useGetAllFacilitiesQuery([]);
  const token = useAppSelector(useCurrentToken);

  let user: TUser | null = null;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [selectedFacilityId, setSelectedFacilityId] = useState<string | undefined>(
    initialFacilityId
  );
  const [params, setParams] = useState<TQueryParam[] | null>(null);
  const [selectedDateString, setSelectedDateString] = useState<string>("");

  const { data: availabilityData, isFetching: isAvailabilityFetching } =
    useCheckAvailabilityQuery(params, {
      skip: !params,
    });

  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();

  const facilityOptions =
    facilities?.data?.map((facility) => ({
      value: facility._id,
      label: `${facility.name} ($${facility.pricePerHour}/hr)`,
    })) || [];

  const selectedFacilityObj = facilities?.data?.find(
    (f) => f._id === selectedFacilityId
  );

  useEffect(() => {
    if (initialFacilityId) {
      setSelectedFacilityId(initialFacilityId);
    }
  }, [initialFacilityId]);

  const handleCheckAvailability: SubmitHandler<FieldValues> = (formData) => {
    if (!formData.facility || !formData.date) {
      toast.error("Please select both an arena and a reservation date.");
      return;
    }
    const formattedDate = formData.date.format("YYYY-MM-DD");
    setSelectedFacilityId(formData.facility);
    setSelectedDateString(formattedDate);

    setParams([
      { name: "facility", value: formData.facility },
      { name: "date", value: formattedDate },
    ]);
  };

  const handleBookingSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!user || user.role !== "user") {
      dispatch(logout());
      toast.warning("Please sign in as a registered athlete to reserve courts.");
      return navigate("/login");
    }

    if (!data.facility || !data.date || !data.startTime || !data.endTime) {
      toast.error("Please select facility, date, start time, and end time.");
      return;
    }

    const toastId = toast.loading("Securing your visual court slot...");
    const payload = {
      facility: data.facility,
      date: data.date.format("YYYY-MM-DD"),
      startTime: data.startTime.format("HH:mm"),
      endTime: data.endTime.format("HH:mm"),
    };

    try {
      const res = await createBooking(payload).unwrap();
      if (res?.success && res?.data?.payment_url) {
        toast.success("Redirecting to Aamarpay secure checkout...", { id: toastId });
        window.location.href = res.data.payment_url;
      } else {
        toast.success("Booking confirmed successfully!", { id: toastId });
        navigate("/user/myBookings");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create booking", {
        id: toastId,
      });
    }
  };

  if (isFacilitiesLoading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[60vh]">
        <Lottie
          animationData={sportLoader}
          loop={true}
          style={{ maxWidth: "300px", height: "300px" }}
        />
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Studio Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-[#FE7D1F] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-xs">
          <FaBolt /> AuraCourt Studio
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Visual Court <span className="text-[#FE7D1F]">Reservation Studio</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm sm:text-base">
          Inspect real-time slot availability, pick your game duration, and check out with instant digital passes.
        </p>
      </div>

      <Row gutter={[28, 28]}>
        {/* Step 1: Availability Scanner */}
        <Col xs={24} lg={12}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-[#FE7D1F] flex items-center justify-center font-black text-sm">
                  1
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Scan Live Court Availability
                </h2>
              </div>

              <BMCForm
                onSubmit={handleCheckAvailability}
                defaultValues={{ facility: initialFacilityId }}
              >
                <div className="space-y-4">
                  <BMCSelect
                    label="Select Arena / Court:"
                    name="facility"
                    options={facilityOptions}
                  />
                  <BMCDatePicker label="Select Game Date:" name="date" />
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isAvailabilityFetching}
                  style={{ backgroundColor: "#FE7D1F" }}
                  className="w-full mt-5 h-11 font-bold rounded-xl shadow-md border-none"
                >
                  Scan Available Slots
                </Button>
              </BMCForm>

              {/* Real-time Slots Box */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <h3 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-2 mb-3">
                  <FaClock className="text-[#FE7D1F]" />
                  Open Time Windows {selectedDateString && `(${selectedDateString})`}:
                </h3>

                {isAvailabilityFetching ? (
                  <p className="text-xs text-gray-400">Refreshing court telemetry...</p>
                ) : availabilityData?.data && availabilityData.data.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {availabilityData.data.map((slot: any, idx: number) => (
                      <Tag
                        key={idx}
                        color="green"
                        className="px-3 py-1.5 text-xs font-bold rounded-xl cursor-default shadow-xs border-green-300"
                      >
                        ✓ {slot.startTime} — {slot.endTime} (Free)
                      </Tag>
                    ))}
                  </div>
                ) : params ? (
                  <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-2xl border border-orange-200 dark:border-orange-900/50">
                    <p className="text-xs text-orange-700 dark:text-orange-300 font-medium">
                      All slots booked for this date. Please choose another date or venue.
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">
                    Select an arena and game date above to scan real-time available time windows.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Col>

        {/* Step 2: Slot Lock & Checkout */}
        <Col xs={24} lg={12}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-[#FE7D1F] flex items-center justify-center font-black text-sm">
                  2
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Lock Time Window & Confirm
                </h2>
              </div>

              <BMCForm
                onSubmit={handleBookingSubmit}
                defaultValues={{ facility: initialFacilityId }}
              >
                <div className="space-y-4">
                  <BMCSelect
                    label="Confirm Arena:"
                    name="facility"
                    options={facilityOptions}
                  />
                  <BMCDatePicker label="Reservation Date:" name="date" />
                  <Row gutter={[12, 12]}>
                    <Col span={12}>
                      <BMCTimePicker label="Game Start Time:" name="startTime" />
                    </Col>
                    <Col span={12}>
                      <BMCTimePicker label="Game End Time:" name="endTime" />
                    </Col>
                  </Row>
                </div>

                {selectedFacilityObj && (
                  <div className="mt-6 p-4 rounded-2xl bg-orange-50/60 dark:bg-gray-800/60 border border-orange-100 dark:border-gray-700">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">Hourly Arena Rate:</span>
                      <span className="font-extrabold text-[#FE7D1F]">
                        ${selectedFacilityObj.pricePerHour} / hr
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-2">
                      <span className="text-gray-500 dark:text-gray-400">Location:</span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium truncate max-w-[200px]">
                        {selectedFacilityObj.location}
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isBookingLoading}
                  style={{ backgroundColor: "#FE7D1F" }}
                  className="w-full h-12 mt-6 text-sm sm:text-base font-bold rounded-xl shadow-lg hover:scale-101 transition-transform border-none"
                >
                  Proceed to Secure Payment →
                </Button>
              </BMCForm>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center gap-2 text-xs text-gray-400">
              <FaShieldAlt className="text-green-500" />
              <span>Instant slot reservation & SSL encrypted checkout</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CreateBooking;
