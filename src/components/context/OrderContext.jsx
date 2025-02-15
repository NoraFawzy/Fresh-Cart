import axios from "axios";
import { createContext } from "react";

export let orderContext = createContext();

export default function OrderContextProvider(props) {
  function getAllOrders() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/`)
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <orderContext.Provider value={{ getAllOrders }}>
      {props.children}
    </orderContext.Provider>
  );
}
