import React, { useState } from "react";
import axios from "axios";
import "../../../css/auth.css";
import { useNavigate } from "react-router-dom";

const FoodCreate = () => {
  const [foodname, setFoodname] = useState("");
  const [price, setPrice] = useState("");
  const [video, setVideo] = useState(null);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!foodname || !price || !video) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);
      setProgress(0);

      const formData = new FormData();

      formData.append("foodname", foodname);
      formData.append("price", price);
      formData.append("video", video);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food`,
        formData,
        {
          withCredentials: true,

          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            setProgress(percent);
          },
        }
      );

      alert("Food Created Successfully");

      const foodPartnerId = response.data.Food.foodPartner;

      navigate(`/profile/${foodPartnerId}`);
    } catch (error) {
      console.log(error.response?.data || error);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Create Food Reel</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Food Name"
              value={foodname}
              onChange={(e) => setFoodname(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>

          {video && (
            <>
              <p className="file-name">{video.name}</p>

              <video
                src={URL.createObjectURL(video)}
                controls
                className="video-preview"
              />
            </>
          )}

          {loading && (
            <div className="upload-section">
              <p>Uploading... {progress}%</p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn"
            disabled={loading}
          >
            {loading ? `Uploading ${progress}%` : "Upload Food Reel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoodCreate;