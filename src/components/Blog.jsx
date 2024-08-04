import PropTypes from 'prop-types'
import { useState } from 'react'

export function Blog({ blog, canDelete, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded((expanded) => !expanded)

  const handleLike = async () => {
    onUpdate(blog.id, { likes: blog.likes + 1 })
  }

  const handleDelete = async () => {
    const shouldDelete = window.confirm('Are you sure to delete this record.')

    if (!shouldDelete) {
      return
    }

    onDelete(blog.id)
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
            <span data-testid="blog-likes">{`likes ${blog.likes}`}</span>{' '}
            <button type="button" onClick={handleLike}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
          {canDelete ? (
            <button type="button" onClick={handleDelete}>
              delete
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  canDelete: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}
