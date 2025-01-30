// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import MakePayment from "./components/makepayMent";
import PaymentStatus from "./components/paymentStatus";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const App = () => {
  return (
    <Router>
      <div>
        <ToastContainer /> {/* Place it here */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/make-payment"
            element={<MakePayment email="user@example.com" amount={1000} />}
          />
          <Route
            path="/payment-status/:reference"
            element={<PaymentStatus />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
