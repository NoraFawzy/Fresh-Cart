import axios from "axios";
import { use, useEffect } from "react";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartId, setcartId] = useState(0);
  const [numOfCart, setnumOfCart] = useState(0);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setnumOfCart(res.data.numOfCartItems);
        setcartId(res.data.data._id);
        return res;
      })
      .catch((err) => err);
  }

  function updateCartProduct(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,

        {
          count: newCount,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function RemovesSpecificCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function ClearUserCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  function Checkout(cartId, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: formData },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  useEffect(() =>{ getLoggedUserCart()}, []);
  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedUserCart,
        updateCartProduct,
        RemovesSpecificCartItem,
        ClearUserCart,
        Checkout,
        setnumOfCart,
        cartId,
        numOfCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
