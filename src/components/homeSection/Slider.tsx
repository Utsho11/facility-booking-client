import { Button, Carousel } from "antd";
import Typewriter from "typewriter-effect";
import slider1 from "../../assets/images/h1-slider01.jpg";
import slider2 from "../../assets/images/h1-slider02.jpg";
import "./styles/slider.css";
import { Link } from "react-router-dom";

const Slider = () => (
  <Carousel autoplay>
    <div>
      <div
        className="slider-container"
        style={{ backgroundImage: `url(${slider1})` }}
      >
        <div className="slider-overlay"></div>
        <div className="slider-text">
          <p>
            <span style={{ color: "#fe7d1f" }}>Book</span> sports facilities
            easily,{" "}
            <span style={{ color: "#fe7d1f" }}>we have got it all! </span> from
          </p>
          <Typewriter
            options={{
              strings: ["football", "to", "Tennis"],
              autoStart: true,
              loop: true,
            }}
          />
          <Link to="/createBooking">
            <Button
              style={{ backgroundColor: "#fe7d1f", color: "#fff" }}
              size="large"
            >
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
    <div>
      <div
        className="slider-container"
        style={{ backgroundImage: `url(${slider2})` }}
      >
        <div className="slider-overlay"></div>
        <div className="slider-text">
          <p>
            <span style={{ color: "#fe7d1f" }}>Browse,Choose,Book </span>
            your favourite venue from
          </p>
          <Typewriter
            options={{
              strings: ["anytime", "anywhere!"],
              autoStart: true,
              loop: true,
            }}
          />
          <Link to="/createBooking">
            <Button
              style={{ backgroundColor: "#fe7d1f", color: "#fff" }}
              size="large"
            >
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
    <div>
      <div
        className="slider-container"
        style={{ backgroundImage: `url(${slider1})` }}
      >
        <div className="slider-overlay"></div>
        <div className="slider-text">
          <p>
            <span style={{ color: "#fe7d1f" }}> Pick a time,</span> and secure
            your spot instantly.
          </p>
          <Typewriter
            options={{
              strings: ["Pay Online", "Have Fun"],
              autoStart: true,
              loop: true,
            }}
          />
          <Link to="/createBooking">
            <Button
              style={{ backgroundColor: "#fe7d1f", color: "#fff" }}
              size="large"
            >
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
    <div>
      <div
        className="slider-container"
        style={{ backgroundImage: `url(${slider2})` }}
      >
        <div className="slider-overlay"></div>
        <div className="slider-text">
          <p>
            <span style={{ color: "#fe7d1f" }}>Book</span> sports facilities
            easily,{" "}
            <span style={{ color: "#fe7d1f" }}>we have got it all! </span> from
          </p>
          <Typewriter
            options={{
              strings: ["football", "to", "Tennis"],
              autoStart: true,
              loop: true,
            }}
          />
          <Link to="/createBooking">
            <Button
              style={{ backgroundColor: "#fe7d1f", color: "#fff" }}
              size="large"
            >
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </Carousel>
);

export default Slider;
