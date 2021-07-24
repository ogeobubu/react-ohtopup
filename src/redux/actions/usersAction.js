import ACTIONS from "./index";
import axios from "axios";

export const fetchAllUsers = async (token) => {
  const response = await axios.get("/api/users/all", {
    headers: {
      Authorization: token,
    },
  });
  return response;
};

export const dispatchGetAllUsers = (response) => {
  return {
    type: ACTIONS.GET_ALL_USER,
    payload: response.data,
  };
};
