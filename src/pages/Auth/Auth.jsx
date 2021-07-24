import "./auth.css";
import { useEffect } from "react";
import { FormatQuote, ArrowBackIos } from "@material-ui/icons";
import { Button, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import Notification from "../../utils/Notification";
import axios from "axios";
import { dispatchLogin } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Auth = () => {
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  const history = useHistory();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLogged) {
      return history.push("/dashboard");
    }
  }, [isLogged, history]);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const removeAlert = (show = false, message = "", type = "") => {
    setAlert({ show, message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (login) {
      const loginUser = {
        phone,
        password,
      };

      if (!phone || !password) {
        return setAlert({
          show: true,
          message: "All fields required.",
          type: "error",
        });
      }

      try {
        setLoading(true);
        await axios.post("/api/users/login", loginUser);
        setLoading(false);
        localStorage.setItem("firstLogin", true);
        dispatch(dispatchLogin());
        history.push("/dashboard");
      } catch (error) {
        setLoading(true);
        setAlert({
          show: true,
          message: error.response.data.message,
          type: "error",
        });
        setLoading(false);
      }
    } else {
      const createUser = {
        fullName,
        email,
        phone,
        password,
        confirmPassword,
      };

      if (!fullName || !email || !phone || !password || !confirmPassword) {
        return setAlert({
          show: true,
          message: "All fields required.",
          type: "error",
        });
      }

      if (password !== confirmPassword) {
        return setAlert({
          show: true,
          message: "Passwords do not match",
          type: "error",
        });
      }

      try {
        setLoading(true);
        const response = await axios.post("/api/users/create", createUser);

        setAlert({
          show: true,
          message: response.data.message,
          type: "success",
        });
        setLoading(false);
      } catch (error) {
        setLoading(true);
        setAlert({
          show: true,
          message: error.response.data.message,
          type: "error",
        });
        setLoading(false);
      }
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
        <div className={login ? "authContainer authCSSLogin" : "authContainer"}>
          <Link className="link" to="/">
            <div className="goBack">
              <ArrowBackIos /> <span>Go back</span>
            </div>
          </Link>
          <div className="loginForm">
            {login ? <h2>Welcome back</h2> : <h2>Hi there!</h2>}
            {login ? (
              <p>Login to manage your account.</p>
            ) : (
              <p>Create an account with us today.</p>
            )}

            <form noValidate onSubmit={handleSubmit}>
              <div className="authFormGroup">
                {login ? (
                  <>
                    <div className="authFormControl">
                      <label>Phone Number</label>
                      <input
                        type="number"
                        className="inputField"
                        placeholder="Phone Number"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="authFormControl">
                      <label>Password</label>
                      <input
                        type="password"
                        className="inputField"
                        placeholder="*******"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="authFormControl">
                      <label>Full Name</label>
                      <input
                        type="text"
                        className="inputField"
                        placeholder="Full Name"
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>

                    <div className="authFormControl">
                      <label>Email</label>
                      <input
                        type="text"
                        className="inputField"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="authFormControl">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        className="inputField"
                        placeholder="Phone Number"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="authFormControl">
                      <label>Password</label>
                      <input
                        type="password"
                        className="inputField"
                        placeholder="*****"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="authFormControl">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        className="inputField"
                        placeholder="*****"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="login">
                {login ? (
                  <p>
                    Don't have an account?{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setLogin(!login)}
                    >
                      Sign up
                    </span>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setLogin(!login)}
                    >
                      Sign in
                    </span>
                  </p>
                )}

                <Button type="submit" variant="contained" color="primary">
                  {loading ? (
                    <CircularProgress size="1.5rem" color="secondary" />
                  ) : (
                    <>{login ? "Login" : "Create"}</>
                  )}
                </Button>
              </div>

              {login ? (
                <Link to="/forgot" className="link">
                  <span className="forgot">Forgot Password?</span>
                </Link>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
