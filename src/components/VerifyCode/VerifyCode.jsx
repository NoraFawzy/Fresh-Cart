import style from "./VerifyCode.module.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  let navigate = useNavigate();

  function resetCode(code) {
    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        resetCode: code,
      })
      .then((res) => {
        toast.success(res.data.status);
        navigate("/resetpass");
      })
      .catch((err) => toast.error(err.response.data.message));
  }

  function handleResetCode(event) {
    event.preventDefault();
    resetCode(code);
    console.log(code);
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-4xl text-center mb-5 text-emerald-700">
            Please enter your verification code
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700 mb-2 text-start"
              >
                Code
              </label>
              <input
                type="tel"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 focus:border-emerald-600"
                placeholder="Enter your code"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-opacity-50"
              onClick={handleResetCode}
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
