import { DataGrid } from "@material-ui/data-grid";
import "./myTransactions.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
  { field: "amount", headerName: "Amount", width: 100 },
  {
    field: "date",
    headerName: "Date Initiated",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
  },
];

function MyTransactions() {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  const transactions = useSelector((state) => state.transactions);

  useEffect(() => {
    if (!isLogged) {
      return history.push("/");
    }
  }, [isLogged, history]);

  return (
    <div className="myTransaction">
      <DataGrid
        rows={transactions?.map((transaction) => {
          return {
            id:
              transaction.content?.transactions?.transactionId ||
              transaction._id,
            description:
              transaction.content?.transactions?.product_name ||
              "Wallet Topped",
            amount:
              transaction.content?.transactions?.total_amount ||
              transaction.amount / 100,
            date: transaction.date,
            status: transaction.content?.transactions?.status || "topped",
          };
        })}
        columns={columns}
        pageSize={13}
        checkboxSelection
      />
    </div>
  );
}

export default MyTransactions;
