import "./electricity.css";
import { useEffect, useState } from "react";
import { TextField, CircularProgress, MenuItem } from "@material-ui/core";
import axios from "axios";
import PurchaseElectricity from "./PurchaseElectricity";
import { useSelector } from "react-redux";
import Notification from "../../utils/Notification";
import { useHistory } from "react-router-dom";

const electricityCompanies = [
  {
    value: "ikeja-electric",
    label: "Ikeja Electric - IKEDC (PHCN)",
  },
  {
    value: "eko-electric",
    label: "Eko Electric - EKEDC (PHCN)",
  },
  {
    value: "abuja-electric",
    label: "Abuja Electric - AEDC",
  },
  {
    value: "portharcourt-electric",
    label: "Portharcourt Electric - PHEDC",
  },
  {
    value: "ibadan-electric",
    label: "Ibadan Electric - IBEDC",
  },
  {
    value: "kaduna-electric",
    label: "Kaduna Electric - KAEDC",
  },
  {
    value: "kano-electric",
    label: "Kano Electric - KEDC",
  },
  {
    value: "jos-electric",
    label: "Jos Electric - JEDC",
  },
  {
    value: "enugu-electric",
    label: "Enugu Electric - EEDC",
  },
];

const meterTypes = [
  {
    value: "postpaid",
    label: "Postpaid",
  },
  {
    value: "prepaid",
    label: "Prepaid",
  },
];

const Electricity = () => {
  const history = useHistory();

  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { user, isLogged } = auth;
  const [verifyDetails, setVerifyDetails] = useState([]);
  const [verify, setVerify] = useState(true);
  const [serviceID, setServiceID] = useState("");
  const [type, setType] = useState("");
  const [billersCode, setBillersCode] = useState("");
  const [phone, setPhone] = useState("");
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
      } catch (error) {}
    };
    getBalance();
  }, [wallet, user.email, token]);

  const verifyHandle = async (e) => {
    try {
      e.preventDefault();
      const verifyMeterNumber = {
        billersCode,
        serviceID,
        type,
      };
      setLoading(true);

      const response = await axios.post(
        "/api/merchant-verify",
        verifyMeterNumber,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.message.content.error) {
        setAlert({
          show: true,
          message: "An error occurred. Please try again later.",
          type: "error",
        });
        setLoading(false);
      } else {
        setVerifyDetails(response.data.message);
        setVerify(false);
      }
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
    <div className="electricity">
      <div className="airtimeContainer">
        {alert.show && <Notification {...alert} removeAlert={removeAlert} />}
        {verify ? (
          <h3 className="airtimeTitle">
            Verify Electricity Bill - Instant Activation
          </h3>
        ) : (
          <h3 className="airtimeTitle">
            Pay Electricity Bill - Instant Activation
          </h3>
        )}

        {verify ? (
          <>
            <form className="formGroup" onSubmit={verifyHandle}>
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
                  id="standard-select-electricity"
                  select
                  label="Electricity Company"
                  value={serviceID}
                  onChange={(e) => setServiceID(e.target.value)}
                >
                  {electricityCompanies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="formGroupItems">
                <TextField
                  id="standard-select-electricity"
                  select
                  label="Meter Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {meterTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="formGroupItems">
                <label>Meter Number</label>
                <input
                  type="text"
                  className="inputField"
                  onChange={(e) => {
                    setBillersCode(+e.target.value);
                  }}
                />
              </div>
              <button type="submit" className="formButton">
                {loading ? <CircularProgress size="1.5rem" /> : "Verify"}
              </button>
            </form>
          </>
        ) : (
          <PurchaseElectricity
            verifyDetails={verifyDetails}
            setPhone={setPhone}
            serviceID={serviceID}
            phone={phone}
            billersCode={billersCode}
            type={type}
          />
        )}
      </div>
    </div>
  );
};

export default Electricity;
