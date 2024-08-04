import { useEffect, useState } from 'react'
import { AlertBox } from './components/AlertBox.jsx'
import { Blog } from './components/Blog.jsx'
import { BlogForm } from './components/BlogForm.jsx'
import { Togglable } from './components/Togglable.jsx'
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  setToken,
  updateBlog,
} from './services/blogs.js'
import { login } from './services/login.js'

function App() {
  const [alert, setAlert] = useState(null)
  const notify = (alert, timeoutMs = 5000) => {
    setAlert(alert)
    window.setTimeout(() => setAlert(null), timeoutMs)
  }

  const [user, setUser] = useState(() => {
    try {
      const rawUser = localStorage.getItem('user')
      if (rawUser) {
        const user = JSON.parse(rawUser)
        setToken(user.token)
        return user
      }

      return null
    } catch (error) {
      return null
    }
  })
  console.log(user)
  const [blogs, setBlogs] = useState([])
  const sortedBlogs = [...blogs].sort(
    (blogA, blogB) => blogB.likes - blogA.likes,
  )

  useEffect(() => {
    getAllBlogs().then(setBlogs)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)

    try {
      const username = formData.get('username')?.toString()
      const password = formData.get('password')?.toString()
      const user = await login({ username, password })
      setUser(user)
      setToken(user.token)
      localStorage.setItem('user', JSON.stringify(user))
      form.reset()
      notify({ message: 'Successfully logged in', status: 'success' })
    } catch (error) {
      notify({ message: error.response.data.error, status: 'error' })
    }
  }

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
  }

  const handleAddBlog = async ({ title, author, url }) => {
    try {
      const blog = await createBlog({ title, author, url })
      setBlogs((blogs) => blogs.concat(blog))
      notify({
        message: `A new blog "${blog.title}" by "${blog.author}" added`,
        status: 'success',
      })

      return { success: true }
    } catch (error) {
      notify({ message: error.response.data.error, status: 'error' })

      return { success: false }
    }
  }

  const handleUpdateBlog = async (id, updates) => {
    const updatedBlog = await updateBlog(id, updates)
    setBlogs((blogs) =>
      blogs.map((blog) =>
        blog.id === id ? { ...blog, likes: updatedBlog.likes } : blog,
      ),
    )
  }

  const handleDeleteBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)

    try {
      await deleteBlog(id)
      notify({
        message: `Deleted blog "${blog.title}" by "${blog.author}"`,
        status: 'success',
      })
    } catch {
      notify({
        message: `Blog "${blog.title}" by "${blog.author}" was already removed from the server`,
        status: 'error',
      })
    } finally {
      setBlogs((blogs) => blogs.filter((blog) => blog.id !== id))
    }
  }

  return user ? (
    <>
      <h1>blogs</h1>
      <AlertBox alert={alert} />
      <p>
        {user.name ?? user.username} logged in{' '}
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <Togglable openButtonLabel="new note">
        <h2>Create new</h2>
        <BlogForm onSubmit={handleAddBlog} />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          canDelete={blog.user?.username === user.username}
          onUpdate={handleUpdateBlog}
          onDelete={handleDeleteBlog}
        />
      ))}
    </>
  ) : (
    <>
      <h1>Log in to application</h1>
      <AlertBox alert={alert} />
      <form onSubmit={handleLogin}>
        <div>
          username <input type="text" name="username" />
        </div>
        <div>
          password <input type="password" name="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default App
