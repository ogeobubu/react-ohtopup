import "./payment.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import Notification from "../../utils/Notification";

const charges = (value) => {
  return Math.ceil((1.5 / 100) * value);
};

const Payment = () => {
  const history = useHistory();
  const [userAmount, setAmount] = useState("");
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { user, isLogged } = auth;
  const [wallet, setWallet] = useState("");
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

  useEffect(() => {
    const getBalance = async () => {
      const payload = {
        email: user.email,
      };

      try {
        const response = await axios.post("/api/wallet/balance", payload, {
          headers: {
            Authorization: token,
          },
        });

        setWallet(response.data.message.amount);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getBalance();
  }, [wallet, user.email, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactData = {
      email: user.email,
      amount: `${userAmount + charges(userAmount)}00`,
    };

    if (!wallet) {
      return setAlert({
        show: true,
        message: "Activate your wallet to use this feature.",
        type: "error",
      });
    }

    if (userAmount < 500) {
      return setAlert({
        show: true,
        message: "You can only top your wallet from ₦500 and above.",
        type: "error",
      });
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "/api/transaction/initialize",
        transactData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (
        response.data.message.data.access_code &&
        response.data.message.data.authorization_url
      ) {
        window.location.replace(
          `${response.data.message.data.authorization_url}`
        );
      }
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
  };

  return (
    <div className="airtime">
      <div className="airtimeContainer">
        {alert.show && <Notification {...alert} removeAlert={removeAlert} />}
        <h3 className="airtimeTitle">Deposit Money To Your Wallet</h3>
        <form className="formGroup" onSubmit={handleSubmit}>
          <div className="formGroupItems">
            <label>
              Amount <span className="alert">(₦500 -₦50,000)</span>
            </label>
            <input
              type="text"
              className="inputField"
              onChange={(e) => {
                setAmount(+e.target.value);
              }}
            />
          </div>
          <button type="submit" className="formButton">
            {loading ? <CircularProgress size="1.5rem" /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
