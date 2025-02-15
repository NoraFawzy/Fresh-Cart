import style from "./ResetPassword.module.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  let navigate = useNavigate();

  function newPassword(email, newPass) {
    return axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        email: email,
        newPassword: newPass,
      })
      .then((res) => {
        toast.success("Password reset successfully!");
        console.log(res);
        localStorage.setItem('userToken', res.data.token); 
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "An error occurred");
        console.log(err);
      });
}


  function handleNewPassword(event) {
    event.preventDefault();
    newPassword(email, newPass);
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-4xl text-center mb-5 text-emerald-700">
            Reset Password
          </h2>
          <form onSubmit={handleNewPassword}>
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
                placeholder="Enter your Email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2 text-start"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 focus:border-emerald-600"
                placeholder="Enter your New Password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-opacity-50"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </>
  );
}