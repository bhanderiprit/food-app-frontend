import React, { useEffect, useState } from "react";
import axios from "axios";
import BottomNavbar from "../components/BottamNavbar";
import "../../../css/Save.css";

const Save = () => {
  const [savedFoods, setSavedFoods] = useState([]);

  useEffect(() => {
    async function getSaveVideo() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/food/getSavedFood`,
          { withCredentials: true }
        );

        setSavedFoods(res.data.savedFoods || []);
      } catch (error) {
        console.log(error);
      }
    }

    getSaveVideo();
  }, []);

  return (
    <div className="saved-page">
      <div className="saved-header">
        <h2>Saved Recipes</h2>
        <p>{savedFoods.length} Saved Items</p>
      </div>

      {savedFoods.length === 0 ? (
        <div className="empty-state">
          <h3>No Saved Videos</h3>
          <p>Videos you save will appear here.</p>
        </div>
      ) : (
        <div className="saved-grid">
          {savedFoods.map((item) => (
            <div className="saved-card" key={item._id}>
              <video
                src={item.food.videoUrl}
                className="saved-video"
                muted
                loop
                playsInline
              />

              <div className="saved-overlay">
                <h4>{item.food.foodname}</h4>
                <p>₹{item.food.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomNavbar />
    </div>
  );
};

export default Save;