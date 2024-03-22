import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { REACT_APP_API_URL } from "./config";

function Registration() {
  // State variables for registration form fields and loading state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle user registration
  const register = async () => {
    setLoading(true); // Set loading state to true
    try {
      // Constructing data object with user details
      const data = {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
      };

      // Sending POST request to register endpoint
      await axios.post(`${REACT_APP_API_URL}api/user/register`, data);
      // Set loading state to false
      setLoading(false);

      // Redirecting to login page after successful registration
      navigate("/login");
    } catch (error) {
      // Set loading state to false
      setLoading(false);
      // Displaying error message using toast
      toast.warn(error.response.data.Error, {
        position: "top-center",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="container">
      {/* Registration form */}
      <div className="text-center">
        <h2 className="fw-bold my-4 d-inline-flex border-bottom border-info border-3 rounded px-3 pb-1">
          Registration Form
        </h2>
      </div>
      <div className="mb-4">
        {/* Input field for first name */}
        <label htmlFor="firstName" className="form-label text-info fw-semibold">
          First Name
        </label>
        <input
          type="text"
          className="form-control border-info"
          id="firstName"
          placeholder="Sonam"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        {/* Input field for last name */}
        <label htmlFor="lastName" className="form-label text-info fw-semibold">
          Last Name
        </label>
        <input
          type="text"
          className="form-control border-info"
          id="lastName"
          placeholder="Soni"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        {/* Input field for email */}
        <label htmlFor="Email" className="form-label text-info fw-semibold">
          Email
        </label>
        <input
          type="email"
          className="form-control border-info"
          id="Email"
          placeholder="admin@internshala.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        {/* Input field for password */}
        <label htmlFor="Password" className="form-label text-info fw-semibold">
          Password
        </label>
        <input
          type="password"
          className="form-control border-info"
          id="Password"
          placeholder="120#$Alphabets!"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* Button for registration */}
      <button
        type="submit"
        className="mt-2 btn bg-info bg-opacity-10 border border-2 rounded border-info text-info fw-bold mb-3 w-100"
        onClick={(e) => {
          e.preventDefault();
          register(); // Call register function on button click
        }}
      >
        {/* Conditional rendering of button text based on loading state */}
        {loading ? (
          <span>
            <span
              className="spinner-border spinner-border-sm me-2"
              aria-hidden="true"
            ></span>
            <span role="status">Loading...</span>
          </span>
        ) : (
          "Register"
        )}
      </button>
    </div>
  );
}

export default Registration;
