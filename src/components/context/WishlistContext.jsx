import axios from "axios";
import { createContext } from "react";

export let WishContext = createContext();

export default function WishContextProvider(props) {
  let headers = { token: localStorage.getItem("userToken") };

  function AddProductToWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        { headers }
      )
      .then((res) => res)

      .catch((err) => err);
  }

  function getLoggedUserWishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  function RemoveProductFromWishlist(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <WishContext.Provider
      value={{ AddProductToWishlist, getLoggedUserWishlist , RemoveProductFromWishlist}}
    >
      {props.children}
    </WishContext.Provider>
  );
}
