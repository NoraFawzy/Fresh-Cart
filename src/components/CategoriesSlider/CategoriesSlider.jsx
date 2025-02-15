import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [Categories, setCategories] = useState([]);

  function getCategory() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        console.log(res.data.data);
        setCategories(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,

  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div className="container my-5 lg:py-15 text-center w-[98%] mx-auto">
        <h2 className="text-start font-semibold text-2xl my-3 capitalize text-gray-700">
          shop popular categories
        </h2>
        <Slider {...settings}>
          {Categories.map((category) => (
            <div>
              <img
                src={category.image}
                className="w-full h-[200px] object-cover"
                alt=""
              />
              <h4>{category.name}</h4>
            </div>
          ))}
        </Slider>{" "}
      </div>
    </>
  );
}
