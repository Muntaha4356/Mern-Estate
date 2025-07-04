import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/isLoggedIn", { withCredentials: true }) // must match backend route exactly
      .then((res) => {
        console.log(res.success);
        setIsAuthenticated(res.data.success);
      })
      .catch((err) => {
        console.error("Auth check failed:", err.message); // helpful for debugging
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;



