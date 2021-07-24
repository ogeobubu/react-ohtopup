import "./airtime.css";
import { useEffect, useState } from "react";
import { TextField, CircularProgress } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Notification from "../../utils/Notification";

const network = [
  {
    value: "mtn",
    label: "MTN",
  },
  {
    value: "glo",
    label: "GLO",
  },
  {
    value: "etisalat",
    label: "9mobile",
  },
  {
    value: "airtel",
    label: "Airtel",
  },
];

const Airtime = () => {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { user, isLogged } = auth;
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [serviceID, setServiceID] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [wallet, setWallet] = useState("");

  const removeAlert = (show = false, message = "", type = "") => {
    setAlert({ show, message, type });
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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

  const handleChange = (e) => {
    setServiceID(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const airtimeData = {
      serviceID,
      amount,
      phone,
      email: user.email,
    };

    try {
      setLoading(true);
      const response = await axios.post("/api/pay/airtime", airtimeData, {
        headers: {
          Authorization: token,
        },
      });
      setAlert({
        show: true,
        message: response.data.message.response_description,
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
  };
  return (
    <div className="airtime">
      <div className="airtimeContainer">
        {alert.show && <Notification {...alert} removeAlert={removeAlert} />}
        <h3 className="airtimeTitle">Buy Airtime</h3>
        <form className="formGroup" onSubmit={handleSubmit}>
          <div className="formGroupItems">
            <label>Payment Option</label>
            <input
              type="text"
              className="inputField"
              placeholder={`Wallet - ₦${
                wallet ? numberWithCommas(Math.floor(wallet)) : 0
              }`}
              disabled={true}
            />
          </div>
          <div className="formGroupItems">
            <TextField
              id="standard-select-network"
              select
              label="Mobile Network"
              value={serviceID}
              onChange={handleChange}
              helperText="Please select your network"
            >
              {network.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="formGroupItems">
            <label>
              Airtime Value <span className="alert">(100 -50,000)</span>
            </label>
            <input
              type="text"
              className="inputField"
              onChange={(e) => {
                setAmount(+e.target.value);
              }}
            />
          </div>
          <div className="formGroupItems">
            <label>Mobile Numbers</label>
            <input
              type="text"
              className="inputField"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <span className="bottomAlert">
              Enter one mobile number and NOT two! e.g 08123456789
            </span>
          </div>
          <button type="submit" className="formButton">
            {loading ? <CircularProgress size="1.5rem" /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Airtime;
