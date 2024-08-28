import FacebookIcon from "../../assets/icons/FacebookIcon";
import InstagramIcon from "../../assets/icons/InstagramIcon";
import LocationIcon from "../../assets/icons/LocationIcon";
import MailIcon from "../../assets/icons/MailIcon";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import PininterestIcon from "../../assets/icons/PininterestIcon";
import YoutubeIcon from "../../assets/icons/YoutubeIcon";
import footer from "../../assets/images/bg-footer1.png";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${footer})`,
      }}
      className="footer-container"
    >
      <div className="footer-grid">
        <div>
          <h1 className="footer-heading">Policy & Info</h1>
          <hr className="footer-hr" />
          <ul className="footer-list">
            <li className="footer-list-item">Policy For Seller</li>
            <li className="footer-list-item">Policy For Buyer</li>
            <li className="footer-list-item">Shipping & Refund</li>
            <li className="footer-list-item">Wholesale Policy</li>
          </ul>
        </div>
        <div>
          <h1 className="footer-heading">Quick links</h1>
          <hr className="footer-hr" />
          <ul className="footer-list">
            <li className="footer-list-item">Search</li>
            <li className="footer-list-item">Delivery Information</li>
            <li className="footer-list-item">About Us</li>
            <li className="footer-list-item">Terms and Conditions</li>
          </ul>
        </div>
        <div>
          <h1 className="footer-heading">Information</h1>
          <hr className="footer-hr" />
          <ul className="footer-list">
            <li className="footer-list-item">Contact</li>
            <li className="footer-list-item">Shipping</li>
            <li className="footer-list-item">FAQs</li>
            <li className="footer-list-item">Support</li>
          </ul>
        </div>
        <div>
          <h1 className="footer-heading">Contact us</h1>
          <hr className="footer-hr" />
          <ul className="footer-list">
            <li className="footer-contact">
              <LocationIcon />
              <p>33 New Montgomery St. Ste 750 San Francisco, CA, USA 94105</p>
            </li>
            <li className="footer-contact">
              <MailIcon />
              <p>evergreenNursery@exampledemo.com</p>
            </li>
            <li className="footer-contact">
              <PhoneIcon />
              <p>+8801 3889098</p>
            </li>
          </ul>
          <div className="footer-social-icons">
            <div className="social-icon">
              <FacebookIcon />
            </div>
            <div className="social-icon">
              <PininterestIcon />
            </div>
            <div className="social-icon">
              <InstagramIcon />
            </div>
            <div className="social-icon">
              <YoutubeIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
