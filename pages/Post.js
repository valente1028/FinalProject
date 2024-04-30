import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Link } from "react-router-dom";
import CommentSection from "../components/CommentSection";

const Post = ({ userId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Current post data
  const [author, setAuthor] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [upvotes, setUpvotes] = useState("");
  const [comments, setComments] = useState("");
  const [referencedPost, setReferencedPost] = useState("");

  // Referenced post data
  const [referencedAuthor, setReferencedAuthor] = useState("");
  const [referencedCreatedAt, setReferencedCreatedAt] = useState("");
  const [referencedTitle, setReferencedTitle] = useState("");
  const [referencedContent, setReferencedContent] = useState("");
  const [referencedImageUrl, setReferencedImageUrl] = useState("");
  const [referencedUpvotes, setReferencedUpvotes] = useState("");
  const [referencedRepost, setReferencedRepost] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("posts").select().eq("id", id).single();

      if (error) {
        navigate("/", { replace: true });
      }

      // Current post
      if (data) {
        setAuthor(data.user_id);
        setCreatedAt(data.created_at);
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image_url);
        setUpvotes(data.upvotes);
        setComments(data.comments);
        setReferencedPost(data.referenced_post);

        // Referenced post
        if (data.referenced_post) {
          const { data: referencedData, error } = await supabase.from("posts").select().eq("id", data.referenced_post).single();

          if (error) {
            navigate("/", { replace: true });
          }

          if (referencedData) {
            setReferencedAuthor(referencedData.user_id);
            setReferencedCreatedAt(referencedData.created_at);
            setReferencedTitle(referencedData.title);
            setReferencedContent(referencedData.content);
            setReferencedImageUrl(referencedData.image_url);
            setReferencedUpvotes(referencedData.upvotes);
            setReferencedRepost(referencedData.referenced_post);
          }
        }
      }
      setLoading(false);
    };

    fetchPost();
  }, [id, navigate]);

  const handleUpvote = async () => {
    setUpvotes((upvotes) => upvotes + 1);

    const { data, error } = await supabase
      .from("posts")
      .update({ upvotes: upvotes + 1 })
      .eq("id", id);

    if (data) {
      console.log("data: ", data);
    }
    if (error) {
      console.log("error: ", error);
    }
  };

  const handleDelete = async () => {
    const { data, error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
    }
    if (data) {
      navigate("/");
    }
  };

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
    if (diff <= 777600) {
      return "1 week ago";
    }
    return "on " + systemDate;
  };

  if (loading) {
    return <div className="loader"></div>;
  } else {
    return (
      <div className="page">
        <div className="post-card">
          <p>
            Posted by {author == userId ? "You" : "@" + author} - {parseDate(createdAt)}
          </p>
          <h3>{referencedPost ? "Re: " + title : title}</h3>
          <p>{content}</p>
          <img src={imageUrl} />
          <hr />
          <div className="buttons">
            <div>
              <button className="upvote-button" onClick={() => handleUpvote(id)}>
                <ThumbUpOutlinedIcon />
              </button>
              <span>{upvotes} upvotes</span>
            </div>
            <div>
              {author == userId && (
                <span>
                  <Link to={"/update/" + id}>
                    <i className="material-icons">edit</i>
                  </Link>
                  <i className="material-icons" onClick={handleDelete}>
                    delete
                  </i>
                </span>
              )}
              <Link to={"/repost/" + id}>
                <i className="material-icons" title="repost">
                  reply
                </i>
              </Link>
            </div>
          </div>
          <CommentSection userId={userId} comments={comments} setComments={setComments} postId={id} />
        </div>
        {referencedPost && (
          <div>
            <h3>Replying to...</h3>
            <div className="post-card">
              <p>
                Posted by @{referencedAuthor == userId ? "You" : referencedAuthor} - {parseDate(referencedCreatedAt)}
              </p>
              <h3>
                <Link to={"/" + referencedPost}>{referencedRepost ? "Re: " + referencedTitle : referencedTitle}</Link>
              </h3>
              <p>{referencedContent}</p>
              <img src={referencedImageUrl} />
              <hr />
              <div>
                <span>{referencedUpvotes} upvotes</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Post;
