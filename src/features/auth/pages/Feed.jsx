import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultProfilepic from '../../../assets/default-profile-pic.webp';
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaCommentDots,
} from "react-icons/fa";
import "../../../css/Feed.css";
import BottamNavbar from "../components/BottamNavbar";
import ReelSkeleton from "../components/ReelSkeleton";

const Feed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  
  const videoRefs = useRef([]);
  const navigate = useNavigate();
  const observerRef = useRef(null);
  const lastVideoRef = useRef(null);

  // Fetch foods with cursor pagination
  const fetchFoods = useCallback(async (cursor = null) => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/food/getAllFood`,
        {
          params: cursor ? { cursor } : {},
          withCredentials: true,
        }
      );

      setVideos(prev => {
        // Avoid duplicates when fetching more
        const newFoods = res.data.foods.filter(
          newFood => !prev.some(existingFood => existingFood._id === newFood._id)
        );
        return [...prev, ...newFoods];
      });
      
      setNextCursor(res.data.nextCursor);
      setHasMore(res.data.hasMore);
    } catch (error) {
      console.error("Error fetching foods:", error);
    } finally {
      setLoadingMore(false);
      setLoading(false);
    }
  }, [loadingMore, hasMore]);

  // Initial load
  useEffect(() => {
    fetchFoods();
  }, []);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    if (loading || loadingMore || !hasMore || videos.length === 0) return;

    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Get the last video element
    const lastVideo = videoRefs.current[videos.length - 1];
    
    if (!lastVideo) return;

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore && !loadingMore) {
          fetchFoods(nextCursor);
        }
      },
      {
        root: null,
        rootMargin: "100px", // Start loading when within 100px of the bottom
        threshold: 0.1,
      }
    );

    observerRef.current.observe(lastVideo);

    // Cleanup observer
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [videos, loading, loadingMore, hasMore, nextCursor, fetchFoods]);

  // Video autoplay on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentVideo = entry.target;
          
          if (entry.isIntersecting) {
            // Pause all other videos
            videoRefs.current.forEach((video) => {
              if (video && video !== currentVideo) {
                video.pause();
              }
            });
            
            // Play current video
            if (currentVideo) {
              currentVideo.play().catch(err => {
                // Autoplay might be blocked, handle silently
                console.log("Autoplay prevented:", err);
              });
            }
          } else {
            if (currentVideo) {
              currentVideo.pause();
            }
          }
        });
      },
      {
        threshold: 0.7,
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

  // Handle likes
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
      console.error("Error toggling like:", error);
    }
  }

  // Handle saves
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
      console.error("Error toggling save:", error);
    }
  }

  // Fetch comments
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
      console.error("Error fetching comments:", error);
    }
  }

  // Handle comment submission
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
                commentCount: (video.commentCount || 0) + 1,
              }
            : video
        )
      );

      setCommentText("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }

  // Loading state
  if (loading && videos.length === 0) {
    return (
      <>
        <div className="feed-container">
          <ReelSkeleton />
          <ReelSkeleton />
          <ReelSkeleton />
        </div>
        <BottamNavbar />
      </>
    );
  }

  return (
    <>
      <div className="feed-container">
        {videos.map((item, index) => (
          <div className="feed-card" key={item._id}>
            <video
              ref={(el) => {
                if (el) {
                  videoRefs.current[index] = el;
                  // Store reference to last video for intersection observer
                  if (index === videos.length - 1) {
                    lastVideoRef.current = el;
                  }
                }
              }}
              src={item.videoUrl}
              muted
              loop
              playsInline
              className="feed-video"
              onCanPlay={(e) => {
                // Play first video when loaded
                if (index === 0 && !initialLoadComplete) {
                  setInitialLoadComplete(true);
                  e.target.play().catch(() => {});
                }
              }}
            />

            <div className="feed-overlay">
              <div className="creator-info">
                <img
                  src={
                    item.foodPartner?.profilePic || defaultProfilepic
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

        {/* Loading more indicator */}
        {loadingMore && (
          <div className="loading-more">
            <ReelSkeleton />
          </div>
        )}

        {/* No more videos message */}
        {!hasMore && videos.length > 0 && (
          <div className="no-more-videos">
            <p>No more videos to load</p>
          </div>
        )}
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div className="comment-modal">
          <div className="comment-box">
            <div className="comment-header">
              <h3>Comments</h3>
              <button onClick={() => setShowComments(false)}>✕</button>
            </div>

            <div className="comments-list">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="comment-item">
                    <strong>{comment.user?.username || "User"}</strong>
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
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleCommentSubmit();
                  }
                }}
              />
              <button onClick={handleCommentSubmit}>Post</button>
            </div>
          </div>
        </div>
      )}
      
      <BottamNavbar />
    </>
  );
};

export default Feed;