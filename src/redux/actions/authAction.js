import ACTIONS from "./index";
import axios from "axios";

export const dispatchLogin = () => {
  return {
    type: ACTIONS.LOGIN,
  };
};

export const fetchUser = async (token) => {
  const response = await axios.get("/api/users/", {
    headers: {
      Authorization: token,
    },
  });
  return response;
};

export const dispatchGetUser = (response) => {
  return {
    type: ACTIONS.GET_USER,
    payload: {
      user: response.data,
      isAdmin: response.data.role === "admin" ? true : false,
    },
  };
};
