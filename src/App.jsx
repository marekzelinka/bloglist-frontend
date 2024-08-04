import { useEffect, useState } from "react";
import { Blog } from "./components/Blog.jsx";
import { getAllBlogs } from "./services/blogs.js";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAllBlogs().then(setBlogs);
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

export default App;
