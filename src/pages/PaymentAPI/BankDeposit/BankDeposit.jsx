import axios from "axios";
import { useEffect, useState } from "react";

const BankDeposit = ({
  variationCode,
  setVariationCode,
  accountName,
  serviceID,
  billersCode,
}) => {
  const [data, setData] = useState({});
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const makePayment = {
      request_id: Math.floor(Math.random() * 1000000000).toString(),
      serviceID,
      billersCode,
      variation_code: variationCode,
      amount,
      phone,
    };

    const username = "gabrielle.zalan@finemail.org";
    const password = "gabrielle";
    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );

    try {
      const response = await axios.post(
        "https://sandbox.vtpass.com/api/pay",
        makePayment,
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
          response.data.content.transactions.status === "pending"
            ? setSuccess(
                "Transaction is pending. Wait for few minutes then go to your transaction page to check if transaction was successful."
              )
            : setSuccess(
                "Transaction is Successful. Go to your transaction page."
              );
          console.log(response.data);
          setError("");
          setData(response.data);
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
      console.log(error);
    }
  };

  return (
    <>
      <h3 className="airtimeTitle">Deposit Payment</h3>
      {error ? (
        <p className="error">{error}</p>
      ) : success ? (
        <p className="verifyNotification">{success}</p>
      ) : (
        ""
      )}
      <form className="formGroup" onSubmit={handleSubmit}>
        <div className="formGroupItems">
          <label>Bank Name</label>
          <input
            type="text"
            className="inputField"
            value={variationCode}
            disabled={true}
          />
        </div>

        <div className="formGroupItems">
          <label>Check to confirm your Account Name</label>
          <input
            type="text"
            className="inputField"
            value={accountName}
            disabled={true}
          />
        </div>

        <div className="formGroupItems">
          <label>Amount</label>
          <input
            type="text"
            className="inputField"
            onChange={(e) => setAmount(+e.target.value)}
          />
        </div>

        <div className="formGroupItems">
          <label>Mobile Number</label>
          <input
            type="text"
            className="inputField"
            onChange={(e) => setPhone(+e.target.value)}
          />
        </div>

        <button type="submit" className="formButton">
          Make Payment
        </button>
      </form>
    </>
  );
};

export default BankDeposit;
