import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Create = ({ userId }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setFormError("Please ensure that your post has a title.");
      return;
    }

    const { data, error } = await supabase.from("posts").insert([{ user_id: userId, title, content, image_url: imageUrl, comments: [] }]);

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

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <input type="text" id="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <textarea id="content" type="text" placeholder="Content (Optional)" value={content} onChange={(e) => setContent(e.target.value)} />

        <input type="text" id="image-url" placeholder="Image URL (Optional)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

        <button>Create Post</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
