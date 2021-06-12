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
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const PurchaseElectricity = ({
  verifyDetails,
  setPhone,
  setAmount,
  serviceID,
  amount,
  phone,
  type,
  billersCode,
}) => {
  const [transactionResult, setTransactionResult] = useState([]);
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const userElectricPurchase = {
        request_id: Math.floor(Math.random() * 1000000000).toString(),
        serviceID,
        billersCode,
        variation_code: type,
        amount,
        phone,
        date: new Date(),
      };

      const username = "gabrielle.zalan@finemail.org";
      const password = "gabrielle";

      const token = Buffer.from(`${username}:${password}`, "utf8").toString(
        "base64"
      );

      const response = await axios.post(
        "https://sandbox.vtpass.com/api/pay",
        userElectricPurchase,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      setTransactionResult(response.data);

      switch (response.data.code) {
        case "000":
          const JSONData = JSON.stringify(response.data);
          localStorage.setItem("transaction", JSONData);
          setSuccess("Transaction is Successful. Go to your transaction page.");
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
      console.error(error);
    }
  };

  return (
    <>
      {error ? (
        <p className="error">{error}</p>
      ) : success ? (
        <p className="verifyNotification">{success}</p>
      ) : (
        ""
      )}
      <form className="formGroup" onSubmit={handleSubmit}>
        <div className="formGroupItems">
          <label>Payment Option</label>
          <input
            type="text"
            className="inputField"
            placeholder={`Wallet - ₦${numberWithCommas(Math.floor(wallet))}`}
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
            <span className="alert">{verifyDetails.Customer_Name}</span>
          </label>
          <input
            type="text"
            value={verifyDetails.Meter_Number}
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
          <label>Amount</label>
          <input
            type="text"
            className="inputField"
            onChange={(e) => {
              setAmount(+e.target.value);
            }}
          />
        </div>

        <button type="submit" className="formButton">
          Pay Now
        </button>
      </form>
    </>
  );
};

export default PurchaseElectricity;
