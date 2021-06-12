import Table from "../../components/Table/Table";
import Transaction from "../../components/Transaction/Transaction";
import "./dashboard.css";

const Dashboard = () => {
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
