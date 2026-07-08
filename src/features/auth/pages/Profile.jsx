import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../../css/profile.css";
import BottamNavbar from "../components/BottamNavbar";
import defaultProfilepic from '../../../assets/default-profile-pic.webp'

const Profile = () => {
  const { id } = useParams();

  const [partner, setPartner] = useState(null);
  const [foods, setFoods] = useState([]);

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
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={
            partner.profilePic ||
            defaultProfilepic
          }
          alt="profile"
          className="profile-pic"
        />

        <div className="profile-info">
          <h1>{partner.name || "Food Creator"}</h1>

          <p>{partner.email}</p>

          <div className="profile-stats">
            <div>
              <h3>{foods.length}</h3>
              <span>Posts</span>
            </div>

            <div>
              <h3>{partner.followers?.length || 0}</h3>
              <span>Followers</span>
            </div>
          </div>

          <p className="bio">
            {partner.bio || "Food Creator 🍔"}
          </p>
        </div>
      </div>

      <div className="section-title">
        <h2>Food Videos</h2>
      </div>

      <div className="video-grid">
        {foods.map((food) => (
          <video
            key={food._id}
            src={food.videoUrl}
            controls
            className="profile-video"
          />
        ))}
      </div>
    </div>
    <BottamNavbar/>
    </>
  );
};

export default Profile;