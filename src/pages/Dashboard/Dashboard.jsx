import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../components/Table/Table";
import Transaction from "../../components/Transaction/Transaction";
import {
  dispatchGetUserWallet,
  getUserWallet,
} from "../../redux/actions/walletAction";
import { useHistory } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;
  const token = useSelector((state) => state.token);
  const history = useHistory();

  useEffect(() => {
    if (!isLogged) {
      return history.push("/");
    }
  }, [isLogged, history]);

  useEffect(() => {
    if (user) {
      return getUserWallet(user.email, token).then((response) => {
        dispatch(dispatchGetUserWallet(response));
      });
    }
  }, [dispatch, user, user.email, token]);
  return (
    <>
      <div className="dashboard">
        <Transaction />
        <Table />
      </div>
    </>
  );
};

export default Dashboard;
