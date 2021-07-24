import ACTIONS from "../actions";

const transactions = [];

const usersReducers = (state = transactions, action) => {
  switch (action.type) {
    case ACTIONS.GET_TRANSACTION:
      return action.payload;

    default:
      return state;
  }
};

export default usersReducers;
