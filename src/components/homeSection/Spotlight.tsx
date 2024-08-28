import "./styles/Spotlight.css";
import img1 from "../../assets/images/blog-5-740x560.jpg";
import img2 from "../../assets/images/blog-12-740x560.jpg";
import img3 from "../../assets/images/blog-7-740x560.jpg";
import img4 from "../../assets/images/blog-6-740x560.jpg";
import img5 from "../../assets/images/blog-4-740x560.jpg";

const Spotlight = () => {
  return (
    <div className="spotlight-container">
      <div className="spotlight1">
        <div className="wrapper">
          <img src={img1} alt="" />
        </div>
        <div className="spotlight1-child1">
          <p style={{ margin: "16px 0" }}>
            <span style={{ color: "#fe7d1f" }}>Company News</span>|
            <span>By Admin</span>
          </p>
          <h1>LOCAL PUPILS SWING BY GO APE NORMANBY HALL</h1>
        </div>
      </div>
      <div className="spotlight2">
        <div className="row1">
          <div className="">
            <div className="wrapper ">
              <img src={img2} alt="" />
            </div>
            <div className="">
              <p style={{ margin: "16px 0" }}>
                <span style={{ color: "#fe7d1f" }}>Company News</span>|
                <span>By Admin</span>
              </p>
              <h3>PLANNING A MICROADVENTURE WITH ALASTAIR HUMPHREYS</h3>
            </div>
          </div>
          <div className="">
            <div className="wrapper">
              <img src={img3} alt="" />
            </div>
            <div className="">
              <p style={{ margin: "16px 0" }}>
                <span style={{ color: "#fe7d1f" }}>Company News</span>|
                <span>By Admin</span>
              </p>
              <h3>LOCAL PUPILS SWING BY GO APE NORMANBY HALL</h3>
            </div>
          </div>
        </div>
        <div className="row1">
          <div className="">
            <div className="wrapper">
              <img src={img4} alt="" />
            </div>
            <div className="">
              <p style={{ margin: "16px 0" }}>
                <span style={{ color: "#fe7d1f" }}>Company News</span>|
                <span>By Admin</span>
              </p>
              <h3>LOCAL PUPILS SWING BY GO APE NORMANBY HALL</h3>
            </div>
          </div>
          <div className="">
            <div className="wrapper">
              <img src={img5} alt="" />
            </div>
            <div className="">
              <p style={{ margin: "16px 0" }}>
                <span style={{ color: "#fe7d1f" }}>Company News</span>|
                <span>By Admin</span>
              </p>
              <h3>LOCAL PUPILS SWING BY GO APE NORMANBY HALL</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spotlight;
