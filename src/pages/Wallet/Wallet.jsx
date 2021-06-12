import axios from "axios";
import { useEffect, useState } from "react";
import Transaction from "../../components/Transaction/Transaction";
import "./wallet.css";

const Wallet = () => {
  const [wallet, setWallet] = useState("");

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

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="wallet">
      <div className="walletContainer">
        <h2>Wallet Balance</h2>
        <p>₦{numberWithCommas(Math.floor(wallet))}</p>
      </div>
      <Transaction />
    </div>
  );
};

export default Wallet;
