import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Notfound from "./components/Notfound/Notfound";
import Products from "./components/Products/Products";
import Register from "./components/Register/Register";
import UserContextProvider from "./components/context/UserContext";
import OrderContextProvider from "./components/context/OrderContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./components/context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./components/Checkout/Checkout";
import Allorders from "./components/Allorders/Allorders";
import WishContextProvider from "./components/context/WishlistContext";
import WishList from "./components/WishList/WishList";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import VerifyCode from "./components/VerifyCode/VerifyCode";
import CategoryContextProvider from "./components/context/CategoryContext";
import BrandContextProvider from "./components/context/BrandsContext";
import ResetPassword from "./components/ResetPassword/ResetPassword";

function App() {
  let x = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Allorders />
            </ProtectedRoute>
          ),
        },
        // {
        //   path: "forget-password",
        //   element: (
        //     <ProtectedRoute>
        //       <ForgetPassword />
        //     </ProtectedRoute>
        //   ),
        // },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id/:category",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        { path: "footer", element: <Footer /> },
        { path: "login", element: <Login /> },
        { path: "navbar", element: <Navbar /> },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "*", element: <Notfound /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-code", element: <VerifyCode /> },
        { path: "resetpass", element: <ResetPassword/> },
      ],
    },
  ]);

  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <OrderContextProvider>
            <WishContextProvider>
              <CategoryContextProvider>
                <BrandContextProvider>
                  <RouterProvider router={x}></RouterProvider>
                  <Toaster />
                </BrandContextProvider>
              </CategoryContextProvider>
            </WishContextProvider>
          </OrderContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
