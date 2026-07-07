import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentModal = ({ foodId, isOpen, onClose }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!foodId || !isOpen) return;

    fetchComments();
  }, [foodId, isOpen]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/food/comments/${foodId}`,
        { withCredentials: true }
      );

      setComments(res.data.comments || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food/comment`,
        {
          foodId,
          comment: commentText,
        },
        {
          withCredentials: true,
        }
      );

      setComments((prev) => [...prev, res.data.comment]);
      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="comment-backdrop" onClick={onClose}>
      <div
        className="comment-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="comment-header">
          <h3>Comments</h3>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="comment-list">
          {comments.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="comment-item"
              >
                <strong>
                  {comment.user?.name || "User"}
                </strong>

                <p>{comment.comment}</p>
              </div>
            ))
          )}
        </div>

        <div className="comment-input-container">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) =>
              setCommentText(e.target.value)
            }
          />

          <button onClick={handleComment}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;