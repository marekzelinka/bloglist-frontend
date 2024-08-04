import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { Blog } from './Blog.jsx'

test('shows title and author, but hides url or likes by default', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }

  render(<Blog blog={blog} />)

  expect(screen.getByText(/React patterns/i)).toBeVisible()
  expect(screen.getByText(/Michael Chan/i)).toBeVisible()
})

test('url and likes are rendered when expanded', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()

  await user.click(screen.getByRole('button', { name: /view/i }))

  expect(screen.getByText(/reactpatterns.com/i)).toBeVisible()
  expect(screen.getByText(/likes 7/i)).toBeVisible()
})

test('if the like button is clicked twice, the event handler is called twice', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }
  const mockOnUpdate = vi.fn()

  render(<Blog blog={blog} onUpdate={mockOnUpdate} />)

  const user = userEvent.setup()

  await user.click(screen.getByRole('button', { name: /view/i }))
  await user.click(screen.getByRole('button', { name: /like/i }))
  await user.click(screen.getByRole('button', { name: /like/i }))

  expect(mockOnUpdate).toHaveBeenCalledTimes(2)
})
