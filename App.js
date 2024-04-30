import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Post from "./pages/Post";
import Repost from "./pages/Repost";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState("user" + Math.floor(100000 + Math.random() * 900000));
  return (
    <BrowserRouter>
      <nav>
        <h1>MemeHub</h1>
        <div>
          <span>Hello, @{userId}!</span>
          <Link to="/">Home</Link>
          <Link to="/create">Create New Post</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home userId={userId} />} />
        <Route path="/:id" element={<Post userId={userId} />} />
        <Route path="/create" element={<Create userId={userId} />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/repost/:id" element={<Repost userId={userId} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
