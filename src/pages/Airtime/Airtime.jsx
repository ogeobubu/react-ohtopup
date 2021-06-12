import "./airtime.css";
import { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";

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
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [serviceID, setServiceID] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
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

  const handleChange = (e) => {
    setServiceID(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const airtimeData = {
      serviceID,
      amount,
      request_id: Math.floor(Math.random() * 1000000000).toString(),
      phone,
    };

    const username = "gabrielle.zalan@finemail.org";
    const password = "gabrielle";

    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );

    console.log(airtimeData);

    const response = await axios.post(
      "https://sandbox.vtpass.com/api/pay",
      airtimeData,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );

    if (response.data.content.error) {
      setError("Invalid!");
    }

    console.log(response.data);

    switch (response.data.code) {
      case "000":
        console.log(response.data);
        setData(response.data);
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
  };
  return (
    <div className="airtime">
      <div className="airtimeContainer">
        <h3 className="airtimeTitle">Buy Airtime</h3>
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
              Airtime Value <span className="alert">(50 -50,000)</span>
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
                setPhone(+e.target.value);
              }}
            />
            <span className="bottomAlert">
              Enter one mobile number and NOT two! e.g 08123456789
            </span>
          </div>
          {/* <div className="formGroupItems">
            <label>Amount</label>
            <input
              type="text"
              className="inputField"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div> */}
          <button type="submit" className="formButton">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Airtime;
