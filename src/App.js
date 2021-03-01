import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import { getAllBlogs } from "./services/blogs";

export default function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAllBlogs().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
