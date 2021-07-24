import ACTIONS from "./index";
import axios from "axios";

export const getAllTransactions = async (token) => {
  const response = await axios.get("/api/database/", {
    headers: {
      Authorization: token,
    },
  });
  return response;
};

export const dispatchGetAllTransactions = (response) => {
  return {
    type: ACTIONS.GET_ALL_TRANSACTION,
    payload: response.data.message,
  };
};
