import React, { useContext } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  let navigate = useNavigate();
  let { UserLogin, setUserLogin } = useContext(UserContext);
  let { numOfCart } = useContext(CartContext);

  function Signout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <nav className="border-gray-200 bg-slate-200 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Flowbite Logo" />
          </Link>
          {UserLogin && (
            <ul className="text-slate-600 flex gap-4">
              <li>
                <Link to="/" className="hover:text-emerald-600">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="flex items-center hover:text-emerald-600"
                >
                  Cart{" "}
                  <span className="bg-red-500 rounded-lg text-white px-2 ms-1">
                    {numOfCart}
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-emerald-600">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-emerald-600">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/brands" className="hover:text-emerald-600">
                  Brands
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-emerald-600">
                  Wishlist
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <ul className="flex gap-3">
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook fa-lg text-slate-600 hover:text-blue-600"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube fa-lg text-slate-600 hover:text-red-600"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram fa-lg text-slate-600 hover:text-pink-600"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin fa-lg text-slate-600 hover:text-blue-700"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter fa-lg text-slate-600 hover:text-blue-400"></i>
              </a>
            </li>
          </ul>
          <ul className="flex gap-4">
            {UserLogin ? (
              <li>
                <span
                  className="cursor-pointer text-slate-600 hover:text-red-600"
                  onClick={Signout}
                >
                  Signout
                </span>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-slate-600 hover:text-emerald-600"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-slate-600 hover:text-emerald-600"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
