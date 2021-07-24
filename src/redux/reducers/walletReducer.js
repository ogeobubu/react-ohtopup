import ACTIONS from "../actions";

const wallet = "";

const usersReducers = (state = wallet, action) => {
  switch (action.type) {
    case ACTIONS.GET_USER_WALLET:
      return action.payload;

    default:
      return state;
  }
};

export default usersReducers;
