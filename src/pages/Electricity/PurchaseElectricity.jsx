import axios from "axios";
import { CircularProgress } from "@material-ui/core";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Notification from "../../utils/Notification";

const PurchaseElectricity = ({
  verifyDetails,
  setPhone,
  serviceID,
  phone,
  type,
  billersCode,
}) => {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { user } = auth;
  const [amount, setAmount] = useState("");
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

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
    try {
      e.preventDefault();

      const userElectricPurchase = {
        serviceID,
        billersCode,
        variation_code: type,
        amount,
        phone,
        email: user.email,
      };
      setLoading(true);
      const response = await axios.post(
        "/api/pay/electricity",
        userElectricPurchase,
        {
          headers: {
            Authorization: token,
          },
        }
      );
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
    <>
      <form className="formGroup" onSubmit={handleSubmit}>
        {alert.show && <Notification {...alert} removeAlert={removeAlert} />}
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
          <label>Electricity Company</label>
          <input
            type="text"
            className="inputField"
            value={serviceID}
            disabled={true}
          />
        </div>

        <div className="formGroupItems">
          <label>
            Meter Number and Meter Name:
            <span className="alert">{verifyDetails.content.Customer_Name}</span>
          </label>
          <input
            type="text"
            value={verifyDetails.content.Meter_Number}
            className="inputField"
            //   onChange={(e) => setBillersCode(e.target.value)}
            disabled={true}
          />
        </div>

        <div className="formGroupItems">
          <label>Mobile Numbers</label>
          <input
            type="text"
            className="inputField"
            onChange={(e) => {
              setPhone(+e.target.value);
            }}
          />
          <span className="bottomAlert">
            Enter one mobile number and NOT two! e.g 08123456789
          </span>
        </div>

        <div className="formGroupItems">
          <label>
            Amount <span className="alert">(₦500 - ₦5,000)</span>
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
          {loading ? <CircularProgress size="1rem" /> : "Pay Now"}
        </button>
      </form>
    </>
  );
};

export default PurchaseElectricity;
