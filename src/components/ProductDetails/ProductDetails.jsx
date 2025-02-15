import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import { WishContext } from "../context/WishlistContext";

export default function ProductDetails() {
  let { id, category } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
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
  });  let { AddProductToWishlist } = useContext(WishContext);

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setProduct(res.data.data);
      })
      .catch((res) => {
        console.log(res.data.data);
      });
  }

  function getAllProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        console.log(res.data.data);
        let related = res.data.data.filter(
          (product) => product.category.name === category
        );
        setRelatedProducts(related);
        console.log(related);
      })
      .catch((res) => {});
  }

  async function addToCart(id) {
    setcurrentId(id);
    setisLoading(true);
    let response = await addProductToCart(id);
    console.log(response.data);

    if (response.data.status == "success") {
      setnumOfCart(numOfCart + 1);
      setisLoading(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
      setisLoading(false);
    }
  }

  async function addWishlist(productId) {
    setCurrentId(productId);
    setisLoading(true);
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
    setisLoading(true);
    setCurrentId(null);
  }

  useEffect(() => {
    getProduct(id);
    getAllProducts();
  }, [id, category]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="container my-5 py-20 lg:py-15 text-center w-4/5 mx-auto">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/3 mb-5 lg:mb-0">
          <Slider {...settings}>
            {product?.images.map((src, index) => (
              <img key={index} src={src} className="w-full rounded-lg" alt="" />
            ))}
          </Slider>
        </div>
        <div className="w-full lg:w-2/3 text-start p-4">
          <h3 className="font-semibold capitalize text-2xl mb-4">
            {product?.title}
          </h3>
          <h4 className="text-gray-600 mb-4">{product?.description}</h4>
          <h4 className="text-gray-500 mb-4">{product?.category.name}</h4>
          <div className="flex justify-between items-center mb-5">
            <span className="text-emerald-700 font-bold text-xl">
              {product?.price} EGP
            </span>
            <span className="flex items-center">
              <i className="fas fa-star text-yellow-500 mr-1"></i>
              {product?.ratingsAverage}
            </span>
          </div>
          <button
            className="btn bg-emerald-500 text-white w-full rounded-lg py-2 hover:bg-emerald-600"
            onClick={() => addToCart(product.id)}
          >
            Add to cart <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </div>
      <h2 className="font-bold text-emerald-700 text-4xl mt-10 mb-5">
        Related Products
      </h2>
      {relatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
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
                <i className="fa-solid fa-heart"></i>
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
