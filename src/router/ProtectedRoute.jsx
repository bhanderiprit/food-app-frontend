import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReelSkeleton from "../features/auth/components/ReelSkeleton";
import BottamNavbar from "../features/auth/components/BottamNavbar";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function verifyUser() {
      try {
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/user/me`,
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

  if (loading) {
    return (
      <>
        <div className="feed-container">
          <ReelSkeleton />
        </div>

      </>
    );
  }

  return authenticated ? children : <Navigate to="/user/login" replace />;
};

export default ProtectedRoute;