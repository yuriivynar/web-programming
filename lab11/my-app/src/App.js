import React from "react";
import Header from "./containers/Header/Header";
import Footer from "./containers/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./containers/HomePage/Home";
import CatalogPage from "./containers/CatalogPage/Catalog";
import ItemPage from "./containers/ItemPage/ItemPage";
import CartPage from "./containers/CartPage/CartPage";
import CheckOut from "./containers/CheckoutPage/CheckOut";
import SuccessPage from "./containers/CheckoutPage/SuccessPage";


function App() {
    return (
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:index" element={<ItemPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/success" element={<SuccessPage />} />
            </Routes>
          </main>
          <Footer />
        </Router>
    )
}

export default App; 