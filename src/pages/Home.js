import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

const Home = ({ userId }) => {
  const [fetchError, setFetchError] = useState(null);
  const [posts, setPosts] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("posts").select().order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch the posts");
        setPosts(null);
      }
      if (data) {
        setPosts(data);
        setFetchError(null);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [orderBy]);
  if (loading) {
    return <div className="loader"></div>;
  } else {
    return (
      <div className="page home">
        {fetchError && <p>{fetchError}</p>}
        {posts && (
          <div className="posts">
            <div className="order-by">
              <span>Order by:</span>
              <button onClick={() => setOrderBy("created_at")}>Newest</button>
              <button onClick={() => setOrderBy("upvotes")}>Most Popular</button>
            </div>
            <div className="post-grid">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} userId={userId} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Home;
