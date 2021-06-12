const getLocalTransaction = localStorage.getItem("transaction");
const transactionData = JSON.parse(getLocalTransaction);

export const successData = [
  {
    id: transactionData.content.transactions.transactionId,
    service: transactionData.content.transactions.product_name,
    response: transactionData.response_description,
    amount: transactionData.content.transactions.amount,
    method: transactionData.content.transactions.method,
    status: transactionData.content.transactions.status,
    date: transactionData.transaction_date.date,
  },
];

export const failedData = [
  {
    id: "",
    service: "",
    response: "",
    amount: "",
    method: "",
    status: "",
    date: "",
  },
];
