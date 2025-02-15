import React, { useContext, useEffect, useState } from "react";
import style from "./Categories.module.css";
import { CategoryContext } from "../context/CategoryContext";

export default function Categories() {
  let { getAllCategories } = useContext(CategoryContext);
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    let res = await getAllCategories();
    console.log(res.data.data);
    setCategories(res.data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container my-5 py-20 lg:py-15 text-center w-4/5 mx-auto">
      <h2 className="font-bold text-emerald-700 text-4xl mb-10">Categories</h2>
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 ">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={category.image}
                className="w-full h-60 object-cover"
                alt={category.name}
              />
              <div className="p-4 flex-grow">
                <h3 className="text-emerald-700 text-2xl font-medium">
                  {category.name}
                </h3>
              </div>
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