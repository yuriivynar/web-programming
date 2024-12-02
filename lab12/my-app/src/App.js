import React from "react";
import Footer from "./containers/Footer/Footer";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./containers/HomePage/Home";
import CatalogPage from "./containers/CatalogPage/Catalog";
import ItemPage from "./containers/ItemPage/ItemPage";
import CartPage from "./containers/CartPage/CartPage";
import CheckOut from "./containers/CheckoutPage/CheckOut";
import SuccessPage from "./containers/CheckoutPage/SuccessPage";
import Register from "./containers/Register/Register.js";
import Login from "./containers/Login/Login.js";
import PrivateRoute from "./components/PrivateRoute.js";
import Header from "./containers/Header/Header.js";

function App() {
    return (
      <Router>
        <Header />
        <main>
          <Routes>
                <Route path="/" element={<Navigate to="/register" />} />
                <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                <Route path="/catalog" element={<PrivateRoute><CatalogPage /></PrivateRoute>} />
                <Route path="/catalog/:index" element={<PrivateRoute><ItemPage /></PrivateRoute>} />
                <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
                <Route path="/checkout" element={<PrivateRoute><CheckOut /></PrivateRoute>} />
                <Route path="/success" element={<PrivateRoute><SuccessPage /></PrivateRoute>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    )
}

export default App; 