import axios from "axios";
import { useEffect, useState } from "react";
import Transaction from "../../components/Transaction/Transaction";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./wallet.css";

const Wallet = () => {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const history = useHistory();
  const { user, isLogged } = auth;

  const [wallet, setWallet] = useState("");

  useEffect(() => {
    if (!isLogged) {
      return history.push("/");
    }
  }, [isLogged, history]);

  useEffect(() => {
    const getBalance = async () => {
      const response = await axios.post(
        "/api/wallet/balance",
        {
          email: user.email,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setWallet(response.data.message.amount);
    };
    getBalance();
  }, [wallet, user.email, token]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="wallet">
      <div className="walletContainer">
        <h2>Wallet Balance</h2>
        <p>₦{wallet ? numberWithCommas(Math.floor(wallet)) : 0}</p>
      </div>
      <Transaction />
    </div>
  );
};

export default Wallet;
