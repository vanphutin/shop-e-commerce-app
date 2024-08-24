import { createBrowserRouter, Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";
import GetStart from "../pages/GetStart";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RegisterSeller from "../components/register-seller/RegisterSeller";
import Admin from "../components/admin/Admin";
import Dashboard from "../components/admin/content/menu/Dashboard";
import Sidebar from "../components/admin/content/Sidebar";
import SidebarLayout from "../components/admin/SidebarLayout";
import Products from "../components/admin/content/menu/Products";
import ProductsViewAll from "../components/products/product-view-all/ProductsViewAll";
import HeaderPage from "../pages/HeaderPage";
import ScrollToTop from "../utils/ScrollToTop";
import ProductDetail from "../components/products/product-detail/ProductDetail";
import ProductCart from "../components/products/product-cart/ProductCart";
import ProductFavourite from "../components/products/product-favourite/ProductFavourite";
import ShopPage from "../pages/ShopPage";
import ShopProfile from "../components/shop-page/ShopProfile";
import CheckOutPage from "../pages/CheckOutPage";
import ProfilePage from "../pages/ProfilePage";

const AuthLayout = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ScrollToTop />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/get-start",
        element: <GetStart />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/sign-up",
        element: <RegisterPage />,
      },
      {
        path: "/register-seller/:id",
        element: <RegisterSeller />,
      },
      {
        path: "/admin",
        element: <SidebarLayout />,
        children: [
          {
            path: "",
            element: <Admin />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "product",
            element: <Products />,
          },
          // Bạn có thể thêm các route con khác tại đây
        ],
      },

      {
        path: "",
        element: <HeaderPage />,
        children: [
          {
            path: "products",
            element: <ProductsViewAll />,
          },
          {
            path: "products/detail/:id",
            element: <ProductDetail />,
          },
          {
            path: "/cart",
            element: <ProductCart />,
          },
          {
            path: "/favourited",
            element: <ProductFavourite />,
          },
          {
            path: "/shop",
            element: <ShopPage />,
          },
          {
            path: "/shop/detail/:id",
            element: <ShopProfile />,
          },
          {
            path: "/check-out/:id",
            element: <CheckOutPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
