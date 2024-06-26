import { useState } from "react";
import supabase from "../config/supabaseClient";

const CommentSection = ({ comments, setComments, userId, postId }) => {
  console.log("comments: ", comments);
  const [newComment, setNewComment] = useState("");


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
            {comment.author == userId ? "You" : "@" + comment.author}: {comment.text}
          </p>
        ))}
      <form onSubmit={handleAddComment}>
        <input className="comment-input" type="text" placeholder="Leave a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      </form>
    </div>
  );
};

export default CommentSection;

