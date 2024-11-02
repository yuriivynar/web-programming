import React from "react";
import Header from "./containers/Header/Header";
import Footer from "./containers/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./containers/HomePage/Home";
import CatalogPage from "./containers/CatalogPage/Catalog";
import ItemPage from "./containers/ItemPage/ItemPage";
import ContextProvider from "./components/context_provider/ContextProvider";


function App() {
    return (
      <ContextProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:index" element={<ItemPage />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </ContextProvider>
    )
}

export default App; 