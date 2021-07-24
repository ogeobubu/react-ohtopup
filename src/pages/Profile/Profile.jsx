import { Button, CircularProgress } from "@material-ui/core";
import "./profile.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Notification from "../../utils/Notification";
import axios from "axios";

const Profile = () => {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { user, isLogged } = auth;

  const [fullName, setFullName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const removeAlert = (show = false, message = "", type = "") => {
    setAlert({ show, message, type });
  };

  useEffect(() => {
    if (!isLogged) {
      return history.push("/");
    }
  }, [isLogged, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateUser = {
      fullName: fullName ? fullName : user.fullName,
      bankName,
      accountType,
      accountName,
      accountNumber,
    };

    if (password) {
      if (password !== confirmPassword) {
        return setAlert({
          show: true,
          message: "Passwords do not match.",
          type: "error",
        });
      } else {
        try {
          setLoading(true);
          const response = await axios.post(
            "/api/users/reset",
            {
              password,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );

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
    } else {
      try {
        setLoading(true);
        const response = await axios.patch("/api/users/", updateUser, {
          headers: {
            Authorization: token,
          },
        });

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
    <div className="airtime">
      <div className="airtimeContainer">
        {alert.show && <Notification {...alert} removeAlert={removeAlert} />}
        <h3 className="airtimeTitle">User Profile</h3>
        <div className="profileForm">
          <form onSubmit={handleSubmit} className="profileFormGroup">
            <div className="profileFormControl">
              <label>Full Name</label>
              <input
                type="text"
                className="profileInput"
                defaultValue={user.fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="formGrid">
              <div className="profileFormControl">
                <label>Phone Number</label>
                <input
                  type="number"
                  className="profileInput"
                  value={`0${user.phone}`}
                  disabled={true}
                />
              </div>

              <div className="profileFormControl">
                <label>Email Address</label>
                <input
                  type="email"
                  className="profileInput"
                  value={user.email}
                  disabled={true}
                />
              </div>

              <div className="profileFormControl">
                <label>Bank Name</label>
                <input
                  type="text"
                  className="profileInput"
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>

              <div className="profileFormControl">
                <label>Account Type</label>
                <input
                  type="text"
                  className="profileInput"
                  onChange={(e) => setAccountType(e.target.value)}
                />
              </div>

              <div className="profileFormControl">
                <label>Account Name</label>
                <input
                  type="text"
                  className="profileInput"
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </div>

              <div className="profileFormControl">
                <label>Account Number</label>
                <input
                  type="number"
                  className="profileInput"
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="profileFormControl">
              <label>New Password</label>
              <input
                type="password"
                className="profileInput"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="profileFormControl">
              <label>Confirm Password</label>
              <input
                type="password"
                className="profileInput"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* <div className="profileFormControl">
              <label>Enter Current Password</label>
              <input type="password" className="profileInput" />
            </div> */}

            <br />

            <Button
              type="submit"
              style={{ width: "100px" }}
              variant="contained"
              color="primary"
            >
              {loading ? (
                <CircularProgress size="1.5rem" color="secondary" />
              ) : (
                "Update"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
