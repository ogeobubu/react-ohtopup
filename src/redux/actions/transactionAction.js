import ACTIONS from "./index";
import axios from "axios";

export const getTransactions = async (email, token) => {
  const response = await axios.post(
    "/api/database/",
    { email },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const dispatchGetTransaction = (response) => {
  return {
    type: ACTIONS.GET_TRANSACTION,
    payload: response.data.message,
  };
};
