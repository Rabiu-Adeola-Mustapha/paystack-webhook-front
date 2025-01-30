import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const PaystackButton = ({ email, amount }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initializePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/paystack/v1/payment/initialize`,
        { email, amount },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_PUBLIC_KEY}`,
          },
        }
      );

      const { authorizationUrl, reference } = response.data;
      const paymentWindow = window.open(
        authorizationUrl,
        "_blank",
        "noopener,noreferrer"
      );

      if (!paymentWindow) {
        alert("Please allow pop-ups for payment.");
        setLoading(false);
        return;
      }

      const interval = setInterval(() => {
        if (paymentWindow.closed) {
          clearInterval(interval);
          navigate(`/payment-status/${reference}`);
        }
      }, 1000);
    } catch (error) {
      console.error("Error initializing payment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={initializePayment} disabled={loading}>
      {loading ? "Processing..." : "Pay with Paystack"}
    </button>
  );
};

export default PaystackButton;
