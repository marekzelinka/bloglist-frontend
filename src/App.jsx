import { useEffect, useState } from "react";
import { Blog } from "./components/Blog.jsx";
import { createBlog, getAllBlogs, setToken } from "./services/blogs.js";
import { login } from "./services/login.js";

function App() {
  const [user, setUser] = useState(() => {
    try {
      const rawUser = localStorage.getItem("user");
      if (rawUser) {
        const user = JSON.parse(rawUser);
        setToken(user.token);
        return user;
      }

      return null;
    } catch (error) {
      return null;
    }
  });
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAllBlogs().then(setBlogs);
  }, []);

  return user ? (
    <>
      <h1>blogs</h1>
      <p>
        {user.name ?? user.username} logged in{" "}
        <button
          type="button"
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.removeItem("user");
          }}
        >
          logout
        </button>
      </p>
      <h2>Create new</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const form = event.target;
          const formData = new FormData(form);

          try {
            const title = formData.get("title")?.toString();
            const author = formData.get("author")?.toString();
            const url = formData.get("url")?.toString();
            const blog = await createBlog({ title, author, url });
            setBlogs((blogs) => blogs.concat(blog));

            form.reset();
          } catch {}
        }}
      >
        <div>
          title <input type="text" name="title" />
        </div>
        <div>
          author <input type="text" name="author" />
        </div>
        <div>
          url <input type="text" name="url" />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  ) : (
    <>
      <h1>Log in to application</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const form = event.target;
          const formData = new FormData(form);

          const username = formData.get("username")?.toString();
          const password = formData.get("password")?.toString();
          const user = await login({ username, password });
          setUser(user);
          setToken(user.token);
          localStorage.setItem("user", JSON.stringify(user));

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
