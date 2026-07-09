import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../../css/profile.css";
import BottamNavbar from "../components/BottamNavbar";
import defaultProfilepic from '../../../assets/default-profile-pic.webp'

const FoodPartnerProfile = () => {
  const { id } = useParams();

  const [partner, setPartner] = useState(null);
  const [foods, setFoods] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/food/profile/${id}`
        );

        setPartner(res.data.foodPartner);
        setFoods(res.data.foods);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, [id]);

  if (!partner) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
  <>
    <div className="profile-page">

      {/* Cover */}
      <div className="cover"></div>

      <div className="profile-container">

        <div className="profile-header">

          <img
            src={partner.profilePic || defaultProfilepic}
            alt="profile"
            className="profile-pic"
          />

          <div className="profile-info">

            <h1>{partner.name || "Food Creator"}</h1>

            <p className="email">{partner.email}</p>

            <p className="bio">
              {partner.bio || "🍔 Passionate Food Creator"}
            </p>

            <div className="profile-stats">

              <div className="stat-card">
                <h2>{foods.length}</h2>
                <span>Posts</span>
              </div>

              <div className="stat-card">
                <h2>{partner.followers?.length || 0}</h2>
                <span>Followers</span>
              </div>

            </div>

            <div className="profile-actions">
  <button
    className="add-food-btn"
    onClick={() => navigate("/food-partner/create-food")}
  >
    + Add Food
  </button>
</div>

            

          </div>

        </div>

        <div className="video-title">
  <h2>Food Videos</h2>
</div>

<div className="video-grid">
  {foods.map((food) => (
    <div
      key={food._id}
      className="video-card"
      onClick={() => setSelectedVideo(food.videoUrl)}
    >
      <video
        src={food.videoUrl}
        className="profile-video"
        muted
        preload="metadata"
      />
    </div>
  ))}
</div>

      </div>

    </div>

    {selectedVideo && (
  <div
    className="video-modal"
    onClick={() => setSelectedVideo(null)}
  >
    <div
      className="video-modal-content"
      onClick={(e) => e.stopPropagation()}
    >
      <video
        src={selectedVideo}
        controls
        autoPlay
        className="fullscreen-video"
      />

      <button
        className="close-btn"
        onClick={() => setSelectedVideo(null)}
      >
        ✕
      </button>
    </div>
  </div>
)}

    <BottamNavbar />
  </>
);
};

export default FoodPartnerProfile;

