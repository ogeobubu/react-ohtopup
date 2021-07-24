import ACTIONS from "../actions";

const allTransactions = [];

const usersReducers = (state = allTransactions, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_TRANSACTION:
      return action.payload;

    default:
      return state;
  }
};

export default usersReducers;
