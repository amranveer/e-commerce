import React, { useEffect, useRef } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "./index.css";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Login from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import {Toaster} from 'react-hot-toast';
import { useAuthStore } from "./store/authstore";
import ProfilePage from "./pages/ProfilePage";
function App() {
  const simpleBarRef = useRef(null);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  
  
  const ProtectedRoutes = ({children}) => {
    if(!isAuthenticated){
      return <Navigate to="/login" replace/>
    }
    if(!user.isVerified){
      return <Navigate to ="/verify-email" replace />
     }

     return children

  }

  const RedirectAuthenticatedUser = ({children}) =>{
    const {isAuthenticated, user} = useAuthStore();
    if(isAuthenticated && user.isVerified){
      return <Navigate to="/" replace />
              
    }
    return children
    }

  useEffect(()=>{
       checkAuth()
  },[checkAuth])

  console.log('isauthenitcated', isAuthenticated)
  console.log('user', user)
  return (
    <div className="h-screen w-screen overflow-hidden">
      <SimpleBar
        ref={simpleBarRef}
        autoHide={true}
        forceVisible="y"
        style={{ maxHeight: "100vh", height: "100%", overflowX: "hidden" }}
      >  
          <Routes>
            <Route path = "/login" element = {
              <RedirectAuthenticatedUser>

                <Login/>
              </RedirectAuthenticatedUser>
              
              }/>
            <Route path = "/signup" element = {
              <RedirectAuthenticatedUser>

                <SignUpPage/>
              </RedirectAuthenticatedUser>
              
              }/>
            <Route path = "/verify-email" element = {<EmailVerificationPage/>}/>
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
             <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <Navbar/>
                   <ProfilePage/>
                </ProtectedRoutes>
              }
            />
          </Routes>
          <Toaster/>
        
      </SimpleBar>
    </div>
  );
}

export default App;
