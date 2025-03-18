import React, { useRef } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "./index.css";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";

function App() {
  const simpleBarRef = useRef(null);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <SimpleBar
        ref={simpleBarRef}
        autoHide={false}
        forceVisible="y"
        style={{ maxHeight: "100vh", height: "100%", overflowX: "hidden" }}
      >
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetails/>} />
            <Route path="/cart" element={<Cart/>} />
          </Routes>
        </Router>
      </SimpleBar>
    </div>
  );
}

export default App;
