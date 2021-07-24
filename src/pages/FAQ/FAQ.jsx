import Header from "../Home/Header/Header";
import Hero from "../Home/Hero/Hero";
import Footer from "../Home/Footer/Footer";
import { useState } from "react";
import { Add, Close } from "@material-ui/icons";

import "./faq.css";

const faqData = [
  {
    id: 1,
    question: "How can I purchase data from you?",
    answer:
      "1. Fund your Wallet. 2. Fill the data order form and ensure you have a good internet connection. 3. Wait for 5-10 minutes, you will see a pop up of 'Transaction Successful', wait a little while to be redirected.",
  },
  {
    id: 2,
    question: "How can I fund my wallet?",
    answer:
      "1. The only available mode of payment for now is Online Payment via Paystack Payment Gateway. Be rest assured your ATM Card details are secured.",
  },
  {
    id: 3,
    question: "How can I be your agent?",
    answer:
      "Our Products can be retailed, as they are affordable. You can retail our Products to others and make profit. Just make sure your wallet is funded, then you can easily purchase for anyone you wish.",
  },
  {
    id: 4,
    question: "Are your data plans real?",
    answer:
      "Yes. We are third party vendors. We buy in bulk from network providers and resell.",
  },
  {
    id: 5,
    question: "What if my order has been approved, but not yet received?",
    answer:
      "Do well to contact us immediately. Our customer service is available to resolve issues of such.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);
  const [data] = useState(faqData);

  return (
    <>
      <div className="home">
        <div className="homeContainer">
          <Header />
          <Hero introSmall="Frequently Asked Questions" introBig="FAQ" />
        </div>
      </div>

      <section className="faq">
        <div className="faqContainer">
          <h3 className="faqTitle">
            This is a compilation of the questions frequently asked by clients,
            please go through them to have a better knowledge of this platform.
          </h3>

          <div className="questions">
            <div className="questionItemDetail">
              {data.map((item) => {
                const { id, question, answer } = item;

                return (
                  <div style={{ marginTop: "8px", width: "100%" }} key={id}>
                    <div
                      className="questionItem"
                      onClick={() =>
                        setOpen((preOpen) => (preOpen === id ? null : id))
                      }
                    >
                      <h3 className="questionItemTitle">{question}</h3>
                      {open === id ? (
                        <Close style={{ fontSize: "40px " }} />
                      ) : (
                        <Add style={{ fontSize: "40px " }} />
                      )}
                    </div>
                    <div className="readQuestion">
                      {open === id && (
                        <div className="readQuestionDetail">
                          <div className="readQuestionDesc">{answer}</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default FAQ;
