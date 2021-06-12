import { Link } from "react-router-dom";
import "./transaction.css";
import TransactionData from "./TransactionData";
import { AttachMoney } from "@material-ui/icons";

const Transaction = () => {
  return (
    <div className="transaction">
      {TransactionData.map((transaction) => (
        <>
          <div className="transactionItem">
            <Link key={transaction.id} className="link" to={transaction.path}>
              <span className="transactionTitle">{transaction.title}</span>
            </Link>
            <div className="transactionMoneyContainer">
              <div className="transactionMoney">
                <AttachMoney />
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Transaction;
