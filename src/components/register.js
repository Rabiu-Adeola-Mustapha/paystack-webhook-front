// src/components/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation
  const [error, setError] = useState(""); // State for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/paystack/v1/reg`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

        console.log("Received response:", response);

      // Check if the response is not OK
      if (!response.ok) {
        const errorData = await response.json();

         console.log("Error response:", errorData);

        setError(errorData.msg || "Registration failed"); // Set error message
        toast.error(errorData.msg || "Registration failed", {
          autoClose: 3000,
        }); // Show error toast

         console.log("Toast error triggered");

        return;
      }

      const data = await response.json();
      if (data.status === true) {
        toast.success("Registration successful!", { autoClose: 3000 });
        navigate("/make-payment"); // Navigate on successful registration
      }
    } catch (err) {
      setError("An error occurred. Please try again."); // Handle any other errors
      toast.error("An error occurred. Please try again."); // Show error toast
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <ToastContainer /> {/* Toast container for notifications */}
    </div>
  );
};

export default Register;
