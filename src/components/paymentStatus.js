// src/components/PaymentStatus.js
import React, { useEffect, useState } from "react";

const PaymentStatus = ({ reference }) => {
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    // Fetch payment status from your server
    const fetchPaymentStatus = async () => {
      try {
        const response = await fetch(`/api/payment-status/${reference}`);
        const data = await response.json();
        setStatus(data.status);
      } catch (error) {
        console.error("Error fetching payment status:", error);
      }
    };

    fetchPaymentStatus();
  }, [reference]);

  return (
    <div>
      <h2>Payment Status</h2>
      <p>Reference: {reference}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default PaymentStatus;
