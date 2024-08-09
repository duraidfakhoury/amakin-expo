import "./contactUs.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const ContactUs = () => {
  return (
    <section className="contactUs">
      <div className="contact-info">
        <h1>Contact Us</h1>
        <p>We are glad to hear more suggestions from you.</p>
        <p>Reach out to us on our social media accounts.</p>
        <div className="social-cont">
          <div className="social-item">
            <FacebookIcon className="custom-icon" />
            <span>Amakin Expo</span>
          </div>
          <div className="social-item">
            <InstagramIcon className="custom-icon" />
            <span>Amakin_Expo</span>
          </div>
          <div className="social-item">
            <XIcon className="custom-icon" />
            <span>Amakin.Expo</span>
          </div>
          <div className="social-item">
            <LinkedInIcon className="custom-icon" />
            <span>AmakinExpo</span>
          </div>
        </div>
        <p>Or share your thoughts with us via email:</p>
        <p><a href="mailto:amakin.expo@gmail.com">amakin.expo@gmail.com</a></p>
      </div>
      <div className="contact-pic">
        <img src="/undraw_contact_us_re_4qqt.svg" alt="Contact illustration" />
      </div>
    </section>
  );
}

export default ContactUs;
