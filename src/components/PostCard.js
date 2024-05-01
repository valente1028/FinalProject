import { Link } from "react-router-dom";

const PostCard = ({ post, userId }) => {
  return (
    <div className="post-card">
      <p>
        Posted by {post.user_id == userId ? "You" : "@" + post.user_id}
      </p>
      <h3>
        <Link to={"/" + post.id}>{post.referenced_post ? "Re: " + post.title : post.title}</Link>
      </h3>
      <p>{post.upvotes} upvotes</p>
    </div>
  );
};

export default PostCard;
