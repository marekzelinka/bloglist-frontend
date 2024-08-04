import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { BlogForm } from './BlogForm'

test('event handler is called with the right details when a new blog is created', async () => {
  const mockOnSubmit = vi.fn(() => {
    return {
      success: true,
    }
  })

  render(<BlogForm onSubmit={mockOnSubmit} />)

  const user = userEvent.setup()

  await user.type(screen.getByLabelText(/title/i), 'React patterns')
  await user.type(screen.getByLabelText(/author/i), 'Michael Chan')
  await user.type(screen.getByLabelText(/url/i), 'https://reactpatterns.com/')
  await user.click(screen.getByRole('button', { name: /create/i }))

  expect(mockOnSubmit).toBeCalledWith({
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
  })
})
