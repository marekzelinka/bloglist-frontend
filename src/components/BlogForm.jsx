import PropTypes from 'prop-types'

export function BlogForm({ onSubmit }) {
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()

        const form = event.target
        const formData = new FormData(form)

        const title = formData.get('title')?.toString()
        const author = formData.get('author')?.toString()
        const url = formData.get('url')?.toString()
        const result = await onSubmit({ title, author, url })

        if (result.success) {
          form.reset()
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
  )
}
BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
