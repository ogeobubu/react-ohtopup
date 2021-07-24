import "./table.css";

import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  dispatchGetTransaction,
  getTransactions,
} from "../../redux/actions/transactionAction";
import { Link, useHistory } from "react-router-dom";

const Table = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const transactions = useSelector((state) => state.transactions);
  const { user } = auth;
  const [firstPage] = useState(1);
  const [categoriesOnAPage] = useState(5);

  const lastItem = firstPage * categoriesOnAPage;
  const firstItem = lastItem - categoriesOnAPage;
  const firstItemsView = transactions.slice(firstItem, lastItem);

  useEffect(() => {
    if (auth) {
      const getTransaction = () => {
        return getTransactions(user.email, token).then((response) => {
          dispatch(dispatchGetTransaction(response));
        });
      };
      getTransaction();
    }
  }, [auth, dispatch, token, user.email]);

  const handleClick = (id) => {
    return history.push(`/dashboard/view-transaction/${id}`);
  };

  return (
    <>
      <div className="table">
        <h3 className="tableTitle">Latest Transaction</h3>
        <table className="tableStyle">
          <tr className="tableTr">
            <th className="tableTh">#</th>
            <th className="tableTh">ID</th>
            <th className="tableTh">Description</th>
            <th className="tableTh">Amount</th>
            <th className="tableTh">Date Initiated</th>
            <th className="tableTh">Status</th>
            <th className="tableTh">View</th>
          </tr>
          {firstItemsView ? (
            <>
              {firstItemsView?.map((data, index) => (
                <tr key={index} className="tableTr">
                  <td className="tableNumber">{++index}</td>
                  <td className="tableID">
                    <span className="tableName">
                      {data?.content?.transactions?.transactionId || data._id}
                    </span>
                  </td>
                  <td className="tableDescription">
                    {data?.content?.transactions?.product_name ||
                      "Wallet Topped"}
                  </td>
                  <td className="tableAmount">
                    ₦
                    {data?.content?.transactions?.total_amount ||
                      data.amount / 100}
                  </td>
                  <td className="tableDate">
                    {data?.transaction_date?.date || data.date}
                  </td>
                  <td
                    className={
                      data?.content?.transactions?.status === "delivered"
                        ? "tableStatus success"
                        : data?.content?.transactions?.status === "failed"
                        ? "tableStatus failed"
                        : "tableStatus success"
                    }
                  >
                    {data.content?.transactions?.status || "topped"}
                  </td>
                  <td className="tableDate">
                    <Button
                      style={{
                        fontSize: "12px",
                        width: "100%",
                        textTransform: "capitalize",
                      }}
                      onClick={() => handleClick(data._id)}
                      variant="contained"
                      color="primary"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <h2>No Transaction</h2>
          )}
          <div
            style={{ width: "100%", height: "100%" }}
            className="buttonTransact"
          >
            <Link className="link" to="/dashboard/transactions">
              <Button variant="contained" color="primary">
                View more
              </Button>
            </Link>
          </div>
        </table>
      </div>
    </>
  );
};

export default Table;
