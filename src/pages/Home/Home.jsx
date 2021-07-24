import About from "./About/About";
import Box from "./Box/Box";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import "./home.css";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="homeContainer">
          <Header />
          <Hero
            introSmall="Paying smart is"
            introBig="when you pay for bills and you get discount."
          />
        </div>
      </div>
      <Box />
      <About />
      <Footer />
    </>
  );
};

export default Home;
