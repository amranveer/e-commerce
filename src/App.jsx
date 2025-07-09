import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "./index.css";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Login from "./pages/LoginPage";
// import SignUpPage from "./pages/SignUpPage";
// import EmailVerificationPage from "./pages/EmailVerificationPage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import { checkAuth } from "./redux/thunks/authThunks";
import AddProduct from "./adminPages/AddProduct";

function App() {
  const dispatch = useDispatch();
  const simpleBarRef = useRef(null);

  const { isAuthenticated, user, isCheckingAuth } = useSelector((state) => state.auth);

  // ✅ Check Auth on App Load
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // ✅ Protect private pages
  const ProtectedRoutes = ({ children }) => {
    if (isCheckingAuth) return <p>Loading...</p>;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (user && !user.isVerified) return <Navigate to="/verify-email" replace />;
    return children;
  };

  // ✅ Prevent logged-in users from accessing login/signup
  const RedirectAuthenticatedUser = ({ children }) => {
    if (isCheckingAuth) return <p>Loading...</p>;
    if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <SimpleBar
        ref={simpleBarRef}
        autoHide={true}
        forceVisible="y"
        style={{ maxHeight: "100vh", height: "100%", overflowX: "hidden" }}
      >
        <Routes>
          {/* Auth Routes */}
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <Login />
              </RedirectAuthenticatedUser>
            }
          />
          {/* <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          /> */}
          {/* <Route path="/verify-email" element={<EmailVerificationPage />} /> */}

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />

          <Route
            path="/products"
            element={
              <>
                <Navbar />
                <Products />
              </>
            }
          />

            <Route
            path="/add"
            element={
              <ProtectedRoutes>
              <AddProduct/>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/products/:productId"
            element={
              <>
                <Navbar />
                <ProductDetails />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <Navbar />
                <Cart />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Navbar />
                <ProfilePage />
              </ProtectedRoutes>
            }
          />
        </Routes>

        <Toaster />
      </SimpleBar>
    </div>
  );
}

export default App;
