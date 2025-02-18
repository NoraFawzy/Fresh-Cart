import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import logo from "../../assets/freshcart-logo.svg";

export default function Navbar() {
  let navigate = useNavigate();
  let { UserLogin, setUserLogin } = useContext(UserContext);
  let { numOfCart } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function Signout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <nav className="border-gray-200 bg-slate-200 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto p-4">
        <div className="flex items-center gap-6">
          <Link to="/">
            <img src={logo} className="h-8" alt="Logo" />
          </Link>
          <button
            className="lg:hidden text-slate-600 hover:text-emerald-600 text-end"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fas fa-bars fa-lg"></i>
          </button>
        </div>

        <div
          className={`absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent 
            shadow-lg lg:shadow-none p-5 lg:p-0 transition-transform duration-300 ease-in-out
            ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          <ul className="flex flex-col lg:flex-row gap-4 lg:items-center">
            {UserLogin && (
              <>
                <li><Link to="/" className="hover:text-emerald-600">Home</Link></li>
                <li>
                  <Link to="/cart" className="flex items-center hover:text-emerald-600">
                    Cart <span className="bg-red-500 text-white px-2 ms-1 rounded-lg">{numOfCart}</span>
                  </Link>
                </li>
                <li><Link to="/products" className="hover:text-emerald-600">Products</Link></li>
                <li><Link to="/categories" className="hover:text-emerald-600">Categories</Link></li>
                <li><Link to="/brands" className="hover:text-emerald-600">Brands</Link></li>
                <li><Link to="/wishlist" className="hover:text-emerald-600">Wishlist</Link></li>
                <li><Link to="/login" className="text-slate-600 hover:text-red-600" onClick={Signout}>Signout</Link></li>
              </>
            )}
            {!UserLogin && (
              <>
                <li><Link to="/login" className="text-slate-600 hover:text-emerald-600">Login</Link></li>
                <li><Link to="/register" className="text-slate-600 hover:text-emerald-600">Register</Link></li>
              </>
            )}
          </ul>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <ul className="flex gap-3">
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-lg text-slate-600 hover:text-blue-600"></i></a>
            </li>
            <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-lg text-slate-600 hover:text-red-600"></i></a>
            </li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-lg text-slate-600 hover:text-pink-600"></i></a>
            </li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-lg text-slate-600 hover:text-blue-700"></i></a>
            </li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-lg text-slate-600 hover:text-blue-400"></i></a>
            </li>
          </ul>
          <ul className="flex flex-col lg:flex-row gap-4 mt-4 lg:mt-0">
            {UserLogin ? (
              <li>
                <span className="cursor-pointer text-slate-600 hover:text-red-600" onClick={Signout}>
                  Signout
                </span>
              </li>
            ) : (
              <>
                <li><Link to="/login" className="text-slate-600 hover:text-emerald-600">Login</Link></li>
                <li><Link to="/register" className="text-slate-600 hover:text-emerald-600">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}