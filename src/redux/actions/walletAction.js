import ACTIONS from "./index";
import axios from "axios";

export const getUserWallet = async (email, token) => {
  const response = await axios.post(
    "/api/wallet/balance",
    { email },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const dispatchGetUserWallet = (response) => {
  return {
    type: ACTIONS.GET_USER_WALLET,
    payload: response.data.message.amount,
  };
};

export const createUserWallet = async (email, token) => {
  const response = await axios.post(
    "/api/wallet/",
    { email },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const dispatchCreateUserWallet = (response) => {
  return {
    type: ACTIONS.GET_USER_WALLET,
    payload: response.data,
  };
};
