import { useEffect, useState } from "react";
import { Blog } from "./components/Blog.jsx";
import { getAllBlogs } from "./services/blogs.js";
import { login } from "./services/login.js";

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAllBlogs().then(setBlogs);
  }, []);

  return user ? (
    <>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  ) : (
    <>
      <h2>Log in to application</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const form = event.target;
          const formData = new FormData(form);

          const username = formData.get("username")?.toString();
          const password = formData.get("password")?.toString();
          const user = await login({ username, password });
          setUser(user);

          form.reset();
        }}
      >
        <div>
          username <input type="text" name="username" />
        </div>
        <div>
          password <input type="password" name="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
}

export default App;
