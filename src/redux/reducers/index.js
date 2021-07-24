import { combineReducers } from "redux";
import auth from "./authReducer";
import tokenReducer from "./tokenReducer";
import usersReducers from "./usersReducers";
import walletReducer from "./walletReducer";
import transactions from "./transactionReducer";
import allTransactions from "./transactionsReducer";

export default combineReducers({
  auth,
  token: tokenReducer,
  users: usersReducers,
  wallet: walletReducer,
  transactions,
  allTransactions,
});
