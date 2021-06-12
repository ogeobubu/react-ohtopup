import "./electricity.css";
import { useEffect, useState } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import PurchaseElectricity from "./PurchaseElectricity";

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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Electricity = () => {
  const [verifyDetails, setVerifyDetails] = useState([]);
  const [verify, setVerify] = useState(true);
  const [data, setData] = useState({});
  const [serviceID, setServiceID] = useState("");
  const [type, setType] = useState("");
  const [billersCode, setBillersCode] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [wallet, setWallet] = useState("");

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    const getBalance = async () => {
      const username = "gabrielle.zalan@finemail.org";
      const password = "gabrielle";
      const token = Buffer.from(`${username}:${password}`, "utf8").toString(
        "base64"
      );
      const response = await axios.get(
        "https://sandbox.vtpass.com/api/balance",
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      setWallet(response.data.contents.balance);
    };
    getBalance();
  }, [wallet]);

  const verifyHandle = async (e) => {
    try {
      e.preventDefault();
      const verifyMeterNumber = {
        billersCode,
        serviceID,
        type,
      };
      const username = "gabrielle.zalan@finemail.org";
      const password = "gabrielle";
      const token = Buffer.from(`${username}:${password}`, "utf8").toString(
        "base64"
      );
      const response = await axios.post(
        "https://sandbox.vtpass.com/api/merchant-verify",
        verifyMeterNumber,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );

      console.log(response.data);

      if (response.data.content.error) {
        setError("Invalid Meter Number");
      }

      switch (response.data.code) {
        case "000":
          setVerifyDetails(response.data.content);
          setVerify(false);
          setSuccess("Transaction Successful!");
          setSuccess("");
          break;
        case "001":
          setError("TRANSACTION QUERY");
          break;
        case "010":
          setError("VARIATION CODE DOES NOT EXIST");
          break;
        case "011":
          setError("Invalid Arguments. Kindly Restart The Process");
          break;
        case "012":
          setError("PRODUCT DOES NOT EXIST");
          break;
        case "013":
          setError("BELOW MINIMUM AMOUNT ALLOWED");
          break;
        case "014":
          setError("REQUEST ID ALREADY EXIST. Kindly Restart this Process");
          break;
        case "015":
          setError("INVALID REQUEST ID");
          break;
        case "016":
          setError("Transaction Failed. Kindly Restart The Process");
          break;
        case "017":
          setError("ABOVE MAXIMUM AMOUNT ALLOWED");
          break;
        case "018":
          setError("LOW WALLET BALANCE");
          break;
        case "019":
          setError("LIKELY DUPLICATE TRANSACTION");
          break;
        case "021":
          setError("ACCOUNT LOCKED");
          break;
        case "022":
          setError("ACCOUNT SUSPENDED");
          break;
        case "023":
          setError("API ACCESS NOT ENABLE FOR USER");
          break;
        case "024":
          setError("ACCOUNT INACTIVE");
          break;
        case "025":
          setError("RECIPIENT BANK INVALID");
          break;
        case "026":
          setError("RECIPIENT ACCOUNT COULD NOT BE VERIFIED");
          break;
        case "027":
          setError("IP NOT WHITELISTED, CONTACT SUPPORT");
          break;
        case "030":
          setError("BILLER NOT REACHABLE AT THIS POINT");
          break;
        case "031":
          setError("BELOW MINIMUM QUANTITY ALLOWED");
          break;
        case "032":
          setError("ABOVE MINIMUM QUANTITY ALLOWED");
          break;
        case "034":
          setError("SERVICE SUSPENDED");
          break;
        case "035":
          setError("SERVICE INACTIVE");
          break;
        case "083":
          setError("SYSTEM ERROR");
          break;
        case "099":
          setSuccess("TRANSACTION IS PROCESSING");
          break;
        default:
          return;
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="electricity">
      <div className="airtimeContainer">
        {error ? (
          <p className="error">{error}</p>
        ) : success ? (
          <p className="verifyNotification">{success}</p>
        ) : (
          ""
        )}
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
                  placeholder={`Wallet - ₦${numberWithCommas(
                    Math.floor(wallet)
                  )}`}
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
                Verify
              </button>
            </form>
          </>
        ) : (
          <PurchaseElectricity
            verifyDetails={verifyDetails}
            setPhone={setPhone}
            setAmount={setAmount}
            serviceID={serviceID}
            amount={amount}
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
