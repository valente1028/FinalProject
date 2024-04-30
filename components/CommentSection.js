import { useState } from "react";
import supabase from "../config/supabaseClient";

const CommentSection = ({ comments, setComments, userId, postId }) => {
  console.log("comments: ", comments);
  const [newComment, setNewComment] = useState("");

  const parseDate = (pdate) => {
    let systemDate = new Date(Date.parse(pdate));
    let userDate = new Date();
    let diff = Math.floor((userDate - systemDate) / 1000);
    if (diff < 60) {
      return "less than a minute ago";
    }
    if (diff <= 90) {
      return "one minute ago";
    }
    if (diff <= 3540) {
      return Math.round(diff / 60) + " minutes ago";
    }
    if (diff <= 5400) {
      return "1 hour ago";
    }
    if (diff <= 86400) {
      return Math.round(diff / 3600) + " hours ago";
    }
    if (diff <= 129600) {
      return "1 day ago";
    }
    if (diff < 604800) {
      return Math.round(diff / 86400) + " days ago";
    }
    return "on " + systemDate;
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment) {
      return;
    }

    const { data, error } = await supabase
      .from("posts")
      .update({ comments: [...comments, { author: userId, text: newComment, createdAt: new Date() }] })
      .eq("id", postId);

    setComments((comments) => [...comments, { author: userId, text: newComment, createdAt: new Date() }]);

    if (error) {
      console.log("error: ", error);
    }

    if (data) {
      console.log("data: ", data);
      setNewComment("");
    }
  };

  return (
    <div className="comments-grid">
      {comments.length > 0 &&
        comments.map((comment) => (
          <p className="comment" key={comment.text}>
            {comment.author == userId ? "You" : "@" + comment.author}: {comment.text} - {parseDate(comment.createdAt)}
          </p>
        ))}
      <form onSubmit={handleAddComment}>
        <input className="comment-input" type="text" placeholder="Leave a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      </form>
    </div>
  );
};

export default CommentSection;

