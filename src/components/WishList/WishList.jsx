import React, { useContext, useEffect, useState } from "react";
import style from "./WishList.module.css";
import { WishContext } from "../context/WishlistContext";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";

export default function WishList() {
  let { getLoggedUserWishlist, RemoveProductFromWishlist } = useContext(WishContext);
  const [wishList, setwishList] = useState([]);
  let { addProductToCart, numOfCart, setnumOfCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);

  async function fetchWishlist() {
    setIsLoading(true);
    let res = await getLoggedUserWishlist();
    console.log(res.data.data);
    if (res) {
      setwishList(res.data.data);
    }
    setIsLoading(false);
  }

  async function DeleteProduct(id) {
    setLoadingDeleteId(id);
    let res = await RemoveProductFromWishlist(id);
    console.log(res.data?.data);
    if (res.data.status === "success") {
      const updatedWishlist = wishList.filter((product) => product.id !== id);
      setwishList(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      toast.success("Product deleted successfully!");
    } else {
      toast.error("Error!!");
    }
    setLoadingDeleteId(null);
  }

  async function addToCart(id) {
    setIsLoading(true);
    setCurrentId(id);
    let response = await addProductToCart(id);
    console.log(response.data);

    if (response.data.status == "success") {
      setnumOfCart(numOfCart + 1);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    setIsLoading(false);
    setCurrentId(null);
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="container my-5 py-20 lg:py-15 text-center w-4/5 mx-auto">
      <h1 className="font-bold text-4xl text-center my-6 text-emerald-700">
        Your wishList
      </h1>
      {isLoading ? (
        <div className="spinner">
          <div className="double_bounce1"></div>
          <div className="double_bounce2"></div>
        </div>
      ) : (
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              {wishList.length > 0 ? (
                wishList.map((product) => (
                  <tbody key={product.id}>
                    <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                      <th className="">
                        <img
                          src={product?.imageCover}
                          alt=""
                          width="200px"
                          height="250px"
                        />
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {product?.title}
                      </th>
                      <td className="px-6 py-4">{product?.price} EGP</td>
                      <td className="px-6 py-4">
                        <button
                          className="bg-emerald-600 px-3 text-white py-3 rounded me-2"
                          onClick={() => addToCart(product.id)}
                          disabled={isLoading && currentId === product.id}
                        >
                          {isLoading && currentId === product.id ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            "Add to cart"
                          )}
                        </button>
                        <button
                          className="bg-red-500 px-3 text-white py-3 rounded"
                          onClick={() => DeleteProduct(product.id)}
                          disabled={loadingDeleteId === product.id}
                        >
                          {loadingDeleteId === product.id ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            <>
                              <i className="fa-solid fa-trash"></i> Remove
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <p>No items in wishlist</p>
              )}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}