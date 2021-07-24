import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Wallet from "./pages/Wallet/Wallet";
import Airtime from "./pages/Airtime/Airtime";
import Data from "./pages/Data/Data";
import Electricity from "./pages/Electricity/Electricity";
import Payment from "./pages/Payment/Payment";
import MyTransactions from "./pages/MyTransactions/MyTransactions.jsx";
import NotFound from "./pages/NotFound/NotFound";
import Pricing from "./pages/Pricing/Pricing";
import FAQ from "./pages/FAQ/FAQ";
import Auth from "./pages/Auth/Auth";
import ActivateEmail from "./pages/Auth/ActivateEmail/ActivateEmail";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";
import Profile from "./pages/Profile/Profile";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import Admin from "./pages/Admin/Admin";
import EditUser from "./pages/Admin/EditUser/EditUser";
import ViewTransaction from "./pages/MyTransactions/ViewTransaction/ViewTransaction";

function App() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const [sidebar, setSidebar] = useState(true);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");

    if (firstLogin) {
      const getToken = async () => {
        const response = await axios.post("/api/users/refresh_token", null);

        dispatch({
          type: "GET_TOKEN",
          payload: response.data.access_token,
        });
      };
      getToken();
    }
  }, [dispatch, auth.isLogged]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        return fetchUser(token).then((response) => {
          dispatch(dispatchGetUser(response));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/pricing">
            <Pricing />
          </Route>

          <Route exact path="/faq">
            <FAQ />
          </Route>

          <Route exact path="/auth">
            <Auth />
          </Route>

          <Route exact path="/activate/:activation">
            <ActivateEmail />
          </Route>

          <Route exact path="/forgot">
            <ForgotPassword />
          </Route>

          <Route exact path="/reset/:token">
            <ResetPassword />
          </Route>

          <Route exact path="/dashboard">
            <Topbar sidebar={sidebar} setSidebar={setSidebar} />
            <div className="main-container">
              <Sidebar sidebar={sidebar} />
              <Dashboard />
            </div>
          </Route>

          <Route path="/dashboard/wallet">
            <Topbar sidebar={sidebar} setSidebar={setSidebar} />
            <div className="main-container">
              <Sidebar sidebar={sidebar} />
              <Wallet />
            </div>
          </Route>

          <Route path="/dashboard/airtime">
            <Topbar sidebar={sidebar} setSidebar={setSidebar} />
            <div className="main-container">
              <Sidebar sidebar={sidebar} />
              <Airtime />
            </div>
          </Route>

          <Route path="/dashboard/data">
            <Topbar sidebar={sidebar} setSidebar={setSidebar} />
            <div className="main-container">
              <Sidebar sidebar={sidebar} />
              <Data />
            </div>
          </Route>

          <Route path="/dashboard/electricity">
            <Topbar sidebar={sidebar} setSidebar={setSidebar} />
            <div className="main-container">
              <Sidebar sidebar={sidebar} />
              <Electricity />
            </div>
          </Route>

          <Route path="/dashboard/bills">
            <Topbar sidebar={sidebar} setSidebar={setSidebar} />
            <div className="main-container">
              <Sidebar sidebar={sidebar} />
              <Payment />
            </div>
          </Route>

          <Route path="/dashboard/transactions">
            <Topbar sidebar={sidebar} setSidebar={setSidebar} />
            <div className="main-container">
              <Sidebar sidebar={sidebar} />
              <MyTransactions />
            </div>
          </Route>

          <Route path="/dashboard/view-transaction/:id">
            <Topbar sidebar={sidebar} setSidebar={setSidebar} />
            <div className="main-container">
              <Sidebar sidebar={sidebar} />
              <ViewTransaction />
            </div>
          </Route>

          <Route path="/dashboard/profile">
            <Topbar sidebar={sidebar} setSidebar={setSidebar} />
            <div className="main-container">
              <Sidebar sidebar={sidebar} />
              <Profile />
            </div>
          </Route>

          <Route exact path="/dashboard/admin">
            <Topbar sidebar={sidebar} setSidebar={setSidebar} />
            <div className="main-container">
              <Sidebar sidebar={sidebar} />
              <Admin />
            </div>
          </Route>

          <Route path="/dashboard/admin/edit-user/:email">
            <Topbar sidebar={sidebar} setSidebar={setSidebar} />
            <div className="main-container">
              <Sidebar sidebar={sidebar} />
              <EditUser />
            </div>
          </Route>

          <Route path="*">
            <Topbar sidebar={sidebar} setSidebar={setSidebar} />
            <div className="main-container">
              <Sidebar sidebar={sidebar} />
              <NotFound />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
