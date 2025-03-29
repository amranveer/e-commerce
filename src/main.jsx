import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";
import { UserContextProvider } from "./context/UserContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <UserContextProvider>

    <CartProvider>
      <App />
    </CartProvider>
    </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
);
