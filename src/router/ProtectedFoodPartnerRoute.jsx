import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedFoodPartnerRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function verifyUser() {
      try {
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/foodPartner/getFoodPartner`,
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

  return authenticated ? children : <Navigate to="/food-partner/login" replace />;
};

export default ProtectedFoodPartnerRoute;