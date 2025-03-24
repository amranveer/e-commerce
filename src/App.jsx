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
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const simpleBarRef = useRef(null);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <SimpleBar
        ref={simpleBarRef}
        autoHide={true}
        forceVisible="y"
        style={{ maxHeight: "100vh", height: "100%", overflowX: "hidden" }}
      >
        <Router>
    
          
          <Routes>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/register" element = {<Register/>}/>
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <Navbar/>
                  <Home />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/products"
              element={
                <ProtectedRoutes>
                  <Navbar/>
                  <Products />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/products/:productId"
              element={
                <ProtectedRoutes>
                  <Navbar/>
                  <ProductDetails />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoutes>
                  <Navbar/>
                  <Cart />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </Router>
      </SimpleBar>
    </div>
  );
}

export default App;
