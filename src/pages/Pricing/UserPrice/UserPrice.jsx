import React from "react";
import { CheckCircle } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const UserPrice = () => {
  const history = useHistory();

  return (
    <div className="reseller">
      <div className="about-container">
        <div className="resellerHeadingContainer">
          <h1 className="resellerHeading">
            We also have good pricing for end users. Check below.
          </h1>
        </div>

        <div className="cardFlex">
          <div className="card">
            <div className="cardTop mtn">
              <div className="cardContainer">
                <h3>MTN</h3>
              </div>
            </div>
            <div className="cardBody">
              <div className="cardContainer">
                <div className="cardPrice">
                  <CheckCircle className="greenTick" /> <span>1GB - ₦ 350</span>
                </div>
                <div className="cardPrice">
                  <CheckCircle className="greenTick" /> <span>2GB - ₦ 700</span>
                </div>
                <div className="cardPrice">
                  <CheckCircle className="greenTick" />{" "}
                  <span>5GB - ₦ 1,750</span>
                </div>
              </div>
              <Button
                onClick={() => history.push("/auth")}
                variant="contained"
                fullWidth
                color="primary"
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="card">
            <div className="cardTop glo">
              <div className="cardContainer">
                <h3>GLO</h3>
              </div>
            </div>
            <div className="cardBody">
              <div className="cardContainer">
                <div className="cardPrice">
                  <CheckCircle className="greenTick" />{" "}
                  <span>920MB/1GB - ₦ 450</span>
                </div>
                <div className="cardPrice">
                  <CheckCircle className="greenTick" />{" "}
                  <span>1.9GB/2.5GB - ₦ 900</span>
                </div>
                <div className="cardPrice">
                  <CheckCircle className="greenTick" />{" "}
                  <span>5.2GB/5.8GB - ₦ 1,800</span>
                </div>
              </div>

              <Button
                onClick={() => history.push("/auth")}
                variant="contained"
                fullWidth
                color="primary"
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="card">
            <div className="cardTop nineMobile">
              <div className="cardContainer">
                <h3>9MOBILE</h3>
              </div>
            </div>
            <div className="cardBody">
              <div className="cardContainer">
                <div className="cardPrice">
                  <CheckCircle className="greenTick" />{" "}
                  <span>1.5GB - ₦ 850</span>
                </div>
                <div className="cardPrice">
                  <CheckCircle className="greenTick" />{" "}
                  <span>2GB - ₦ 1,020</span>
                </div>
                <div className="cardPrice">
                  <CheckCircle className="greenTick" />{" "}
                  <span>3GB - ₦ 1,275</span>
                </div>
              </div>

              <Button
                onClick={() => history.push("/auth")}
                variant="contained"
                fullWidth
                color="primary"
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="card">
            <div className="cardTop airtel">
              <div className="cardContainer">
                <h3>AIRTEL</h3>
              </div>
            </div>
            <div className="cardBody">
              <div className="cardContainer">
                <div className="cardPrice">
                  <CheckCircle className="greenTick" />{" "}
                  <span>1.5GB - ₦ 950</span>
                </div>
                <div className="cardPrice">
                  <CheckCircle className="greenTick" />{" "}
                  <span>2GB - ₦ 1,140</span>
                </div>
                <div className="cardPrice">
                  <CheckCircle className="greenTick" />{" "}
                  <span>3GB - ₦ 1,425</span>
                </div>
              </div>

              <Button
                onClick={() => history.push("/auth")}
                variant="contained"
                fullWidth
                color="primary"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPrice;
