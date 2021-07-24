import { FormatQuote, ArrowBackIos } from "@material-ui/icons";
import Notification from "../../../utils/Notification";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setAlert({
        show: true,
        message: "Passwords do not match",
        type: "error",
      });
    }

    const data = {
      password,
    };

    try {
      const response = await axios.post("/api/users/reset", data, {
        headers: {
          Authorization: token,
        },
      });

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
        <div className="authContainer">
          <Link className="link" to="/">
            <div className="goBack">
              <ArrowBackIos /> <span>Go back</span>
            </div>
          </Link>
          <form onSubmit={handleSubmit} className="forgotPassword">
            <h1>Reset Password</h1>
            <input
              type="password"
              placeholder="Password"
              className="forgotInputField"
              onChange={(e) => setPassword(e.target.value)}
            />

            <br />

            <input
              type="password"
              placeholder="Confirm Password"
              className="forgotInputField"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <br />

            <Button type="submit" variant="contained" color="primary">
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
