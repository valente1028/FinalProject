import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

const Repost = ({ userId }) => {
  console.log("userId: ", userId);
  const { id } = useParams();
  const navigate = useNavigate();

  // New post data
  const [newContent, setNewContent] = useState("");
  const [newImageUrl, setNewImageUrl] = useState(null);
  const [formError, setFormError] = useState(null);

  // Referenced post data
  const [author, setAuthor] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [upvotes, setUpvotes] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase.from("posts").select().eq("id", id).single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setAuthor(data.user_id);
        setCreatedAt(data.created_at);
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image_url);
        setUpvotes(data.upvotes);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleUpvote = async () => {
    const { data, error } = await supabase
      .from("posts")
      .update({ upvotes: upvotes + 1 })
      .eq("id", id);
    if (data) {
      console.log(data);
    }
    if (error) {
      console.log(error);
    }
    setUpvotes((upvotes) => upvotes + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setFormError("Please ensure that your post has a title.");
      return;
    }

    const { data, error } = await supabase.from("posts").insert([
      {
        user_id: userId,
        title: title,
        content: newContent,
        image_url: newImageUrl,
        referenced_post: id,
        comments: [],
      },
    ]);

    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields correctly.");
    }
    if (data) {
      console.log(data);
      setFormError(null);
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

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <input type="text" id="title" placeholder="Title" value={"Re: " + title} disabled />

        <textarea id="content" type="text" placeholder="Content (Optional)" value={newContent} onChange={(e) => setNewContent(e.target.value)} />

        <input type="text" id="image-url" placeholder="Image URL (Optional)" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} />

        <button>Create Post</button>

        {formError && <p className="error">{formError}</p>}
      </form>
      <h3>Replying to...</h3>
      <div className="post-card">
        <p>
          Posted by @{author == userId ? "You" : author} - {parseDate(createdAt)}
        </p>
        <h3>{title}</h3>
        <p>{content}</p>
        <img src={imageUrl} />
        <div>
          <div className="buttons">
            <div>
              <button className="upvote-button" onClick={() => handleUpvote()}>
                <ThumbUpOutlinedIcon />
              </button>
              <span>{upvotes} upvotes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repost;
