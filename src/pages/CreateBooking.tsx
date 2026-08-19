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
import { useEffect, useState } from "react";
import { TQueryParam } from "../types/global";
import BMCTimePicker from "../components/form/BMCTimePicker";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { TUser } from "../types/facility.types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { logout, useCurrentToken } from "../redux/features/auth/authSlice";
import { FaCalendarCheck, FaClock, FaDollarSign, FaShieldAlt } from "react-icons/fa";
import Lottie from "lottie-react";
import sportLoader from "../assets/images/sport-loader.json";

const CreateBooking = () => {
  const [searchParams] = useSearchParams();
  const initialFacilityId = searchParams.get("facilityId") || undefined;

  const { data: facilities, isLoading: isFacilitiesLoading } =
    useGetAllFacilitiesQuery([]);
  const token = useAppSelector(useCurrentToken);

  let user: TUser;
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
      toast.error("Please select both a facility and a date.");
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
      toast.warning("Please log in as a registered user to book a facility.");
      return navigate("/login");
    }

    if (!data.facility || !data.date || !data.startTime || !data.endTime) {
      toast.error("Please fill in all booking details.");
      return;
    }

    const toastId = toast.loading("Reserving your court slot...");
    const payload = {
      facility: data.facility,
      date: data.date.format("YYYY-MM-DD"),
      startTime: data.startTime.format("HH:mm"),
      endTime: data.endTime.format("HH:mm"),
    };

    try {
      const res = await createBooking(payload).unwrap();
      if (res?.success && res?.data?.payment_url) {
        toast.success("Redirecting to secure payment...", { id: toastId });
        window.location.href = res.data.payment_url;
      } else {
        toast.success("Booking created successfully!", { id: toastId });
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
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Court <span className="text-[#FE7D1F]">Booking Studio</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
          Check live slot availability, select your play window, and lock in your reservation.
        </p>
      </div>

      <Row gutter={[24, 24]}>
        {/* Left Column: Availability Checker & Visual Slots */}
        <Col xs={24} lg={12}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
              <FaCalendarCheck className="text-[#FE7D1F]" />
              1. Check Live Availability
            </h2>
            <BMCForm
              onSubmit={handleCheckAvailability}
              defaultValues={{ facility: initialFacilityId }}
            >
              <div className="space-y-4">
                <BMCSelect
                  label="Choose Facility:"
                  name="facility"
                  options={facilityOptions}
                />
                <BMCDatePicker label="Select Play Date:" name="date" />
              </div>
              <Button
                type="primary"
                htmlType="submit"
                loading={isAvailabilityFetching}
                style={{ backgroundColor: "#FE7D1F" }}
                className="w-full mt-4 h-10 font-semibold rounded-lg shadow-md"
              >
                Check Available Slots
              </Button>
            </BMCForm>

            {/* Availability Slots Display */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-3">
                <FaClock className="text-[#FE7D1F]" />
                Available Time Windows {selectedDateString && `(${selectedDateString})`}:
              </h3>

              {isAvailabilityFetching ? (
                <p className="text-sm text-gray-400">Refreshing slots...</p>
              ) : availabilityData?.data && availabilityData.data.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {availabilityData.data.map((slot: any, idx: number) => (
                    <Tag
                      key={idx}
                      color="green"
                      className="px-3 py-1.5 text-sm font-medium rounded-lg cursor-default shadow-xs"
                    >
                      {slot.startTime} — {slot.endTime}
                    </Tag>
                  ))}
                </div>
              ) : params ? (
                <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-xl border border-orange-200 dark:border-orange-900/50">
                  <p className="text-sm text-orange-700 dark:text-orange-300 font-medium">
                    No free slots found for this date. Please choose another date.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">
                  Select a facility and date above to load available time windows.
                </p>
              )}
            </div>
          </div>
        </Col>

        {/* Right Column: Reservation & Time Selection */}
        <Col xs={24} lg={12}>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
                <FaDollarSign className="text-[#FE7D1F]" />
                2. Reserve Slot & Checkout
              </h2>

              <BMCForm
                onSubmit={handleBookingSubmit}
                defaultValues={{ facility: initialFacilityId }}
              >
                <div className="space-y-4">
                  <BMCSelect
                    label="Confirm Facility:"
                    name="facility"
                    options={facilityOptions}
                  />
                  <BMCDatePicker label="Booking Date:" name="date" />
                  <Row gutter={12}>
                    <Col span={12}>
                      <BMCTimePicker label="Start Time:" name="startTime" />
                    </Col>
                    <Col span={12}>
                      <BMCTimePicker label="End Time:" name="endTime" />
                    </Col>
                  </Row>
                </div>

                {selectedFacilityObj && (
                  <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Rate:</span>
                      <span className="font-bold text-gray-800 dark:text-gray-200">
                        ${selectedFacilityObj.pricePerHour} / hour
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span className="text-gray-500 dark:text-gray-400">Location:</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {selectedFacilityObj.location}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isBookingLoading}
                    style={{ backgroundColor: "#FE7D1F" }}
                    className="w-full h-12 text-base font-bold rounded-xl shadow-lg hover:scale-102 transition-transform"
                  >
                    Proceed to Payment →
                  </Button>
                </div>
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
