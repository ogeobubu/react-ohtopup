import "./activateEmail.css";
import { FormatQuote, ArrowBackIos } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Notification from "../../../utils/Notification";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ActivateEmail = () => {
  const { activation } = useParams();

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const removeAlert = (show = false, message = "", type = "") => {
    setAlert({ show, message, type });
  };

  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  const history = useHistory();

  useEffect(() => {
    if (isLogged) {
      return history.push("/dashboard");
    }
  }, [isLogged, history]);

  useEffect(() => {
    if (activation) {
      const activateEmail = async () => {
        try {
          const response = await axios.post("/api/users/activate", {
            activation,
          });

          setAlert({
            show: true,
            message: response.data.message,
            type: "success",
          });
        } catch (error) {
          return setAlert({
            show: true,
            message: error.response.data.message,
            type: "error",
          });
        }
      };
      activateEmail();
    }
  }, [activation]);

  return (
    <>
      <div className="auth">
        <div className="authLeft">
          <div className="authContainer">
            <div className="quote">
              <FormatQuote />

              <div className="quoteDetail">
                Concentrate your energies, your thoughts and your capital. The
                wise man put all his eggs in one basket and watches the basket.
                <br />
                <br />
                <span className="quoter">Andre Carnegie</span>
              </div>
            </div>
          </div>
        </div>
        <div className="authRight">
          {alert.show && <Notification {...alert} removeAlert={removeAlert} />}
          <div className="authContainer">
            <Link className="link" to="/auth">
              <div className="goBack">
                <ArrowBackIos /> <span>Go back</span>
              </div>
            </Link>

            <div className="activateEmail">
              {alert.type === "error" ? (
                <h1>
                  Thank you for choosing our platform. Unfortunately something
                  went wrong in verifying your email.
                </h1>
              ) : (
                <h1>
                  Thank you for choosing our platform. Go back to login page to
                  sign in successfully.
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivateEmail;
