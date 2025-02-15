import React, { useContext, useEffect, useState } from 'react';
import style from './Brands.module.css';
import { BrandsContext } from '../context/BrandsContext';

export default function Brands() {
  let { getAllBrands } = useContext(BrandsContext);
  const [brands, setBrands] = useState([]);

  async function getBrands() {
    let res = await getAllBrands();
    console.log(res.data.data);
    setBrands(res.data.data);
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="container my-5 py-20 lg:py-15 text-center w-4/5 mx-auto">
      <h2 className="font-bold text-emerald-700 text-4xl mb-10">Brands</h2>
      {brands.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={brand.image}
                className="w-full h-48 object-cover"
                alt={brand.name}
              />
              <div className="p-4 flex-grow">
                <h3 className="text-emerald-700 text-left text-sm font-medium">
                  {brand.name}
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