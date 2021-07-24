import "./data.css";
import { useEffect, useState } from "react";
import { TextField, MenuItem, CircularProgress } from "@material-ui/core";
import axios from "axios";
import Notification from "../../utils/Notification";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  dispatchGetUserWallet,
  getUserWallet,
} from "../../redux/actions/walletAction";

const network = [
  {
    value: "mtn-data",
    label: "MTN",
  },
  {
    value: "glo-data",
    label: "GLO",
  },
  {
    value: "etisalat-data",
    label: "9mobile",
  },
  {
    value: "airtel-data",
    label: "Airtel",
  },
];

const Data = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [variations, setVariations] = useState([]);
  const [variationCode, setVariationCode] = useState("");
  const [serviceID, setServiceID] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { user, isLogged } = auth;
  const wallet = useSelector((state) => state.wallet);
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
    if (user) {
      return getUserWallet(user.email, token).then((response) => {
        dispatch(dispatchGetUserWallet(response));
      });
    }
  }, [dispatch, user, user.email, token]);

  useEffect(() => {
    if (variationCode === "mtn-10mb-100") {
      setAmount(100);
    } else if (variationCode === "mtn-50mb-200") {
      setAmount(200);
    } else if (variationCode === "mtn-100mb-1000") {
      setAmount(1000);
    } else if (variationCode === "mtn-500mb-2000") {
      setAmount(2000);
    } else if (variationCode === "mtn-20hrs-1500") {
      setAmount(1500);
    } else if (variationCode === "mtn-3gb-2500") {
      setAmount(2500);
    } else if (variationCode === "mtn-data-3000") {
      setAmount(3000);
    } else if (variationCode === "mtn-1gb-3500") {
      setAmount(3500);
    } else if (variationCode === "mtn-100hr-5000") {
      setAmount(5000);
    } else if (variationCode === "mtn-3gb-6000") {
      setAmount(6000);
    } else if (variationCode === "mtn-40gb-10000") {
      setAmount(10000);
    } else if (variationCode === "mtn-75gb-15000") {
      setAmount(15000);
    } else if (variationCode === "mtn-110gb-20000") {
      setAmount(20000);
    } else if (variationCode === "mtn-3gb-1500") {
      setAmount(1500);
    }
  }, [variationCode]);

  useEffect(() => {
    const getVariationCode = async () => {
      const response = await axios.get(
        `https://sandbox.vtpass.com/api/service-variations?serviceID=${serviceID}`
      );
      setVariations(response.data.content.varations);
    };
    getVariationCode();
  }, [serviceID]);

  const handleChange = (e) => {
    setServiceID(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const purchaseData = {
        serviceID,
        billersCode: `0${user.phone}`,
        variation_code: variationCode,
        phone,
        amount,
        email: user.email,
      };

      if (wallet) {
        if (wallet < amount) {
          return setAlert({
            show: true,
            message: "Insufficient Fund! Transaction cannot be processed.",
            type: "error",
          });
        }
      } else {
        return setAlert({
          show: true,
          message: "Transaction Failed. You have not activated your Wallet.",
          type: "error",
        });
      }
      setLoading(true);
      const response = await axios.post("/api/pay/data", purchaseData, {
        headers: {
          Authorization: token,
        },
      });

      setAlert({
        show: true,
        message: response?.data.message.response_description,
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
        <h3 className="airtimeTitle">Buy Databundle</h3>
        <form className="formGroup" onSubmit={handleSubmit}>
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
            <TextField
              id="standard-select-network"
              select
              label="Databundle Plan"
              value={variationCode}
              onChange={(e) => {
                setVariationCode(e.target.value);
              }}
              helperText="Please select your network"
            >
              {variations?.map((option) => {
                return (
                  <MenuItem
                    key={option.variation_code}
                    value={option.variation_code}
                  >
                    {option.name}
                  </MenuItem>
                );
              })}
            </TextField>
          </div>

          <div className="formGroupItems">
            <label>Mobile Number</label>
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

          <div className="formGroupItems">
            <label>Amount</label>
            <input
              type="text"
              className="inputField"
              value={amount}
              disabled={true}
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

export default Data;
