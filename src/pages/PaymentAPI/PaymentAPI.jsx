import axios from "axios";
import { useEffect, useState } from "react";
import { TextField, MenuItem } from "@material-ui/core";
import BankDeposit from "./BankDeposit/BankDeposit";

const PaymentAPI = () => {
  const [verify, setVerify] = useState(true);
  const [accountName, setAccountName] = useState("");
  const [varations, setVarations] = useState([]);
  const [serviceID, setServiceID] = useState("bank-deposit");
  const [variationCode, setVariationCode] = useState("");
  const [billersCode, setBillersCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const getBankAPI = async () => {
      const response = await axios.get(
        `https://sandbox.vtpass.com/api/service-variations?serviceID=${serviceID}`
      );
      console.log(response.data.content.varations);
      setVarations(response.data.content.varations);
    };
    getBankAPI();
  }, [variationCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(variationCode);

    const verifyAccount = {
      billersCode,
      serviceID,
      type: variationCode,
    };

    console.log(verifyAccount);

    const username = "gabrielle.zalan@finemail.org";
    const password = "gabrielle";
    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );

    try {
      const response = await axios.post(
        "https://sandbox.vtpass.com/api/merchant-verify",
        verifyAccount,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );

      if (response.data.content.error) {
        setError("Please check the account number or bank code again.");
      } else {
        console.log(response.data);
        setAccountName(response.data.content.account_name);
        setVerify(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="airtime">
      <div className="airtimeContainer">
        {verify ? (
          <>
            <h3 className="airtimeTitle">Verify Account Details</h3>
            {error ? (
              <p className="error">{error}</p>
            ) : success ? (
              <p className="verifyNotification">{success}</p>
            ) : (
              ""
            )}
            <form className="formGroup" onSubmit={handleSubmit}>
              <div className="formGroupItems">
                <TextField
                  id=""
                  select
                  label="Select your Bank"
                  value={variationCode}
                  onChange={(e) => setVariationCode(e.target.value)}
                  helperText="Please select your Bank's name"
                >
                  {varations.map((option) => (
                    <MenuItem
                      key={option.variation_code}
                      value={option.variation_code}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="formGroupItems">
                <label>Bank Account Number To Transfer Funds</label>
                <input
                  type="text"
                  className="inputField"
                  onChange={(e) => {
                    setBillersCode(e.target.value);
                  }}
                />
              </div>
              <button type="submit" className="formButton">
                Submit
              </button>
            </form>
          </>
        ) : (
          <BankDeposit
            variationCode={variationCode}
            setVariationCode={setVariationCode}
            accountName={accountName}
            serviceID={serviceID}
            billersCode={billersCode}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentAPI;
