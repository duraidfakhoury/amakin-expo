import { useNavigate } from "react-router-dom";
import "./aboutUs.css";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <section className="aboutUs">
      <div className="about-info">
        <div className="hero">
          <h1>Connecting Businesses Through Innovative Event Solutions</h1>
          <p>Your Gateway to Successful Event Participation</p>
        </div>
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            At Amakin Expo, our mission is to revolutionize the way companies
            participate in events by providing a seamless, tech-driven platform
            for showcasing products and connecting with industry professionals.
          </p>
        </div>
        <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>-Event Organization</h3>
            <p>
              We organize industry-specific events that attract top-tier
              businesses and professionals.
            </p>
          </div>
          <div className="step">
            <h3>-Company Dashboard</h3>
            <p>
              Each participating company receives a personalized dashboard to
              manage their products, representatives, and event participation.
            </p>
          </div>
          <div className="step">
            <h3>-Seamless Participation</h3>
            <p>
              Our platform ensures easy management of all event activities, from
              registration to post-event analysis.
            </p>
          </div>
        </div>
      </div>
      <div className="cta">
        <button onClick={()=>navigate('/JoinUs')}>Get Started with Your Dashboard</button>
        <button onClick={()=>navigate('/ContactUs')}>Contact Us</button>
      </div>
      </div>
      <div className="about-pic">
        <img src="/undraw_portfolio_website_re_jsdd.svg" alt="Contact illustration" />
      </div>
    </section>
  );
}

export default AboutUs;
