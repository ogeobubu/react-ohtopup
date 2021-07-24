import "./admin.css";
import UsersTable from "./UsersTable/UsersTable";
import TransactionsTable from "./TransactionsTable/TransactionsTable";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const history = useHistory();
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);
  const auth = useSelector((state) => state.auth);
  const { isAdmin } = auth;
  const [allWallet, setAllWallet] = useState([]);
  const [budget, setBudget] = useState("");

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    if (!isAdmin) {
      return history.push("/dashboard");
    }
  }, [isAdmin, history]);

  useEffect(() => {
    const getAllWallets = async () => {
      const response = await axios.get("/api/wallet/all", {
        headers: {
          Authorization: token,
        },
      });
      setAllWallet(response.data.message);
    };
    getAllWallets();
  }, [token]);

  useEffect(() => {
    const getBudget = async () => {
      const response = await axios.get("/api/wallet/budget", {
        headers: {
          Authorization: token,
        },
      });
      setBudget(response.data.message.contents.balance);
    };
    getBudget();
  }, [token]);

  return (
    <div className="airtime">
      <div className="airtimeContainer">
        <h3 className="airtimeTitle">Admin Page</h3>

        <div className="adminStats">
          <div className="adminCard">
            <div className="adminCardItem">
              <div className="adminCardContainer">
                <div className="adminCardTop">
                  <h3>Budget</h3>
                </div>
                <div className="adminCardBottom">
                  ₦{numberWithCommas(Math.floor(budget))}
                </div>
              </div>
            </div>
          </div>

          <div className="adminCard">
            <div className="adminCardItem">
              <div className="adminCardContainer">
                <div className="adminCardTop">
                  <h3>Total Users</h3>
                </div>
                <div className="adminCardBottom">{users.length}</div>
              </div>
            </div>
          </div>

          <div className="adminCard">
            <div className="adminCardItem">
              <div className="adminCardContainer">
                <div className="adminCardTop">
                  <h3>Registered Users</h3>
                </div>
                <div className="adminCardBottom">{allWallet.length}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="usersTable">
          <UsersTable />
        </div>

        <div className="usersTable">
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
};

export default Admin;
