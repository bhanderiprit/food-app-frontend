import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function verifyUser() {
      try {
        await axios.get(
          "http://localhost:3000/api/auth/user/me",
          {
            withCredentials: true,
          }
        );

        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    verifyUser();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return authenticated ? children : <Navigate to="/user/login" replace />;
};

export default ProtectedRoute;