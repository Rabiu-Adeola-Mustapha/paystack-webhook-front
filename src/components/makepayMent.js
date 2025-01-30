// src/pages/MakePayment.js
import React from "react";
import PaystackButton from "./paystackButton";

const MakePayment = () => {
  const user = {
    email: "customer@example.com",
  };
  const amount = 2000; // Amount in kobo

  return (
    <div>
      <h1>Make Payment</h1>
      <PaystackButton email={user.email} amount={amount} />
    </div>
  );
};

export default MakePayment;
