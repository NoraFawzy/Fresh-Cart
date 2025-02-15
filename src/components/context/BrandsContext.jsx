import axios from "axios";
import { createContext } from "react";

export let BrandsContext = createContext();


export default function BrandContextProvider(props) {
  
  function getAllBrands() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then((res) => res)
    .catch((err) => err);
  }


  return (
    <BrandsContext.Provider value={{getAllBrands}}>
      {props.children}
    </BrandsContext.Provider>
  )
}