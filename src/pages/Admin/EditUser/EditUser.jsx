import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Notification from "../../../utils/Notification";
import { Button } from "@material-ui/core";

const EditUser = () => {
  const history = useHistory();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isAdmin } = auth;
  const [create, setCreate] = useState(true);
  const [amount, setAmount] = useState("");
  const { email } = useParams();
  const [wallet, setWallet] = useState("");

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    if (!isAdmin) {
      return history.push("/dashboard");
    }
  }, [isAdmin, history]);

  const removeAlert = (show = false, message = "", type = "") => {
    setAlert({ show, message, type });
  };

  useEffect(() => {
    if (wallet) {
      return setCreate(false);
    } else {
      return setCreate(true);
    }
  }, [create, wallet]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (create) {
        const createWallet = async () => {
          try {
            const response = await axios.post(
              "/api/wallet/",
              {
                email,
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            setAlert({
              show: true,
              message: response.data.message,
              type: "success",
            });
          } catch (error) {
            return setAlert({
              show: true,
              message: error.response.data.message,
              type: "error",
            });
          }
        };
        createWallet();
      } else {
        try {
          const updateWallet = async () => {
            const response = await axios.patch(
              "/api/wallet/",
              {
                email,
                amount: wallet ? wallet.amount + +amount : amount,
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            );

            setAlert({
              show: true,
              message: response.data.message,
              type: "success",
            });
          };
          updateWallet();
        } catch (error) {
          return setAlert({
            show: true,
            message: error.response.data.message,
            type: "error",
          });
        }
      }
    } catch (error) {
      return setAlert({
        show: true,
        message: error.response.data.message,
        type: "error",
      });
    }
  };

  useEffect(() => {
    try {
      const getWallet = async () => {
        const response = await axios.post(
          "/api/wallet/balance",
          {
            email,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setWallet(response.data.message);
      };
      getWallet();
    } catch (error) {
      return setAlert({
        show: true,
        message: error.response.data.message,
        type: "error",
      });
    }
  }, [email, token]);

  return (
    <div className="airtime">
      <div className="airtimeContainer">
        {alert.show && <Notification {...alert} removeAlert={removeAlert} />}
        <h3 className="airtimeTitle">
          {wallet ? "Update User Wallet" : "Create Wallet"}
        </h3>
        <form onSubmit={handleSubmit} className="formGroup">
          {wallet && (
            <div className="formGroupItems">
              <label>Amount</label>
              <input
                type="number"
                className="inputField"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          )}
          <br />

          {wallet ? (
            <Button
              className="formButton"
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              style={{ cursor: "pointer" }}
            >
              {!wallet ? "Create a Wallet For This User" : "Update Wallet"}
            </Button>
          ) : (
            <Button
              className="formButton"
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              style={{ cursor: "pointer" }}
            >
              {!wallet ? "Create a Wallet For This User" : "Update Wallet"}
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditUser;
