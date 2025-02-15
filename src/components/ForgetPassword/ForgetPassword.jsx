import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  let navigate = useNavigate();

  function forgetPassword(email) {
    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        email: email,
      })
      .then((res) => {
        toast.success(res.data.status);
        navigate("/reset-code");
      })
      .catch((err) => toast.error(err.response.data.message));
  }

  function handleSubmit(event) {
    event.preventDefault();
    forgetPassword(email);
    console.log(email);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-4xl text-center mb-5 text-emerald-700">
          Please enter your Email 
        </h2>
        <form >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2 text-start"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 focus:border-emerald-600"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-opacity-50"
            onClick={handleSubmit}
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}
