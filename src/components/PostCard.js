import { Link } from "react-router-dom";

const PostCard = ({ post, userId }) => {
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

  return (
    <div className="post-card">
      <p>
        Posted by {post.user_id == userId ? "You" : "@" + post.user_id} -{" "}
        {parseDate(post.created_at)}
      </p>
      <h3>
        <Link to={"/" + post.id}>{post.referenced_post ? "Re: " + post.title : post.title}</Link>
      </h3>
      <p>{post.upvotes} upvotes</p>
    </div>
  );
};

export default PostCard;
