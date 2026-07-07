import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import defaultProfilepic from '../../../assets/default-profile-pic.webp'
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaCommentDots, FaHome
} from "react-icons/fa";

import "../../../css/Feed.css";
import BottamNavbar from "../components/BottamNavbar";

const Feed = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const navigate = useNavigate();


  const [showComments, setShowComments] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");


  async function fetchComments(foodId) {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/food/getAllComments/${foodId}`,
        {
          withCredentials: true,
        }
      );

      setComments(res.data.comments);
      setSelectedFoodId(foodId);
      setShowComments(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCommentSubmit() {
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food/comment`,
        {
          foodId: selectedFoodId,
          comment: commentText,
        },
        {
          withCredentials: true,
        }
      );

      setComments((prev) => [res.data.comment, ...prev]);

      setVideos((prev) =>
        prev.map((video) =>
          video._id === selectedFoodId
            ? {
              ...video,
              commentsCount: (video.commentsCount || 0) + 1,
            }
            : video
        )
      );

      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/food/getAllFood`,
          {
            withCredentials: true,
          }
        );

        setVideos(res.data.foods);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFoods();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentVideo = entry.target;

          if (entry.isIntersecting) {
            videoRefs.current.forEach((video) => {
              if (video && video !== currentVideo) {
                video.pause();
              }
            });

            currentVideo.play();
          } else {
            currentVideo.pause();
          }
        });
      },
      {
        threshold: 0.8,
      }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]);

  async function handleLike(foodId) {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food/like`,
        { foodId },
        { withCredentials: true }
      );

      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === foodId
            ? {
              ...video,
              isLiked: !video.isLiked,
              likes: video.isLiked
                ? Math.max(0, (video.likes || 0) - 1)
                : (video.likes || 0) + 1,
            }
            : video
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSave(foodId) {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food/save`,
        { foodId },
        { withCredentials: true }
      );

      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === foodId
            ? {
              ...video,
              isSaved: !video.isSaved,
              savesCount: video.isSaved
                ? Math.max(0, (video.savesCount || 0) - 1)
                : (video.savesCount || 0) + 1,
            }
            : video
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="feed-container">
        {videos.map((item, index) => (
          <div className="feed-card" key={item._id}>
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={item.videoUrl}
              muted
              loop
              playsInline
              className="feed-video"
            />

            <div className="feed-overlay">
              <div className="creator-info">
                <img
                  src={
                    item.foodPartner?.profilePic ||
                    defaultProfilepic
                  }
                  alt="profile"
                  className="profile-image"
                />

                <div className="creator-details">
                  <h3>{item.foodPartner?.name || "Food Partner"}</h3>

                  <button
                    className="view-profile-btn"
                    onClick={() =>
                      navigate(`/profile/${item.foodPartner?._id}`)
                    }
                  >
                    View Profile
                  </button>
                </div>
              </div>

              <div className="video-details">
                <h2>{item.foodname}</h2>
                <p>{item.description}</p>
              </div>

              <div className="video-actions">
                <button className="action-btn" onClick={() => handleLike(item._id)}>
                  {item.isLiked ? <FaHeart /> : <FaRegHeart />}
                  <span>{item.likes || 0}</span>
                </button>

                <button
                  className="action-btn"
                  onClick={() => fetchComments(item._id)}
                >
                  <FaCommentDots />
                  <span>{item.commentCount || 0}</span>
                </button>

                <button className="action-btn" onClick={() => handleSave(item._id)}>
                  {item.isSaved ? <FaBookmark /> : <FaRegBookmark />}
                  <span>{item.savesCount || 0}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {
  showComments && (
    <div className="comment-modal">
      <div className="comment-box">

        <div className="comment-header">
          <h3>Comments</h3>

          <button
            onClick={() => setShowComments(false)}
          >
            ✕
          </button>
        </div>

        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="comment-item"
              >
                <strong>
                  {comment.user?.username}
                </strong>

                <p>{comment.comment}</p>
              </div>
            ))
          ) : (
            <p>No comments yet</p>
          )}
        </div>

        <div className="comment-input-box">
          <input
            type="text"
            placeholder="Add comment..."
            value={commentText}
            onChange={(e) =>
              setCommentText(e.target.value)
            }
          />

          <button onClick={handleCommentSubmit}>
            Post
          </button>
        </div>

      </div>
    </div>
  )
}
      <BottamNavbar />
    </>

  );
};

export default Feed;