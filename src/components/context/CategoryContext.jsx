import axios from "axios";
import { createContext } from "react";


export let CategoryContext = createContext();

export default function CategoryContextProvider(props) {
  
  function getAllCategories() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <CategoryContext.Provider value={{getAllCategories}}>
      {props.children}
    </CategoryContext.Provider>
  );
}
