import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "./styles/Testimonials.css";
import reviews from "../../assets/Data/reviews";
import testimonialBg from "../../assets/images/h1-bg01.jpg";

const Testimonials = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${testimonialBg})`,
      }}
      className="review-section-container"
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper2"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content">
              <img src={review.image} alt="" className="review-image" />
              <div className="review-text">
                <h1 className="review-name">{review.name}</h1>
                <h3 className="review-designation">{review.designation}</h3>
                <p className="review-description">{review.reviews}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
