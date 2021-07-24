import "./hero.css";

const Hero = ({ introSmall, introBig }) => {
  return (
    <div className="hero">
      <h3 className="introSmall">{introSmall}</h3>
      <h1 className="introBig">{introBig}</h1>
    </div>
  );
};

export default Hero;
