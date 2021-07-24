import "./forgotPassword.css";
import { FormatQuote, ArrowBackIos } from "@material-ui/icons";
import Notification from "../../../utils/Notification";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import axios from "axios";

const ForgotPassword = () => {
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const removeAlert = (show = false, message = "", type = "") => {
    setAlert({ show, message, type });
  };

  useEffect(() => {
    if (isLogged) {
      return history.push("/dashboard");
    }
  }, [history, isLogged]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
    };

    try {
      const response = await axios.post("/api/users/forgot-password", data);

      return setAlert({
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

  return (
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
        <div className="authContainer authCSSForgot">
          <Link className="link" to="/">
            <div className="goBack">
              <ArrowBackIos /> <span>Go back</span>
            </div>
          </Link>
          <form onSubmit={handleSubmit} className="forgotPassword">
            <h1>Forgot Password</h1>
            <input
              type="email"
              placeholder="Enter Email"
              className="forgotInputField"
              onChange={(e) => setEmail(e.target.value)}
            />

            <br />

            <Button type="submit" variant="contained" color="primary">
              Verify your Email
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
