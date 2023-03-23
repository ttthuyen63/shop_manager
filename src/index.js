import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import AddOrderPage from "./pages/addOrderPage";
import AddProductPage from "./pages/addProductPage";
import OrderPage from "./pages/orderPage";
import LoginPage from "./pages/loginPage";
import EditProductPage from "./pages/editProductPage";
import ProductListPage from "./pages/productListPage";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import store from "./redux/store";
import ProtectRouter from "./components/ProtectRouter";
import OrderDetail from "./pages/orderDetail";
import ProductDetail from "./pages/productDetail";
import SuccessDeliver from "./pages/successDeliver";
import CancelBill from "./pages/Delivering";
import Delivering from "./pages/Delivering";
import ConfirmBill from "./pages/ConfirmBill";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRouter>
        <HomePage />,
      </ProtectRouter>
    ),
  },
  {
    path: "/addOrder",
    element: (
      <ProtectRouter>
        <AddOrderPage />,
      </ProtectRouter>
    ),
  },
  {
    path: "/addProduct",
    element: (
      <ProtectRouter>
        <AddProductPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/orderList",
    element: (
      <ProtectRouter>
        <OrderPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/successDeliver",
    element: (
      <ProtectRouter>
        <SuccessDeliver />
      </ProtectRouter>
    ),
  },
  {
    path: "/editProduct/:code",
    element: (
      <ProtectRouter>
        <EditProductPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/productList",
    element: (
      <ProtectRouter>
        <ProductListPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/orderList/:id",
    element: (
      <ProtectRouter>
        <OrderDetail />
      </ProtectRouter>
    ),
  },
  {
    path: "/deliveringBill",
    element: (
      <ProtectRouter>
        <Delivering />
      </ProtectRouter>
    ),
  },
  {
    path: "/confirmBill",
    element: (
      <ProtectRouter>
        <ConfirmBill />
      </ProtectRouter>
    ),
  },
  {
    path: "/productList/:code",
    element: (
      <ProtectRouter>
        <ProductDetail />
      </ProtectRouter>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* // <Provider> */}
    <RouterProvider router={router} />
    {/* <App /> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
