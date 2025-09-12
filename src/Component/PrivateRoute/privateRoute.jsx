import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  if (token && (location.pathname === "/" || location.pathname === "/main")) {
    return <Navigate to="/how-are-you" replace />;
  }
  if (
    (!token || token == null) &&
    (location.pathname !== "/" || location.pathname === "/main")
  ) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
