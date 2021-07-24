import ACTIONS from "../actions";

const users = [];

const usersReducers = (state = users, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_USER:
      return action.payload;

    default:
      return state;
  }
};

export default usersReducers;
