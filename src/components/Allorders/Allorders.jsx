import React, { useContext, useEffect, useState } from "react";
import style from "./Allorders.module.css";
import { orderContext } from "../context/OrderContext";
import { format } from "date-fns";

export default function Allorders() {
  let { getAllOrders } = useContext(orderContext);
  const [orders, setOrders] = useState([]);

  async function allOrders() {
    let res = await getAllOrders();
    console.log(res.data.data);
    setOrders(res.data.data);
  }

  useEffect(() => {
    allOrders();
  }, []);

  return (
    <div className="container my-5 py-20 lg:py-15 text-center w-4/5 mx-auto">
      <h3 className="font-bold text-5xl text-center my-6 text-emerald-700">
        Your orders!
      </h3>
      <table className="min-w-full bg-slate-200">
        <thead>
          <tr>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Qty</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Total Price</th>
            <th className="px-6 py-3">Payment Method</th>
            <th className="px-6 py-3">Shipping Address</th>
            <th className="px-6 py-3">Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, orderIndex) => (
            <React.Fragment key={order._id}>
              {order.cartItems.map((item, index) => (
                <tr
                  key={`${order._id}-${index}`}
                  className={`bg-white border-b border-gray-400 hover:bg-gray-50 ${
                    index === 0 ? "border-t-4 border-emerald-700" : ""
                  }`}
                >
                  <td className="p-4">
                    <img
                      src={item.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt="Product"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {item.product.title}
                  </td>
                  <td className="px-6 py-4">{item.count}</td>
                  <td className="px-6 py-4">{item.price} EGP</td>
                  {index === 0 && (
                    <>
                      <td
                        className="px-6 py-4"
                        rowSpan={order.cartItems.length}
                      >
                        {order.totalOrderPrice} EGP
                      </td>
                      <td
                        className="px-6 py-4"
                        rowSpan={order.cartItems.length}
                      >
                        {order.paymentMethodType}
                      </td>
                      <td
                        className="px-6 py-4" 
                        rowSpan={order.cartItems.length}
                      >
                        {order.shippingAddress?.details},{" "}
                        {order.shippingAddress?.city},{" "}
                        {order.shippingAddress?.phone}
                      </td>
                      <td
                        className="px-6 py-4"
                        rowSpan={order.cartItems.length}
                      >
                        {format(new Date(order.createdAt), 'yyyy-MM-dd HH:mm:ss')}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}