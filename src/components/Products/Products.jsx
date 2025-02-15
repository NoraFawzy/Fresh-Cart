import style from "./Products.module.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { WishContext } from "../context/WishlistContext";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";

export default function Products() {
  let { AddProductToWishlist } = useContext(WishContext);
  const [Products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  let { addProductToCart, numOfCart, setnumOfCart } = useContext(CartContext);
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    try {
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Error parsing wishlist from localStorage:", error);
      return [];
    }
  });

  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        console.log(res.data.data);
        setProducts(res.data.data);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }

  async function addToCart(id) {
    setCurrentId(id);
    setIsLoading(true);
    let response = await addProductToCart(id);
    console.log(response.data);

    if (response.data.status === "success") {
      setnumOfCart(numOfCart + 1);
      setIsLoading(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
      setIsLoading(false);
    }
  }

  async function addWishlist(productId) {
    setCurrentId(productId);
    setIsLoading(true);
    let res = await AddProductToWishlist(productId);
    console.log(res);

    if (res.data.status === "success") {
      const updatedWishlist = [...wishlist, productId];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
    setIsLoading(false);
    setCurrentId(null);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container my-5 py-20 lg:py-15 text-center w-4/5 mx-auto">
      {Products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-lg relative"
            >
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
              >
                <img
                  src={product.imageCover}
                  className="w-full h-48 object-cover"
                  alt={product.title}
                />
                <div className="p-4 flex-grow">
                  <h3 className="text-emerald-700 text-left text-sm font-medium">
                    {product.category.name}
                  </h3>
                  <h3 className="font-semibold mb-1 text-left text-lg">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-700 font-bold">
                      {product.price} EGP
                    </span>
                    <span className="flex items-center">
                      <i className="fas fa-star text-yellow-500 mr-1"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </div>
              </Link>

              <button
                className={`absolute top-[200px] right-2 bg-white border border-red-600 rounded-full p-1 px-2 hover:bg-red-600 hover:text-white ${
                  wishlist.includes(product.id) ? "bg-red-600 text-red-600" : ""
                }`}
                onClick={() => addWishlist(product.id)}
              >
                {isLoading && currentId === product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fa-solid fa-heart"></i>
                )}
              </button>

              <button
                className="btn bg-emerald-500 text-white w-full rounded-b-lg py-2 hover:bg-emerald-600 mt-auto"
                onClick={() => addToCart(product.id)}
              >
                Add to cart <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="spinner">
          <div className="double_bounce1"></div>
          <div className="double_bounce2"></div>
        </div>
      )}
    </div>
  );
}