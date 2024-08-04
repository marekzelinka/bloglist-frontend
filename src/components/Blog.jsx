import { useState } from 'react'

export function Blog({ blog, onUpdate }) {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded((expanded) => !expanded)

  const handleLike = async () => {
    onUpdate(blog.id, { likes: blog.likes + 1 })
  }

  return (
    <div
      style={{
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
      }}
    >
      <div>
        {blog.title} {blog.author}{' '}
        <button type="button" onClick={toggleExpanded}>
          {expanded ? 'hide' : 'view'}
        </button>
      </div>
      {expanded ? (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button type="button" onClick={handleLike}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
        </div>
      ) : null}
    </div>
  )
}
