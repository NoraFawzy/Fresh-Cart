import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [Categories, setCategories] = useState([]);

  function getCategory() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, 
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768, 
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="container my-5 lg:py-5 text-center w-[98%] mx-auto">
      <h2 className="text-start font-semibold text-2xl my-3 capitalize text-gray-700">
        Shop Popular Categories
      </h2>
      <Slider {...settings}>
        {Categories.map((category, index) => (
          <div key={index} className="px-2">
            <img
              src={category.image}
              className="w-full h-[150px] md:h-[180px] lg:h-[200px] object-cover rounded-lg shadow-md"
              alt={category.name}
            />
            <h4 className="text-gray-700 text-sm md:text-lg font-medium mt-2">
              {category.name}
            </h4>
          </div>
        ))}
      </Slider>
    </div>
  );
}
