import "./payment.css";
import { PaystackButton } from "react-paystack";
import { useState } from "react";

const Payment = () => {
  const publicKey = "{YOUR PAYSTACK API KEY}";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");

  const nairaToKobo = (x) => {
    return (x * 1000).toFixed(0);
  };

  const parseCurrency = (x) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(x);
  };

  const vat = (x) => {
    return 0.075 * x;
  };

  const total = (x) => {
    return x + nairaToKobo(amount) + vat(amount);
  };

  console.log(nairaToKobo(amount));
  nairaToKobo(amount);

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  return (
    <div className="payment">
      <div className="checkout-form">
        <div className="checkout-field">
          <label>Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="checkout-field">
          <label>Email</label>
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="checkout-field">
          <label>Amount</label>
          <input
            type="text"
            id="amount"
            onChange={(e) => setAmount(+e.target.value)}
          />
        </div>
        <div className="checkout-field">
          <label>Phone</label>
          <input
            type="text"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <PaystackButton className="paystack-button" {...componentProps} />
      </div>
    </div>
  );
};

export default Payment;
