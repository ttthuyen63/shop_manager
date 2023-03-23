import logo from "./logo.svg";
import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import { Container } from "react-bootstrap";
import AddOrderPage from "./pages/addOrderPage";
import OrderPage from "./pages/orderPage";
// import EditOrderPage from "./pages/editOrderPage";
import AddProductPage from "./pages/addProductPage";
import EditProductPage from "./pages/editProductPage";
import ProductListPage from "./pages/productListPage";
import SuccessDeliver from "./pages/successDeliver";

function App() {
  return (
    <Container>
      <HomePage />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addOrder" element={<AddOrderPage />} />
          <Route path="/addProduct" element={<AddProductPage />} />
          <Route path="/orderList" element={<OrderPage />} />
          <Route path="/successDeliver" element={<SuccessDeliver />} />
          <Route path="/editProduct" element={<EditProductPage />} />
          <Route path="/productList" element={<ProductListPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
