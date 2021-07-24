import "./box.css";

const Box = () => {
  return (
    <div className="boxes">
      <div className="box1">
        <div className="container">
          <div className="boxDescription">
            <span className="number1">01</span>
            <h2 className="airtimeDescriptionTitle">
              Automated VTU, Utility, Data Payment
            </h2>
            <p className="airtimeDescriptionText">
              Vend for utilities, buy data, and airtime purchase.
            </p>
          </div>
        </div>
      </div>

      <div className="box2">
        <div className="container">
          <div className="boxDescription">
            <span className="number2">02</span>
            <h2 className="airtimeDescriptionTitle">Next: Invest</h2>
            <p className="airtimeDescriptionText">
              Invest with OhME and be assured oa a monthly-pouring ROI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
