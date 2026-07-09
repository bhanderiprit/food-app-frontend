import { useNavigate } from "react-router-dom";
import "../../../css/Feed.css";
import { useAuth } from "../Hooks/useAuth";


const LogoutButton = () => {
  const navigate = useNavigate();
  const{handelFoodPartnerLogout}= useAuth()

  const handleLogout = async () => {
    await handelFoodPartnerLogout();
    navigate("/food-partner/login");
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
};

export default LogoutButton;