import Footer from "../Home/Footer/Footer";
import Header from "../Home/Header/Header";
import Hero from "../Home/Hero/Hero";
import "./pricing.css";
import ResellPrice from "./ResellPrice/ResellPrice";
import UserPrice from "./UserPrice/UserPrice";

const Pricing = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <Header />
        <Hero
          introSmall="Automated"
          introBig="Subscribe decoder, Buy Airtime, data..."
        />
      </div>
      <ResellPrice />
      <UserPrice />
      <Footer />
    </div>
  );
};

export default Pricing;
