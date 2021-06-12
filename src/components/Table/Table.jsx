import "./table.css";
import { useState } from "react";
import { successData, failedData } from "./TableData";
import { FormatColorResetSharp } from "@material-ui/icons";

const Table = () => {
  // const Button = ({ type }) => {
  //   return <button className={"tableButton " + type}>{type}</button>;
  // };

  const [getData, setGetData] = useState(true);

  const getLocalTransaction = localStorage.getItem("transaction");
  const transactionData = JSON.parse(getLocalTransaction);

  return (
    <>
      <div className="table">
        <h3 className="tableTitle">Latest Electricity Transaction</h3>
        <table className="tableStyle">
          <tr className="tableTr">
            <th className="tableTh">#</th>
            <th className="tableTh">ID</th>
            <th className="tableTh">Service</th>
            <th className="tableTh">Amount</th>
            <th className="tableTh">Method</th>
            <th className="tableTh">Status</th>
            <th className="tableTh">Date</th>
          </tr>
          {getData
            ? successData.map((data, index) => (
                <tr className="tableTr">
                  <td className="tableNumber">{++index}</td>
                  <td className="tableID">
                    <span className="tableName">{data.id}</span>
                  </td>
                  <td className="tableDescription">{data.service}</td>
                  <td className="tableRemark">{data.amount}</td>
                  <td className="tableAmount">{data.method}</td>
                  <td className="tableDate">{data.status}</td>
                  <td className="tableStatus">{data.date}</td>
                </tr>
              ))
            : failedData.map((data, index) => (
                <tr className="tableTr">
                  <td className="tableNumber">{++index}</td>
                  <td className="tableID">
                    <span className="tableName">{data.id}</span>
                  </td>
                  <td className="tableDescription">{data.service}</td>
                  <td className="tableRemark">{data.amount}</td>
                  <td className="tableAmount">{data.method}</td>
                  <td className="tableDate">{data.status}</td>
                  <td className="tableStatus">{data.date}</td>
                </tr>
              ))}
        </table>
      </div>
    </>
  );
};

export default Table;
