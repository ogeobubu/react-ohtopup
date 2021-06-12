import Topbar from "./components/Topbar/Topbar";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import MyTransactions from "./pages/MyTransactions/MyTransactions.jsx";
import Airtime from "./pages/Airtime/Airtime";
import Data from "./pages/Data/Data";
import Payment from "./pages/Payment/Payment";
import Electricity from "./pages/Electricity/Electricity";
import Wallet from "./pages/Wallet/Wallet";
import PaymentAPI from "./pages/PaymentAPI/PaymentAPI";

function App() {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div>
      <Router>
        <Topbar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="main-container">
          <Sidebar sidebar={sidebar} />
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/dashboard/transactions" component={MyTransactions} />
            <Route path="/dashboard/airtime" component={Airtime} />
            <Route path="/dashboard/data" component={Data} />
            <Route path="/dashboard/bills" component={Payment} />
            <Route path="/dashboard/wallet" component={Wallet} />
            <Route path="/dashboard/electricity" component={Electricity} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
