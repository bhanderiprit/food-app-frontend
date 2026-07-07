import React from 'react'
import { FaHome, FaBookmark } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import '../../../css/Feed.css'

const BottamNavbar = () => {
  const navigate = useNavigate()

  return (
    <div className="bottom-navbar">
  <button
    className="nav-btn"
    onClick={() => navigate("/feed")}
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
</div>
  )
}

export default BottamNavbar