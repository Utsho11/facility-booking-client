import React, { useState } from "react";
import { Button, Col, Input, Rate, Row, Avatar, Divider } from "antd";
import "./styles/FacilityCard.css";
import { useGetSingleFacilityQuery } from "../../redux/features/admin/admin.api";
import {
  useCreateReviewMutation,
  useGetFacilityReviewsQuery,
} from "../../redux/features/review/review.api";
import { Link, useParams } from "react-router-dom";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import { FaUserCircle, FaPaperPlane } from "react-icons/fa";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import Lottie from "lottie-react";
import sportLoader from "../../assets/images/sport-loader.json";

const { TextArea } = Input;

const FacilityDetailsPage = () => {
  const { id: facilityId } = useParams();
  const currentUser = useAppSelector(selectCurrentUser);

  const { data: facility, isLoading: isFacilityLoading } =
    useGetSingleFacilityQuery(facilityId as string);

  const { data: reviewData, isLoading: isReviewsLoading } =
    useGetFacilityReviewsQuery(facilityId as string);

  const [createReview, { isLoading: isSubmittingReview }] =
    useCreateReviewMutation();

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please login to leave a review.");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a short comment.");
      return;
    }

    const toastId = toast.loading("Submitting review...");
    try {
      await createReview({
        facility: facilityId as string,
        rating,
        comment,
      }).unwrap();
      toast.success("Thank you for your review!", { id: toastId });
      setComment("");
      setRating(5);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit review.", {
        id: toastId,
      });
    }
  };

  if (isFacilityLoading) {
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
      {/* Main Facility Info Card */}
      <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 dark:border-gray-800 transition-all">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={12}>
            <div className="overflow-hidden rounded-2xl h-80 sm:h-96 shadow-md bg-gray-100 dark:bg-gray-800">
              <img
                src={facility?.image}
                alt={facility?.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-100 dark:bg-orange-950/50 text-[#FE7D1F] rounded-full text-sm font-bold shadow-xs">
                    <FaStar />
                    <span>{reviewData?.avgRating || "5.0"}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({reviewData?.totalReviews || 0} reviews)
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  {facility?.name}
                </h1>

                <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed text-base">
                  {facility?.description}
                </p>

                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-4 text-sm font-medium">
                  <FaLocationDot className="text-[#FE7D1F]" size={16} />
                  <span>{facility?.location}</span>
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    Hourly Booking Rate:
                  </span>
                  <span className="text-2xl font-black text-[#FE7D1F]">
                    ${facility?.pricePerHour}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {" "}
                      / hour
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  to={`/createBooking?facilityId=${facility?._id}`}
                  className="flex-1"
                >
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#FE7D1F" }}
                    size="large"
                    className="w-full font-bold h-12 rounded-xl shadow-lg hover:scale-102 transition-transform text-base"
                  >
                    Book This Court Now
                  </Button>
                </Link>
                <Link to="/facilities">
                  <Button
                    size="large"
                    className="w-full sm:w-auto h-12 rounded-xl font-medium"
                  >
                    Back to Facilities
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Reviews & Community Feedback Section */}
      <div className="mt-12 bg-white dark:bg-[#1e1e1e] rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-8">
          Player Reviews & Ratings
        </h2>

        <Row gutter={[32, 32]}>
          {/* Write a Review Form */}
          <Col xs={24} md={10}>
            <div className="p-6 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                Leave Your Feedback
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Share your court experience with the community.
              </p>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Your Rating:
                  </label>
                  <Rate
                    value={rating}
                    onChange={(val) => setRating(val)}
                    className="text-[#FE7D1F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Review Comment:
                  </label>
                  <TextArea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe court conditions, lighting, amenities, etc."
                    className="rounded-xl"
                  />
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmittingReview}
                  icon={<FaPaperPlane size={12} />}
                  style={{ backgroundColor: "#FE7D1F" }}
                  className="w-full h-10 font-bold rounded-xl shadow-md"
                >
                  Submit Review
                </Button>
              </form>
            </div>
          </Col>

          {/* Reviews Feed */}
          <Col xs={24} md={14}>
            {isReviewsLoading ? (
              <p className="text-sm text-gray-400">Loading reviews...</p>
            ) : reviewData?.reviews && reviewData.reviews.length > 0 ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {reviewData.reviews.map((rev) => (
                  <div
                    key={rev._id}
                    className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar
                          style={{ backgroundColor: "#FE7D1F" }}
                          icon={<FaUserCircle />}
                        />
                        <div>
                          <p className="font-bold text-sm text-gray-900 dark:text-white m-0">
                            {rev.user?.name || "Player"}
                          </p>
                          <span className="text-xs text-gray-400">
                            {new Date(rev.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Rate
                        disabled
                        defaultValue={rev.rating}
                        className="text-sm text-[#FE7D1F]"
                      />
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                <FaStar className="mx-auto text-gray-300 dark:text-gray-600 mb-2" size={32} />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No reviews yet for this facility. Be the first to leave one!
                </p>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FacilityDetailsPage;
