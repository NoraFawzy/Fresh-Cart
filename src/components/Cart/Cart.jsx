import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import emptyCard from "../../assets/empty-cart.png";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getLoggedUserCart,
    updateCartProduct,
    RemovesSpecificCartItem,
    ClearUserCart,
    setnumOfCart,
    numOfCart,
  } = useContext(CartContext);
  const [cartDetails, setcartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);

  async function getCartItems() {
    setIsLoading(true);
    let res = await getLoggedUserCart();
    console.log(res.data.data);
    setcartDetails(res.data.data);
    setIsLoading(false);
  }

  async function updateProduct(id, count) {
    setIsLoading(true);
    let res = await updateCartProduct(id, count);
    if (res.data.status == "success") {
      setcartDetails(res.data.data);
      toast.success("Product updated successfully!");
    } else {
      toast.error("Error!!");
    }
    setIsLoading(false);
  }

  async function handleDelete(id) {
    setLoadingDeleteId(id);
    let res = await RemovesSpecificCartItem(id);
    console.log(res, "delete");
    if (res.data.status == "success") {
      setcartDetails(res.data.data);
      setnumOfCart(numOfCart - 1);
      toast.success("Product deleted successfully!");
    } else {
      toast.error("Error!!");
    }
    setLoadingDeleteId(null);
  }

  async function deleteAllProducts() {
    setIsLoading(true);
    let res = await ClearUserCart();
    if (res.data.message == "success") {
      setcartDetails(res.data.data);
      setnumOfCart(0);
      toast.success("All products deleted successfully!");
    } else {
      toast.error("Error!!");
    }
    setIsLoading(false);
    console.log(res, "delete all");
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <div className="container my-5 py-20 lg:py-15 text-center w-4/5 mx-auto">
        {isLoading ? (
          <div className="spinner">
            <div className="double_bounce1"></div>
            <div className="double_bounce2"></div>
          </div>
        ) : cartDetails?.products.length > 0 ? (
          <>
            <h2 className="text-center text-2xl text-emerald-600 font-bold mb-3 capitalize">
              Total Price : {cartDetails?.totalCartPrice} EGP
            </h2>
            <button
              onClick={() => deleteAllProducts()}
              className="bg-red-500 text-white py-2 font-semibold hover:bg-red-400 p-2 rounded flex mb-3"
            >
              clear all cart <i className="fa-solid fa-trash ps-2 self-center"></i>
            </button>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-slate-200">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartDetails?.products.map((product) => (
                    <tr
                      key={product.product.id}
                      className="bg-white border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <img
                          src={product.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {product.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                            type="button"
                            onClick={() =>
                              updateProduct(
                                product.product.id,
                                product.count - 1
                              )
                            }
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <span>{product.count}</span>
                          </div>
                          <button
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                            type="button"
                            onClick={() =>
                              updateProduct(
                                product.product.id,
                                product.count + 1
                              )
                            }
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {product.price * product.count} EGP
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="font-medium text-red-600 hover:underline cursor-pointer"
                          onClick={() => handleDelete(product.product.id)}
                        >
                          Remove
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Link to={"/checkout"}>
                <button className="bg-emerald-700 w-full py-2 text-white">
                  Check Out
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-emerald-800 font-semibold text-4xl">
              No Products to show !!!
            </h2>
            <div className="flex items-center justify-center capitalize">
              <img src={emptyCard} alt="Empty Cart" />
            </div>
          </>
        )}
      </div>
    </>
  );
}