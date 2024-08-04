import { useEffect, useState } from 'react'
import { AlertBox } from './components/AlertBox.jsx'
import { Blog } from './components/Blog.jsx'
import { Togglable } from './components/Togglable.jsx'
import { createBlog, getAllBlogs, setToken } from './services/blogs.js'
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
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    getAllBlogs().then(setBlogs)
  }, [])

  return user ? (
    <>
      <h1>blogs</h1>
      <AlertBox alert={alert} />
      <p>
        {user.name ?? user.username} logged in{' '}
        <button
          type="button"
          onClick={() => {
            setUser(null)
            setToken(null)
            localStorage.removeItem('user')
          }}
        >
          logout
        </button>
      </p>
      <Togglable openButtonLabel="new note">
        <h2>Create new</h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault()

            const form = event.target
            const formData = new FormData(form)

            try {
              const title = formData.get('title')?.toString()
              const author = formData.get('author')?.toString()
              const url = formData.get('url')?.toString()
              const blog = await createBlog({ title, author, url })
              setBlogs((blogs) => blogs.concat(blog))
              notify({
                message: `A new blog "${blog.title}" by "${blog.author}" added`,
                status: 'success',
              })

              form.reset()
            } catch (error) {
              notify({ message: error.response.data.error, status: 'error' })
            }
          }}
        >
          <div>
            title <input type="text" name="title" />
          </div>
          <div>
            author <input type="text" name="author" />
          </div>
          <div>
            url <input type="url" name="url" />
          </div>
          <button type="submit">create</button>
        </form>
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  ) : (
    <>
      <h1>Log in to application</h1>
      <AlertBox alert={alert} />
      <form
        onSubmit={async (event) => {
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
  )
}

export default App
