import React from "react";
import Slider from "react-slick";
import style from "./MainSlider.module.css";

import img1 from "../../assets/e-commerceCover.jpg";
import img2 from "../../assets/e-commerceCover2.jpg";
import img3 from "../../assets/e-commerceCover3.jpg";
import img4 from "../../assets/slider-image-2.jpeg";
import img5 from "../../assets/slider-image-3.jpeg";

export default function MainSlider() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false, 
  };
  return (
    <>
      <div className="row mb-5 mt-10">
        <div className="w-3/4">
          <Slider {...settings}>
            <div className="relative">
              <img
                src={img1}
                className="w-full h-[600px] object-cover rounded-lg"
                alt="Slide 2"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h2 className="text-slate-700 text-4xl font-bold uppercase tracking-widest p-4  bg-slate-200 hover:scale-105 transition-transform duration-300 shadow-lg rounded-xl shadow-xl animate-pulse mb-96">
                  Best Deals Just a Click Away!
                </h2>
              </div>
            </div>
            <div className="relative">
              <img
                src={img2}
                className="w-full h-[600px] object-cover rounded-lg"
                alt="Slide 2"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h2 className="text-gray-800 text-5xl font-extrabold tracking-wide bg-gradient-to-r from-slate-300 to-green-200 p-6 rounded-xl shadow-xl animate-pulse mt-96">
                  Shop Easily from Your Phone!
                </h2>
              </div>
            </div>
            <div className="relative">
              <img
                src={img3}
                className="w-full h-[600px] object-cover rounded-lg"
                alt="Slide 3"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h2 className="text-gray-900 text-5xl font-semibold italic bg-slate-200 p-5 rounded-lgborder border-gray-300 hover:bg-gray-200 transition-allrounded-xl shadow-xl animate-pulse  mt-96">
                  Your Smart Shopping Starts Here!
                </h2>
              </div>
            </div>{" "}
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={img4} className="w-full h-[300px]" alt="" />
          <img src={img5} className="w-full h-[300px]" alt="" />
        </div>
      </div>
    </>
  );
}
