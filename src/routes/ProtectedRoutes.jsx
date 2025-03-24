import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const authtoken = localStorage.getItem("token");

  console.log(authtoken);

  return children;
};
