import "./viewTransaction.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

const ViewTransaction = () => {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;
  const [transaction, setTransaction] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (!isLogged) {
      return history.push("/");
    }
  }, [isLogged, history]);

  useEffect(() => {
    const getDetail = async () => {
      const response = await axios.get(`/api/database/${id}`);
      console.log(response.data.message);
      setTransaction(response.data.message);
    };
    getDetail();
  }, [id]);

  return (
    <div className="airtime">
      <div className="airtimeContainer">
        <h3 className="airtimeTitle">View Transaction Detail</h3>

        <div className="invoice">
          <div className="greetings">
            <p>Hello {user.fullName}</p>
            <p>
              This is the receipt for a payment of ₦
              {transaction?.content?.transactions?.unit_price} you made to
              OhTopUp
            </p>
          </div>
          <br />
          <div className="viewPayment">
            <span>Payment ID: {transaction?._id}</span>
            <br />
            <span>Payment Date: {transaction?.date}</span>
          </div>
          <hr />
          <div className="clientPayment">
            <div className="client">
              <span>Client: {user?.fullName}</span>
              <br />
              <span>{`0${user?.phone}`}</span>
              <br />
              <span>{user?.email}</span>
            </div>
            <br />
            <div className="paymentTo">
              <span>Payment To</span>
              <br />
              <span>OhTopUp</span>
              <br />
              <span>ohtopupsupport@gmail.com</span>
            </div>
            <br />
          </div>
          <br />
          <div className="status">
            <span>Payment Status</span>
            {transaction?.content?.transactions?.status === "delivered" ? (
              <span className="viewSuccess">Success</span>
            ) : (
              <span className="viewFailure">Failed</span>
            )}
          </div>

          <div className="descriptionInvoice">
            <table class="blueTable">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Details</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    {transaction?.content?.transactions?.type} - ₦
                    {transaction?.content?.transactions?.unit_price},{" "}
                    {transaction?.content?.transactions?.product_name} for{" "}
                    {transaction?.content?.transactions?.type ===
                    "Electricity Bill"
                      ? "meter number"
                      : "phone number"}
                    : {transaction?.content?.transactions?.unique_element}
                  </td>
                  <td></td>
                  <td>₦{transaction?.content?.transactions?.unit_price}</td>
                </tr>
                <tr>
                  <td>Payer</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>₦{transaction?.content?.transactions?.unit_price}</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    {transaction?.content?.transactions?.type ===
                    "Electricity Bill"
                      ? "Meter Number"
                      : "Phone Number"}
                  </td>
                  <td>{transaction?.content?.transactions?.unique_element}</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    {transaction?.content?.transactions?.type ===
                    "Electricity Bill"
                      ? "Meter Type"
                      : "Type"}
                  </td>
                  <td>
                    {transaction?.content?.transactions?.type ===
                    "Electricity Bill"
                      ? "Electricity Bill"
                      : transaction?.content?.transactions?.type ===
                        "Airtime Recharge"
                      ? "Airtime Recharge"
                      : transaction?.content?.transactions?.type ===
                        "Data Services"
                      ? "Data Services"
                      : "Wallet Topped"}
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    {transaction?.content?.transactions?.type ===
                    "Electricity Bill"
                      ? "Unit"
                      : ""}
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    {transaction?.content?.transactions?.type ===
                    "Electricity Bill"
                      ? "Token"
                      : ""}
                  </td>
                  <td>
                    {transaction?.content?.transactions?.type ===
                    "Electricity Bill"
                      ? transaction?.purchased_code
                      : ""}
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>Reference</td>
                  <td>{transaction?._id}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTransaction;
