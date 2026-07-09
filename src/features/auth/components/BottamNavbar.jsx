import React, { useState, useRef, useEffect } from "react";
import { FaHome, FaBookmark, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../../css/Feed.css";
import { useAuth } from "../Hooks/useAuth";

const BottamNavbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
  const{loading, handelUserLogout, handelUserLogoutAll} = useAuth()

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  const logout = async () => {
    try {
      await handelUserLogout()
      alert('logout successfully')
    navigate("/user/login");
    } catch (error) {
      alert('logout failed')
      
    }
  };

  const logoutAll = async() => {
    try {
      await handelUserLogoutAll()
      alert('logout from all device')
    navigate("user/login");
    } catch (error) {
      alert('logout failed')
      
    }
  };

  return (
    <>
      <div className="bottom-navbar">
        <button
          className="nav-btn active"
          onClick={() => navigate("/")}
        >
          <FaHome />
          <span>Home</span>
        </button>

        <button
          className="nav-btn"
          onClick={() => navigate("/save")}
        >
          <FaBookmark />
          <span>Saved</span>
        </button>

        <div className="menu-container" ref={menuRef}>
          <button
            className="nav-btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            <FaEllipsisV />
            <span>More</span>
          </button>

          {showMenu && (
            <div className="popup-menu">
              <button onClick={logout}>Logout</button>
              <button className="danger" onClick={logoutAll}>
                Logout All Devices
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BottamNavbar;